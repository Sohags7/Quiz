import Lobby from "../models/Lobby.js";

export const roomValidation = async (req, res) => {
  const { roomCode } = req.body; // Ensure you're accessing `req.body`

  // Validate the roomCode
  if (!roomCode || typeof roomCode !== "string") {
    return res.status(400).json({ message: "Invalid or missing room code." });
  }

  try {
    // Check if room exists
    const lobby = await Lobby.findOne({ roomCode });

    if (!lobby) {
      return res.status(404).json({ message: "Room not found!" });
    }

    return res.status(200).json({
      message: "Successfully joined the room!",
      lobby,
    });
  } catch (error) {
    console.error("Error while joining room:", error);
    return res.status(500).json({ message: "Server error occurred." });
  }
};
