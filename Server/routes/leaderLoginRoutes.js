
import express from 'express';
import { leaderLogin } from '../controllers/leaderLogin.js';

const router = express.Router();

router.post('/lobby/leader-login', leaderLogin);

export default router;
