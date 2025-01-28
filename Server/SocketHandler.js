export const setupSocket = (io) => {
    let clientCount = 0; // Initialize clientCount
  
    io.on("connection", (socket) => {
      console.log("Connected new User:", socket.id);
  
      // Increment clientCount when a user connects
      clientCount++;
      io.emit("clientCount", clientCount); // Broadcast to all clients
  
      // Handle joinRoom event
      socket.on("joinRoom", async ({ roomCode }) => {
        console.log(`User ${socket.id} attempted to join room: ${roomCode}`);
        socket.join(roomCode);
        io.to(roomCode).emit("message", `${socket.id} has joined the room.`);
      });
  
      // Handle leaveRoom event
      socket.on("leaveRoom", ({ roomCode }) => {
        console.log(`User ${socket.id} left room: ${roomCode}`);
        socket.leave(roomCode);
        io.to(roomCode).emit("message", `${socket.id} has left the room.`);
      });
  
      // Handle user disconnect event
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
  
        // Decrement clientCount when a user disconnects
        clientCount--;
        io.emit("clientCount", clientCount); // Broadcast the updated client count
      });
  
      // Optional: Periodically broadcast client count every 1 second (if needed)
      const intervalId = setInterval(() => {
        io.emit("clientCount", clientCount); // Broadcast to all clients
      }, 1000);
  
      // Cleanup the interval when the socket disconnects
      socket.on("disconnect", () => {
        clearInterval(intervalId); // Clean up the interval when the user disconnects
      });
    });
  };
  