import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import RoomForm from "./RoomForm";
import { useToast } from "@chakra-ui/react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Heading,
  Select,
} from "@chakra-ui/react";

function RoomValidation() {
  const [roomCode, setRoomCode] = useState("");
  const [view, setView] = useState("");
  const toast = useToast();

  const handleJoinRoom = async () => {
    if (!roomCode) {
      alert("Room code is required!");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/rooms/joinroom?roomCode=${roomCode}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomCode }),
        }
      );

      if (!response.ok) {
        toast({
          title: "Invalid Room Code",
          description: "Room code is not correct! Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }      

      setView("roomform");
    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      p={6}
      bgGradient="linear(to-br, teal.100, blue.200)"
    >
      <Header title="Join a Quiz Room" />
      {view === "" && (
        <Box
          bg="white"
          shadow="lg"
          borderRadius="xl"
          p={8}
          width="100%"
          maxW="lg"
          textAlign="center"
        >
          <Heading as="h2" size="lg" mb={4} color="teal.600">
            Enter Room Details
          </Heading>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel fontWeight="bold" color="gray.700">
                Room Code
              </FormLabel>
              <Input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Enter room code"
                bg="gray.100"
                focusBorderColor="teal.500"
                _hover={{ bg: "gray.50" }}
                borderRadius="md"
                size="lg"
              />
            </FormControl>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleJoinRoom}
              _hover={{ bg: "teal.600" }}
              _active={{ bg: "teal.700" }}
              borderRadius="full"
            >
              Join Room
            </Button>
          </VStack>
        </Box>
      )}
       {view === "roomform" && <RoomForm roomCode={roomCode} />}
       
    </Flex>
  );
}

export default RoomValidation;
