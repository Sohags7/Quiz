// src/components/JoinRoomForm.jsx
import React, { useState } from "react";
import { Box, Input, Button, VStack, Heading } from "@chakra-ui/react";

const JoinRoomForm = ({ onJoin, onCancel }) => {
  const [roomCode, setRoomCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin(roomCode);
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="lg" textAlign="center">
      <Heading as="h2" size="md" mb={4}>
        Enter Room Code
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <Button colorScheme="blue" type="submit">
            Join Room
          </Button>
          <Button colorScheme="red" onClick={onCancel}>
            Cancel
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default JoinRoomForm;
