import React from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import {
  Flex,
  Button,
  VStack,
} from "@chakra-ui/react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      p={6}
      bgGradient="linear(to-br, teal.100, blue.200)"
    >
       <Header title="Welcome to Quiz-duell" />
      <VStack spacing={6}>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => navigate("/create")}
          shadow="md"
          _hover={{ transform: "scale(1.05)" }}
        >
          Create a Room
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => navigate("/roomvalidation")}
          shadow="md"
          _hover={{ transform: "scale(1.05)" }}
        >
          Join a Room
        </Button>
        <Button
          colorScheme="orange"
          size="lg"
          onClick={() => navigate("/leaderboard")}
          shadow="md"
          _hover={{ transform: "scale(1.05)" }}
        >
          DashBoard
        </Button>
      </VStack>
    </Flex>
  );
};

export default HomePage;
