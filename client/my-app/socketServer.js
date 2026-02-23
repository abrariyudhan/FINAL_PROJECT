import "dotenv/config";
import { createServer } from "http";
import { initChatSocket } from "./src/server/socket/chatSocket.js";

const PORT = process.env.SOCKET_PORT || 3001;

// Create HTTP server untuk Socket.IO
const httpServer = createServer();

// Initialize Socket.IO dengan HTTP server
const io = initChatSocket(httpServer);

// Start server
httpServer.listen(PORT, () => {
  console.log(`✅ Socket.IO server running on http://localhost:${PORT}`);
});

// Handle server errors
httpServer.on("error", (error) => {
  console.error("❌ Socket server error:", error);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("⏹️  SIGTERM received, closing Socket.IO server...");
  httpServer.close(() => {
    console.log("✅ Socket.IO server closed");
    process.exit(0);
  });
});
