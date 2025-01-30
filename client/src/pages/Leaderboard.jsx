import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Table,
  Thead,
  Flex,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Header";
import socket from "../socket";
const Leaderboard = () => {
  const [roomCode, setRoomCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLeader, setIsLeader] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showTable, setShowTable] = useState(false);  // New state for controlling table visibility
  const [winner, setWinner] = useState(null);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/lobby/leader-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode, password }),
      });

      const data = await res.json();
      if (data.success) {
        setIsLeader(true);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Invalid Room Code or Password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      toast({
        title: "Login failed",
        description: "An error occurred while logging in.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const startQuiz = async () => {
    try {
      setQuizStarted(true);
      setShowTable(true);  
      socket.emit("QuizStart",roomCode);
      toast({
        title: "Quiz started",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error starting quiz", error);
      toast({
        title: "Error starting quiz",
        description: "An error occurred while starting the quiz.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
      <Box
        bg="white"
        shadow="lg"
        borderRadius="xl"
        p={8}
        width="40%"
        maxW="100%" 
        textAlign="center"
      >
       <Header title="Welcome Admin to Quiz Duell" />
       

        {!isLeader ? (
          <VStack spacing={4} align="stretch">
            <Input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter Room Code"
              bg="gray.100"
              focusBorderColor="teal.500"
              _hover={{ bg: "gray.50" }}
              borderRadius="md"
              size="lg"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              bg="gray.100"
              focusBorderColor="teal.500"
              _hover={{ bg: "gray.50" }}
              borderRadius="md"
              size="lg"
            />
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleLogin}
              borderRadius="full"
            >
              Login as Leader
            </Button>
          </VStack>
        ) : (
          <>
          <h1>Room Code : <span>{roomCode}</span></h1>
            {!showTable && !quizStarted && (
              <Button
                colorScheme="green"
                size="lg"
                onClick={startQuiz}
                borderRadius="full"
                mt={6}
              >
                Start Quiz
              </Button>
            )}

            {/* Table only renders after quiz has started */}
            {showTable && (
              <Box overflowX="auto" borderRadius="md" boxShadow="md" mt={6}>
                <Table variant="simple" colorScheme="gray">
                  <Thead bg="gray.700">
                    <Tr>
                      <Th color="white">Player</Th>
                      <Th color="white">Score</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr borderBottom="1px solid gray">
                      <Td>Red</Td>
                      <Td>7</Td>
                    </Tr>
                    <Tr borderBottom="1px solid gray">
                      <Td>Blue</Td>
                      <Td>9</Td>
                    </Tr>
                    <Tr borderBottom="1px solid gray">
                      <Td>Green</Td>
                      <Td>0</Td>
                    </Tr>
                    <Tr borderBottom="1px solid gray">
                      <Td>Yellow</Td>
                      <Td>9</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            )}

            {winner && (
              <Box textAlign="center" mt={6}>
                <Heading size="md">🎉 Winner: {winner.username} 🎉</Heading>
                <Heading size="lg" color="teal.500">
                  Score: {winner.score}
                </Heading>
              </Box>
            )}
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Leaderboard;
