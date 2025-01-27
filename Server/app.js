import express from 'express';
import cors from 'cors';
import createRoom from './routes/createroom.js';
import roomValidation from './routes/roomValidation.js'

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and credentials
}));

app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App!');
});

app.use('/api/v1/', createRoom);
app.use('/api/v1/',roomValidation);

export default app;
