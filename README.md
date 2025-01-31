# Real-Time Multiplayer Quiz Application
This project is a real-time multiplayer quiz application that enables users to create quiz rooms, join teams, and participate in live quizzes. The application leverages a modern tech stack to provide an interactive and engaging experience.
## Key Features
### Lobby Creation
- API endpoints for creating quiz rooms.
- Storage of room details, including room code, quiz ID, and participants, in MongoDB.
- Generation of unique room codes and QR codes for each lobby using the qrcode library.

 ![image](https://github.com/user-attachments/assets/c6e5c462-b322-4681-8fd8-abbe0a7c4cac)

 ### Form for Category Selection and Time Setting:

- Implement a form where the lobby leader can select multiple quiz categories from a list.
- Provide an input field or a dropdown to set the time limit for the quiz.

![image](https://github.com/user-attachments/assets/247bf7ab-0319-48c3-9541-f95741fb5559)


### Handle Room Creation:

- Implement a function that triggers when the "Create Room" button is clicked.
This function should call the backend API to create a new room and retrieve the room code and password.
Generate QR Code:

- Use a QR code generation library to create a QR code containing the room code and password.
Display the QR code on the frontend for users to scan.
![image](https://github.com/user-attachments/assets/327c76e3-fe48-4953-98a1-628767163ee8)

 **Join a Room:**

   - Click on "Join Room."
   - Enter the room code and password.
   - Enter your name and select a team (Red, Green, Blue, Yellow).
   - Click "Join" to enter the room and participate in the quiz.
     ![image](https://github.com/user-attachments/assets/d32f515c-77eb-406e-9abc-2606561f352c)

## Start Quiz

**Quiz Start & Timer:** 
  - When the admin starts the quiz, it automatically begins with a set timer for each question.
    
**Activity Tracking:**
 - Users can view real-time updates on who enters or leaves the room and how many people are currently online.

 **Answer Locking:** 
- Once the timer starts, users must lock their answers and cannot modify them until the next question.
  
**Admin Controls:**
- Admins have the ability to start and manage the quiz, control the timing for each question, and monitor user activity in the room.
  
 **User Interaction:**
- Users can interact with the quiz by submitting answers to questions within the time limit.
Once the timer is running, users cannot change their answers, ensuring a fair experience for all participants.

![image](https://github.com/user-attachments/assets/d16efd4d-62f3-475c-a492-ff93c5f4cd76)

  **Display Winner**
- At the end of the quiz, the winning team will be displayed, showing the team with the highest score.
  ![image](https://github.com/user-attachments/assets/3834b82d-b670-4d6a-aa6b-15520a7d0ca3)
  
## Admin Dashboard & Login
Admins can access the admin dashboard by providing the roomCode and a password. This section describes the process for logging into the dashboard and the admin's controls.

![image](https://github.com/user-attachments/assets/d1848791-5866-48c9-9d1f-7ade16a67ab2)

- When the admin starts the quiz, they can view real-time updates on the scores of each team as the quiz progresses.
This functionality ensures that the admin can monitor team performance and adjust the quiz if necessary.

## Real-time Score Tracking:
**Live Leaderboard:**

- Once the quiz is started, the admin will see a live leaderboard displaying the current scores of all participating teams.
The leaderboard will update in real-time as answers are submitted and evaluated, showing the current team rankings.
Score Update Events:

- As each team submits their answer and the quiz evaluates whether the answer is correct, the system will update the scores for each team.
Admins will immediately see the score changes for each team on their dashboard without needing to refresh or take any action.

![image](https://github.com/user-attachments/assets/5b8bacc7-17e1-4d12-9f73-77b5d12fbc01)




