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
import { CheckCircleIcon } from "@chakra-ui/icons";
import {QRCodeSVG} from 'qrcode.react';
import CreateRoomForm from "./components/createRoom";

function App() {
  const [view, setView] = useState(""); // Current view state
  const [roomData, setRoomData] = useState(null); // Room data after creation

  const handleCreateRoom = async (formData) => {
    console.log("here is my form data",formData);
    try {
      const response = await fetch("http://localhost:3000/api/v1/rooms/createroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setRoomData(data.lobby);
       
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        bgGradient="linear(to-br, teal.100, blue.200)"
        p={6}
      >
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={2} color="blue.600">
            Welcome to Quiz-duell
          </Heading>
          <Text fontSize="lg" color="gray.700">
            Your gateway to fun and interactive quizzes
          </Text>
        </Box>

        {/* Initial View */}
        {view === "" && (
          <VStack spacing={6}>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => setView("create")}
              shadow="md"
              _hover={{ transform: "scale(1.05)" }}
            >
              Create a Room
            </Button>
            <Button
              colorScheme="green"
              size="lg"
              onClick={() => setView("join")}
              shadow="md"
              _hover={{ transform: "scale(1.05)" }}
            >
              Join a Room
            </Button>
          </VStack>
        )}

        {/* Create Room View */}
        {view === "create" && !roomData && (
          <CreateRoomForm
            onSubmit={handleCreateRoom}
            onCancel={() => setView("")}
          />
        )}

        {/* Room Created View */}
        {view === "create" && roomData && (
          <Box
            bg="white"
            p={8}
            shadow="lg"
            borderRadius="lg"
            textAlign="center"
            maxW="400px"
          >
            <Icon as={CheckCircleIcon} boxSize={8} color="green.400" mb={4} />
            <Heading as="h2" size="md" mb={4} color="gray.700">
              Room Created Successfully!
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={2}>
              Room Code:
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="blue.500"
              mb={6}
              bg="blue.50"
              p={2}
              borderRadius="md"
              shadow="sm"
            >
              {roomData.roomCode}
            </Text>
            <Box mb={6}>
              <QRCodeSVG value={roomData.qrCode} size={300} />
            </Box>
            <Button
              colorScheme="blue"
              size="md"
              onClick={() => setView("")}
              _hover={{ transform: "scale(1.05)" }}
            >
              Back to Home
            </Button>
          </Box>
        )}

        {/* Join Room Placeholder */}
        {view === "join" && (
          <Box
            bg="white"
            p={8}
            shadow="lg"
            borderRadius="lg"
            textAlign="center"
            maxW="400px"
          >
            <Heading as="h2" size="lg" mb={4} color="gray.700">
              Join a Room
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              This feature is coming soon!
            </Text>
            <Button
              colorScheme="red"
              size="md"
              onClick={() => setView("")}
              _hover={{ transform: "scale(1.05)" }}
            >
              Back to Home
            </Button>
          </Box>
        )}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
