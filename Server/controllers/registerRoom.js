import Lobby from '../models/Lobby.js';
import QRCode from 'qrcode';
import crypto from 'crypto';
import quizData from '../models/quiz.json' assert { type: 'json' };

const generateRoomCode = () => {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

const generateRandomPassword = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};

export const roomCreate = async (req, res) => {
  const { quizId, categories, timer } = req.body;

  // Validate categories
  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ message: 'At least one category is required.' });
  }

  // Validate timer
  if (typeof timer !== 'number' || timer < 5 || timer > 300) {
    return res.status(400).json({ message: 'Timer must be a number between 5 and 300 seconds.' });
  }

  try {
    const roomCode = generateRoomCode();
    const password = generateRandomPassword();
    const selectedCategories = [];

    // Iterate over categories to select questions
    for (let category of categories) {
      const selectedCategory = quizData.categories.find((cat) => cat.category === category);

      if (!selectedCategory) {
        return res.status(404).json({ message: `Category "${category}" not found.` });
      }

      // Select random questions
      const randomQuestions = selectedCategory.questions
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      selectedCategories.push({
        category,
        questions: randomQuestions,
      });
    }

    // Create new lobby
    const newLobby = new Lobby({
      roomCode,
      quizId,
      password,
      timer,
      categories: selectedCategories,
    });

    await newLobby.save();

    // Generate QR code for the room
    const qrCodeUrl = await QRCode.toDataURL(roomCode);

    // Send successful response
    return res.status(201).json({
      message: 'Lobby created successfully!',
      lobby: {
        roomCode: newLobby.roomCode,
        quizId: newLobby.quizId,
        password: newLobby.password,
        timer: newLobby.timer,
        categories: selectedCategories,
        qrCode: qrCodeUrl,
      },
    });
  } catch (error) {
    console.error('Error creating lobby:', error);
    return res.status(500).json({ message: 'Failed to create lobby.', error });
  }
};
