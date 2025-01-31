import Lobby from '../models/Lobby.js';

export const leaderLogin = async (req, res) => {
  const { roomCode, password } = req.body;

  if (!roomCode || !password) {
    return res.status(400).json({ success: false, message: 'Room Code and Password are required' });
  }

  try {
    
    const room = await Lobby.findOne({ roomCode, password });

    if (room) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid Room Code or Password' });
    }
  } catch (err) {
    console.error('Error during leader login:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};