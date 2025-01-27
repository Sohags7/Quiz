import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";  // Add the missing imports

function Header() {
  return (
    <Box textAlign="center" mb={8}>
      <Heading as="h1" size="xl" mb={2} color="blue.600" textAlign="center">
        Welcome to Quiz-duell
      </Heading>                                                                                                                                                                                    
      <Text fontSize="lg" color="gray.700">
        Your gateway to fun and interactive quizzes
      </Text>
    </Box>
  );
}

export default Header;
