import React from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import {
  Flex,
  Box,
  Button,
  Text,
  Heading,
  Icon,
  Link,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { QRCodeSVG } from "qrcode.react";
import Header from "../components/Header";

function JoinLink() {
  const { roomCode } = useParams(); 
  const navigate = useNavigate(); 

  const apiUrl = `http://localhost:3000/api/v1/rooms/joinroom?roomCode=${roomCode}`;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      p={6}
      bgGradient="linear(to-br, teal.100, blue.200)"
    >
      <Header title="Room Created Successfully!" />

      <Box bg="white" p={8} shadow="lg" borderRadius="lg" textAlign="center">
        <Icon as={CheckCircleIcon} boxSize={8} color="green.400" mb={4} />
        <Heading as="h2" size="md" mb={4} color="gray.700">
          Room Created Successfully!
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={2}>
          Room Code:
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="blue.500"
          mb={6}
          bg="blue.50"
          p={2}
          borderRadius="md"
          shadow="sm"
        >
          {roomCode}
        </Text>

        <QRCodeSVG value={apiUrl} size={350} />

   
        <Box mt={6}>
          <Link href={apiUrl} color="blue.600" fontSize="lg" isExternal>
            Click here to join the room
          </Link>
        </Box>

        <Button
          colorScheme="blue"
          size="md"
          mt={10}
          onClick={() => navigate("/")} 
          _hover={{ transform: "scale(1.08)" }}
        >
          Back to Home
        </Button>
      </Box>
    </Flex>
  );
}

export default JoinLink;
