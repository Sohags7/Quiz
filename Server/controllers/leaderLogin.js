import Lobby from '../models/Lobby.js';

export const leaderLogin = (req, res) => {
  const { roomCode, password } = req.body;

  if (!roomCode || !password) {
    return res.status(400).json({ success: false, message: 'Room Code and Password are required' });
  }
  const room = Lobby.find(r => r.roomCode === roomCode && r.password === password);

  if (room) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false, message: 'Invalid Room Code or Password' });
  }
};

