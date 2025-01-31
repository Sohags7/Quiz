import React, { useState } from "react";
import Header from "./Header";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CreateRoomForm() {
  const [timer, setTimer] = useState(20); 
  const [selectedQuizzes, setSelectedQuizzes] = useState([]); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const quizCategories = ["Hawaii Quiz", "JEKAMI Facts of Asia", "JEKAMI LUHANA"]; 
  const toast = useToast();
  const navigate = useNavigate(); 
  const handleQuizSelection = (quiz) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quiz) ? prev.filter((q) => q !== quiz) : [...prev, quiz]
    );
  };

  const handleSubmit = async () => {
    if (timer <= 0) {
      toast({
        title: "Invalid Timer",
        description: "Timer must be greater than zero.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (selectedQuizzes.length === 0) {
      toast({
        title: "No Quiz Selected",
        description: "Please select at least one quiz category.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = { timer: parseInt(timer, 10), categories: selectedQuizzes };

    try {
      setIsSubmitting(true); 
      const response = await fetch("http://localhost:3000/api/v1/rooms/createroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error("Failed to create room. Please try again.");
      }

      let data = await response.json();
      data = data.lobby;

      toast({
        title: "Room Created",
        description: `Room code: ${data.roomCode}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const password = data.password;

      navigate(`/qrcodelink/${data.roomCode}`, { state: { password } });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleCancel = () => {
    navigate("/"); 
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
      <Header title="Quiz Creation Platform"/>

      <Box bg="white" p={6} shadow="md" borderRadius="lg" w="full" maxW="md">
        {/* Timer Input */}
        <FormControl mb={4}>
          <FormLabel>Question Timer (seconds):</FormLabel>
          <Input
            type="number"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            placeholder="Enter timer in seconds"
            min={1}
          />
        </FormControl>

        {/* Quiz Selection */}
        <FormControl mb={4}>
          <FormLabel>Select Quizzes:</FormLabel>
          <VStack align="start">
            {quizCategories.map((quiz) => (
              <Checkbox
                key={quiz}
                isChecked={selectedQuizzes.includes(quiz)}
                onChange={() => handleQuizSelection(quiz)}
              >
                {quiz}
              </Checkbox>
            ))}
          </VStack>
        </FormControl>

        {/* Buttons */}
        <VStack spacing={4}>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Creating"
          >
            Create Room
          </Button>
          <Button colorScheme="red" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default CreateRoomForm;



