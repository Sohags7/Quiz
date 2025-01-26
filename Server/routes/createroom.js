import express from 'express';
import { roomCreate } from '../controllers/registerRoom.js';

const router = express.Router();
router.post('/rooms/createroom', roomCreate);
export default router;
