import express from 'express';
import {  roomValidation } from '../controllers/roomValidation.js';

const router = express.Router();
router.post('/rooms/joinroom', roomValidation);
export default router;
