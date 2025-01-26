import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  const joinRoom = () => {
    console.log("Joining room:", { roomCode, name });
    // Replace with your backend API call
    fetch("/api/join-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode, name }),
    })
      .then((res) => res.json())
      .then((data) => alert(`Joined room successfully!`))
      .catch((error) => console.error("Error joining room:", error));
  };

  return (
    <Box bg="white" shadow="md" borderRadius="lg" p={6} w="full" maxW="md">
      <Heading as="h2" size="lg" mb={4}>Join Room</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Room Code:</FormLabel>
          <Input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter room code"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </FormControl>
        <Button
          colorScheme="green"   
          onClick={joinRoom}
          width="full"
        >
          Join Room
        </Button>
      </VStack>
    </Box>
  );
}

export default JoinRoom;
