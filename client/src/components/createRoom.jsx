import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

function CreateRoomForm({ onSubmit, onCancel }) {
  const [timer, setTimer] = useState(20);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const quizCategories = ["Hawaii Quiz", "JEKAMI Facts of Asia", "JEKAMI LUHANA"];

  const handleQuizSelection = (quiz) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quiz) ? prev.filter((q) => q !== quiz) : [...prev, quiz]
    );
  };

  const handleSubmit = () => {
    const formData = { timer, categories: selectedQuizzes };
    onSubmit(formData); 
  };

  return (
    <Box bg="white" p={6} shadow="md" borderRadius="lg" w="full" maxW="md">
      <FormControl mb={4}>
        <FormLabel>Question Timer (seconds):</FormLabel>
        <Input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          placeholder="Enter timer in seconds"
        />
      </FormControl>

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

      <VStack spacing={4}>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Create Room
        </Button>
        <Button colorScheme="red" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}

export default CreateRoomForm;
