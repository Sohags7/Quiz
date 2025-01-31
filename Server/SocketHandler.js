import Lobby from "./models/Lobby.js";
import Room from "./models/Room.js";

let rooms = {}; 
async function isValidRoom(roomCode) {
  try {
    const lobby = await Lobby.findOne({ roomCode });
    return lobby ? true : false;
  } catch (error) {
    console.error("Error checking room validity:", error);
    return false;
  }
}

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected new User:", socket.id);

    // Handle a user joining a room
    socket.on("joinRoom", async ({ roomCode, name, team }) => {
      

      if (await isValidRoom(roomCode) && name && name.trim() !== '' && team && team.trim() !== '') {
          if (!rooms[roomCode]) {
            const lobby = await Lobby.findOne({ roomCode });
            const combinedQuiz = lobby.categories;
            const timerDuration = lobby.timer;
            rooms[roomCode] = new Room(roomCode, combinedQuiz, timerDuration);
            rooms[roomCode].messages = [];
            rooms[roomCode].activity = [];
  
          }
          if (!rooms[roomCode].getNameBySocketId(socket.id)) {
            rooms[roomCode].addMember(name, socket.id);
            socket.join(roomCode);
          
            io.in(roomCode).emit("usersUpdated", rooms[roomCode].users);
            // Notify everyone in the room about the new member
          const joinMessage = {
            msg: `${name} has joined the room.`,
            time: new Date().toLocaleTimeString(),
          };
          rooms[roomCode].activity.push(joinMessage);
          io.to(roomCode).emit("activityHistory", rooms[roomCode].activity);
         
          }
          
          io.to(socket.id).emit("previousMessages", rooms[roomCode].messages);
          
      } else {
        io.to(socket.id).emit("inValidRoom", "Invalid room code or missing data.");
      }
    });

    socket.on("QuizStart", async (roomCode) => {
      try {
          const lobby = await Lobby.findOne({ roomCode });
  
          if (!lobby) {
              return socket.emit("error", { msg: "Lobby not found" });
          }
  
          const quizData = {
              roomCode: lobby.roomCode,
              times: lobby.timer, // Timer in milliseconds (e.g., 20000 for 20s)
              quizId: lobby.quizId,
              categories: lobby.categories,
          };
  
          const timer = quizData.times; // Get the timer value
          let allQuestions = [];
  
          // Collect all questions from all categories
          let questionIndex=1;
          quizData.categories.forEach((category) => {
              category.questions.forEach((question) => {
                  allQuestions.push({
                      questionIndex: questionIndex++,
                      question: question.question,
                      options: question.options,
                      correct_answer: question.correct_answer,
                      timer : timer
                  });
              });
          });

          allQuestions.push({
            questionIndex: questionIndex,
            question: '',
            options: '',
            correct_answer: '',
            timer : timer
        });
        console.log(timer);

          // Send each question one by one every `timer` milliseconds
          let index = 0;
          function sendNextQuestion() {
              if (index < allQuestions.length) {
                  io.to(roomCode).emit("Question", allQuestions[index],questionIndex);
                  index++;
  
                  // Schedule the next question
                  // setTimeout(sendNextQuestion, timer*1000);
                  setTimeout(sendNextQuestion, 1000);
              }
          }
  
          // Start sending questions 
          sendNextQuestion();
  
      } catch (error) {
          console.error("Error starting quiz:", error);
          socket.emit("error", { msg: "An error occurred while starting the quiz." });
      }
  });


    socket.on("newMessage", (message) => {
      console.log("Received message:", message); 
    
      if (!message || !message.text) {
        console.error("Message does not have a 'text' property");
        return;
      }
     
      const newMessage = {
        text: message.text,
        user: message.user,
        time: new Date().toLocaleTimeString(),
      }; 
      
      if (rooms[message.roomCode] && newMessage.text!="") {
        rooms[message.roomCode].messages.push(newMessage);
        io.to(message.roomCode).emit("newMsg", newMessage);
      }
    });
    

    // Handle user leaving the room
    socket.on("leaveRoom", ({ roomCode, name }) => {
      socket.leave(roomCode);
      if (rooms[roomCode]) {
        rooms[roomCode].removeMember(name);
        const leaveMessage = `${name} has left the room.`;

        // Notify everyone in the room
        io.to(roomCode).emit("activity", leaveMessage);
        io.to(roomCode).emit("userLeft", { name });
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Find and remove the disconnected user from their room
      for (const roomCode in rooms) {
        const room = rooms[roomCode];
        const member = room.getNameBySocketId(socket.id);
        if (member) {
          room.removeMember(member);
    
          const disconnectMessage = {
            msg: `${member} has left the room.`,
            time: new Date().toLocaleTimeString(),
          };
          rooms[roomCode].activity.push(disconnectMessage);
          io.to(roomCode).emit("activityHistory", rooms[roomCode].activity);
          io.in(roomCode).emit("usersUpdated", rooms[roomCode].users);
        }
      }
    });
  });
};

