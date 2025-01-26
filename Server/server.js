import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js'; 
import mongoose from 'mongoose'; 

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/quiz-lobby'); 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); 
  }
};
connectDB();

const server = createServer(app);


const io = new Server(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
