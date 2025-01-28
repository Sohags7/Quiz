// src/components/JoinRoomForm.jsx
import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RoomForm = ({ roomCode }) => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const navigate = useNavigate();

  const handleSubmitForm = () => {
    if (!name || !team) {
      alert("Name and team selection are required!");
      return;
    }

    navigate(`/joinroom/${roomCode}`, { state: { name, team } });
  };

  return (
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
        Fill Room Form
      </Heading>
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel fontWeight="bold" color="gray.700">
            Name
          </FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            bg="gray.100"
            focusBorderColor="teal.500"
            _hover={{ bg: "gray.50" }}
            borderRadius="md"
            size="lg"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="bold" color="gray.700">
            Team
          </FormLabel>
          <Select
            placeholder="Select your team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            bg="gray.100"
            focusBorderColor="teal.500"
            _hover={{ bg: "gray.50" }}
            borderRadius="md"
            size="lg"
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </Select>
        </FormControl>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleSubmitForm}
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          borderRadius="full"
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default RoomForm;
