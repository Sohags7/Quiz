
export const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Connected new User:", socket.id);
        socket.on("joinRoom", async ({ roomCode }) => {
            console.log(`User ${socket.id} attempted to join room: ${roomCode}`);
        });

        // Handle leaveRoom event
        socket.on("leaveRoom", ({ roomCode }) => {
            console.log(`User ${socket.id} left room: ${roomCode}`);
            socket.leave(roomCode);
            io.to(roomCode).emit("message", `${socket.id} has left the room.`);
        });

        // Handle user disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

