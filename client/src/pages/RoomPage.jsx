import React, { useEffect } from "react";
import { Box, Text, Heading, VStack,Button } from "@chakra-ui/react";
import socket from "../socket";

const RoomPage = ({ roomCode, onExit }) => {
  useEffect(() => {
    socket.emit("joinRoom", { roomCode });

    socket.on("message", (message) => {
        if(message=== "Fail") {
            alert("invalid room")
        }
      console.log("Message from server:", message);
    });

    return () => {
      socket.emit("leaveRoom", { roomCode });
      socket.off("message");
    };
  }, [roomCode]);

  return (
    
    <Box textAlign="center" p={8} bg="white" shadow="lg" borderRadius="lg">
      <Heading as="h2" size="lg" mb={4}>
        Room: {roomCode}
      </Heading>
      <VStack spacing={4}>
        <Text>Connected to the room. Waiting for other participants...</Text>
        <Button colorScheme="red" onClick={onExit}>
          Leave Room
        </Button>
      </VStack>
    </Box>
  );
};

export default RoomPage;
