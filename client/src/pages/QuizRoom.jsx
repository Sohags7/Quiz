import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  AvatarGroup,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
  useDisclosure,
  Progress,
  useToast,
  Stack,
  List,
  ListItem,
  Icon,
  Badge
} from "@chakra-ui/react";
import {
  FaComments,
  FaHistory,
  FaUsers,
  FaRocket,
  FaPaperPlane,
  FaClock,
  FaRegBell
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import socket from "../socket";
import { Navigate, useLocation, useParams } from 'react-router-dom';

const MotionBox = motion(Box);

const QuizRoom = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activity, setActivity] =useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionLength,setQuestionLength] = useState(0);
  const location = useLocation();
  const { roomCode } = useParams();
  const { state } = location;
  const { name, team } = state || {}; 
  const toast = useToast();
  const [newActivityCount, setNewActivityCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.emit("joinRoom", { roomCode, name, team });
    return () => {
      socket.off("joinRoom"); 
    };
  }, []);
 
  useEffect(() => {
    
    socket.on("previousMessages",(history) => {
      console.log("previous history",history);
      setMessages(history);
    });
    socket.on("newMsg",(msg) => {
      setMessages((messages) => [...messages, msg])
    });

    socket.on("inValidroom", (message) => {
      if(message === "Fail") {
          alert("invalid room");
      }
    console.log("Message from server:", message);
   });

  

  socket.on("Question",(quizData,quizDataLength) => {
    console.log("here quiz data came", quizData.questionIndex,quizDataLength);
    setCurrentQuestion(quizData);
    setQuestionLength(quizDataLength);
    setTimeLeft(quizData.timer);
    setIsLocked(false);
    setSelectedAnswer(null);

    if(quizData.questionIndex == 1) {
      setQuizStarted(true);
      toast({
        title: "Quiz Started!",
        status: "success",
        duration: 2000,
        isClosable: true
      });
    }
      if(quizData.questionIndex == (quizDataLength)){
      console.log("length",questionLength);
        toast({
          title: "Quiz End! Thank you for Participated in this quiz.",
          status: "success",
          duration: 2000,
          isClosable: true
        });
        setQuizStarted(false);

      }
   
  });

  socket.on("activityHistory", (activityHistory) => {
    console.log("New activity received:", activityHistory);
    
    setActivity(activityHistory);
    
    if (activeTab !== 1) {
      setNewActivityCount((prevCount) => prevCount + 1);
    }
  });
 
   socket.on("usersUpdated", (users) => {
    setUsers(users);
  });
 
 
  return () => {
    socket.off('previousMessages');
    socket.off('newMsg');
    socket.off('inValidroom');
    socket.off("usersUpdated");
    socket.off("activityHistory");
    socket.off("startQuiz");
    socket.off("Question");
  };

  },[]);


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  
  const handleAnswer = (answer) => {
      console.log("Answer",answer,name,team);
      if (!isLocked) {
        setSelectedAnswer(answer);
      }
  };
  const lockAnswer = () => {
    if (selectedAnswer) {
      const userAnswer = {
        name:name,
        submitanswer : selectedAnswer,
        correct_answer: currentQuestion.correct_answer,
        team:team,
        roomCode: roomCode,
      };
      socket.emit("userSelectedAnswer",userAnswer);

      setIsLocked(true);
    }
  };
  

  const sendMessage = () => {
    if (!newMessage.trim()) {
      console.error("Cannot send an empty message!");
      return;
    }
  
    if (!roomCode || !name) {
      console.error("Room code or user name is missing!");
      return;
    }
  
    const timestamp = new Date().toISOString(); // UTC format
    const message = {
      id: Date.now(),
      roomCode,
      text: newMessage.trim(),
      user: name,
      team: team, 
      time: timestamp,
    };
    socket.emit("newMessage", message, (error) => {
      if (error) {
        console.error("Message sending failed:", error);
      }
    });
  
    setNewMessage(""); 
  };
  


  return (
    <Box minH="100vh" bgGradient="linear(to-br, #1a0f3c, #2d1b69)" color="white">
      {/* Navbar */}
      <Flex
        bg="rgba(255, 255, 255, 0.05)"
        p={4}
        backdropFilter="blur(10px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Heading size="lg" mr={8} display="flex" alignItems="center">
          <Icon as={FaRocket} mr={2} /> Quiz Room :  {roomCode}
        </Heading>

        <Tabs index={activeTab} onChange={setActiveTab} variant="unstyled" flex={1}>
          <TabList>
            <Tab _selected={{ color: "white", bg: "rgba(255, 255, 255, 0.1)" }} borderRadius="lg" mx={1}>
              <Icon as={FaComments} mr={2} /> Messages
            </Tab>
            <Tab
                _selected={{ color: "white", bg: "rgba(255, 255, 255, 0.1)" }}
                borderRadius="lg"
                mx={1}
                onClick={() => setNewActivityCount(0)} // Reset count when user clicks
              >
                <Icon as={FaHistory} mr={2} /> Activity
                {newActivityCount > 0 && (
                  <Badge colorScheme="red" ml={2} borderRadius="full" px={2}>
                    {newActivityCount}
                  </Badge>
                )}
              </Tab>
           <Tab _selected={{ color: "white", bg: "rgba(255, 255, 255, 0.1)" }} borderRadius="lg" mx={1}>
              <Icon as={FaUsers} mr={2} /> Users ({users.length})
            </Tab>
          </TabList>
        </Tabs>

        <Flex align="center" gap={4}>
          {quizStarted ? (
            <Tag colorScheme="purple" px={4} py={2} borderRadius="full">
              <Icon as={FaClock} mr={2} /> Time: {timeLeft}s
            </Tag>
          ) : (
            <Button
              colorScheme="purple"
              leftIcon={<FaRocket />}
              borderRadius="full"
              px={8}
              _hover={{ transform: "scale(1.05)" }}
            >
             Quiz will be Start soon!!
            </Button>
          )}
          <Button
              colorScheme="purple"
              leftIcon={<FaRocket />}
              borderRadius="full"
              px={8}
              _hover={{ transform: "scale(1.05)" }}
            >
             {name}
            </Button>
          <Avatar name="Host" size="sm" bg="purple.500" />
        </Flex>
      </Flex>

      {/* Main Content */}
      <Flex p={8} gap={8} height="calc(100vh - 80px)">
        {/* Left Panel */}
        <MotionBox
          flex={1}
          bg="rgba(255, 255, 255, 0.05)"
          borderRadius="2xl"
          p={6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Tabs index={activeTab}>
            <TabPanels>
              {/* Messages Tab */}
              <TabPanel p={0}>
                <Box height="70vh" overflowY="auto" mb={4}>
                  {messages.map((msg, i) => (
                    <Flex key={i} mb={4} align="start" gap={3}>
                      <Avatar name={msg.user} size="sm" />
                      <Box flex={1}>
                        <Flex align="center" mb={1}>
                          <Text fontWeight="bold" mr={2}>{msg.user}</Text>
                          <Text fontSize="xs" opacity={0.7}>{msg.time}</Text>
                        </Flex>
                        <Text bg="rgba(255, 255, 255, 0.05)" p={3} borderRadius="lg">
                          {msg.text}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Box>
                <InputGroup>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    border="none"
                    bg="rgba(255, 255, 255, 0.07)"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<FaPaperPlane />}
                      colorScheme="purple"
                      borderRadius="full"
                      onClick={sendMessage}
                    />
                  </InputRightElement>
                </InputGroup>
              </TabPanel>

              {/* Activity Tab */}
              <TabPanel p={0}>
                <Box maxH="75vh" overflowY="auto"> {/* Set max height and enable scrolling */}
                <List spacing={4}>
              {Array.isArray(activity) ? activity.slice().reverse().map((act, index) => (
                <ListItem
                  key={index}
                  p={3}
                  bg="rgba(255, 255, 255, 0.05)"
                  borderRadius="lg"
                >
                  <Flex align="center">
                    <Icon as={FaRegBell} mr={3} color="purple.300" />
                    <Text flex={1}>{act.msg}</Text>
                    <Text fontSize="sm" opacity={0.7}>
                      {act.time}
                    </Text>
                  </Flex>
                </ListItem>
              )) : <Text>No activity found</Text>}
            </List>

                </Box>
              </TabPanel>


              {/* Users Tab */}
              <TabPanel p={0}>
                <Text mb={4} opacity={0.8}>Active Participants:</Text>
                <AvatarGroup size="md" max={6} mb={4}>
                  {users.map((user) => (
                    <Avatar key={user.socketId} name={user.name} bg="purple.500" />
                  ))}
                </AvatarGroup>
                <List spacing={3}>
                  {users.map((user) => (
                    <ListItem
                      key={user}
                      p={3}
                      bg="rgba(255, 255, 255, 0.05)"
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                    >
                      <Box w={2} h={2} bg="green.400" borderRadius="full" mr={3} />
                      <Text>{user.name}</Text>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MotionBox>

        {/* Right Panel - Quiz Area */}
        <MotionBox
          flex={2}
          bg="rgba(255, 255, 255, 0.05)"
          borderRadius="2xl"
          p={8}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
        >
           {quizStarted && currentQuestion.question !== null ? (
            <Box>
              <Flex justify="space-between" mb={8}>
                <Tag colorScheme="purple" px={4} py={2}>
                  Question {currentQuestion.questionIndex} of {questionLength - 1}
                </Tag>
                <Flex align="center" gap={2}>
                  <Icon as={FaClock} />
                  <Text>{timeLeft}s remaining</Text>
                </Flex>
              </Flex>

              <MotionBox
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                bgGradient="linear(to-r, #4a1d6b, #6a3bb5)"
                p={8}
                borderRadius="2xl"
                mb={8}
              >
                <Heading size="lg" mb={6}>
                  {currentQuestion.question}
                </Heading>
                <Stack spacing={4}>
                  {(currentQuestion?.options || []).map((answer, i) => (
                    <Button
                      key={i}
                      justifyContent="start"
                      size="lg"
                      p={6}
                      bg={selectedAnswer === answer ? "purple.600" : "rgba(255, 255, 255, 0.1)"}
                      _hover={isLocked ? {} : { bg: "rgba(3, 230, 52, 0.15)" }}
                      color={selectedAnswer === answer ? "white" : "inherit"}
                      isDisabled={isLocked}
                      onClick={() => handleAnswer(answer)}
                    >
                      <Badge colorScheme="purple" mr={4}>{String.fromCharCode(65 + i)}</Badge>
                      {answer}
                    </Button>
                  ))}
                </Stack>
                </MotionBox>

                <Button
                  colorScheme="purple"
                  size="lg"
                  w="100%"
                  mb={4}
                  isDisabled={!selectedAnswer || isLocked}
                  onClick={lockAnswer}
                >
                  {isLocked ? "Answer Locked" : "Lock Answer"}
                </Button>

              <Progress
                value={(currentQuestion.questionIndex) / (questionLength-1) * 100}
                size="sm"
                colorScheme="purple"
                borderRadius="full" 
              />
            </Box>
          ) : (
            <Flex height="100%" align="center" justify="center">
              <Text fontSize="xl" opacity={0.7}>
                {quizStarted ? "Loading next question..." : "Quiz not started yet"}
              </Text>
            </Flex>
          )}
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default QuizRoom;