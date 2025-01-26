import express from 'express';
import cors from 'cors';
import createRoom from './routes/createroom.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App!');
});

app.use('/api/v1/', createRoom);

export default app;
