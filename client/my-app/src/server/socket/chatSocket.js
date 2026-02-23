import { Server } from "socket.io";
import Chat from "../models/Chat";

export function initChatSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    // Join conversation room untuk receive messages
    socket.on("joinRoom", (conversationId) => {
      socket.join(conversationId);
      console.log(`User ${socket.id} joined room ${conversationId}`);
    });

    // Leave room saat pindah conversation
    socket.on("leaveRoom", (conversationId) => {
      socket.leave(conversationId);
      console.log(`User ${socket.id} left room ${conversationId}`);
    });

    // Send message dan broadcast ke semua user di room
    socket.on("sendMessage", async (data) => {
      const { conversationId, senderId, content, type, fileUrl, fileName } =
        data;
      try {
        // Save message ke database
        await Chat.addMessage(conversationId, {
          senderId,
          content,
          type: type || "text",
          fileUrl: fileUrl || null,
          fileName: fileName || null,
        });

        // Get updated conversation dengan message baru
        const updatedConversation = await Chat.getById(conversationId);
        const newMessage =
          updatedConversation.messages[updatedConversation.messages.length - 1];

        // Broadcast message ke semua user di room
        io.to(conversationId).emit("receiveMessage", {
          conversationId,
          message: newMessage,
        });
      } catch (error) {
        console.error("Error sending message:", error.message);
        socket.emit("messageError", { error: error.message });
      }
    });

    // Typing indicator
    socket.on("typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("userTyping", { conversationId, userId });
    });

    socket.on("stopTyping", ({ conversationId, userId }) => {
      socket
        .to(conversationId)
        .emit("userStoppedTyping", { conversationId, userId });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });
  });

  return io;
}
