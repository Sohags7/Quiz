import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateRoomForm from "./components/CreateRoomForm.jsx";
import QuizRoom from "./pages/QuizRoom.jsx";
import HomePage from "./pages/HomePage.jsx";
import JoinLink from "./pages/qrCodeLink.jsx";
import RoomValidation from "./components/RoomValidation.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";


function App() {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateRoomForm />} />
            <Route path="/qrcodelink/:roomCode" element={<JoinLink />} />
            <Route path="/roomvalidation" element={<RoomValidation />} />
            <Route path="/joinroom/:roomCode" element={<QuizRoom />} />
            <Route path="/leaderboard" element={<Leaderboard /> }/>
          </Routes>
        </Router>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
