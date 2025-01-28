import React, { useState } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { QRCodeSVG } from "qrcode.react";
import CreateRoomForm from "./components/createRoomForm.jsx";
import JoinRoomForm from "./components/joinRoomForm";
import RoomPage from "./pages/RoomPage";
import Header from "./components/Header";
import { useLocation } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import JoinLink from "./pages/qrCodeLink.jsx";
import JoinRoom from "./components/joinRoom.jsx";

function App() {
  // const [roomData, setRoomData] = useState(null); // Room data after creation
  // const navigate = useNavigate(); // Navigation handler
  // const location = useLocation();

  // const handleCreateRoom = async (formData) => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/v1/rooms/createroom", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await response.json();
  //     setRoomData(data.lobby);
  //   } catch (error) {
  //     console.error("Error creating room:", error);
  //   }
  // };

  // const handleJoinRoom = async (roomCode) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/v1/rooms/joinroom?roomCode=${roomCode}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ roomCode }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Room code is not correct!");
  //     }
  //     navigate(`/room/${roomCode}`); // Navigate to the room page
  //   } catch (error) {
  //     alert(error.message || "Something went wrong!");
  //   }
  // };
  // const isRoomPage = location.pathname.startsWith("/room");

  return (
   <ChakraProvider>
      <Routes>
				<Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreateRoomForm/>}/>
        <Route path="/qrcodelink/:roomCode" element={<JoinLink />} />
        <Route path='/roomvalidation' element={<JoinRoom />} />
        <Route path="/joinroom/:roomCode" element={<RoomPage  onExit={() => navigate("/")} />} />
			</Routes>
    </ChakraProvider>



    // <ChakraProvider>
    //   <Flex direction="column" align="center" justify="center" minH="100vh" p={6} bgGradient="linear(to-br, teal.100, blue.200)">
    //   {!isRoomPage && <Header />}
    //     <Routes>
    //       {/* Home Page */}
    //       <Route
    //         path="/"
    //         element={
              // <VStack spacing={6}>
              //   <Button
              //     colorScheme="blue"
              //     size="lg"
              //     onClick={() => navigate("/create")}
              //     shadow="md"
              //     _hover={{ transform: "scale(1.05)" }}
              //   >
              //     Create a Room
              //   </Button>
              //   <Button
              //     colorScheme="green"
              //     size="lg"
              //     onClick={() => navigate("/join")}
              //     shadow="md"
              //     _hover={{ transform: "scale(1.05)" }}
              //   >
              //     Join a Room
              //   </Button>
              // </VStack>
    //         }
    //       />

    //       {/* Create Room Page */}
    //       <Route
          
    //         path="/create"
            
    //         element={
    //           roomData ? (
    //             <Box bg="white" p={8} shadow="lg" borderRadius="lg" textAlign="center">
    //               <Icon as={CheckCircleIcon} boxSize={8} color="green.400" mb={4} />
    //               <Heading as="h2" size="md" mb={4} color="gray.700">
    //                 Room Created Successfully!
    //               </Heading>
    //               <Text fontSize="lg" color="gray.600" mb={2}>
    //                 Room Code:
    //               </Text>
    //               <Text
    //                 fontSize="2xl"
    //                 fontWeight="bold"
    //                 color="blue.500"
    //                 mb={6}
    //                 bg="blue.50"
    //                 p={2}
    //                 borderRadius="md"
    //                 shadow="sm"
    //               >
    //                 {roomData.roomCode}
    //               </Text>
    //               <QRCodeSVG value={roomData.qrCode} size={300} />
    //               <Button colorScheme="blue" size="md" onClick={() => navigate("/")} _hover={{ transform: "scale(1.05)" }}>
    //                 Back to Home
    //               </Button>
    //             </Box>
    //           ) : (
    //             <CreateRoomForm onSubmit={handleCreateRoom} onCancel={() => navigate("/")} />
    //           )
    //         }
    //       />

    //       {/* Join Room Page */}
    //       <Route
    //         path="/join"
    //         element={<JoinRoomForm onJoin={handleJoinRoom} onCancel={() => navigate("/")} />}
    //       />
    //       <Route
    //         path="/room/:roomCode"
    //         element={<RoomPage  onExit={() => navigate("/")} />}
    //       />
    //     </Routes>
    //   </Flex>
    //   <Routes>
        
    //   </Routes>
    // </ChakraProvider>

  
  );
}

export default App;

