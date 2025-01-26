import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';


const AutoIncrement = AutoIncrementFactory(mongoose);

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct_answer: String
});

const lobbySchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true },
  quizId: { type: Number, unique: true },
  timer : { type: Number,required: true},
  categories: [
    {
      category: { type: String, required: true }, 
      questions: [questionSchema] 
    }
  ],
  participants: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

lobbySchema.plugin(AutoIncrement, { inc_field: 'quizId' });

export default mongoose.model('Lobby', lobbySchema);
