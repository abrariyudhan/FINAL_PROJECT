import { config } from "dotenv";
import { createServer } from "http";

// Load .env.local file FIRST before any other imports
config({ path: ".env.local" });

// Verify environment variables are loaded
console.log("📋 Environment check:");
console.log(
  "- MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Loaded" : "❌ Missing",
);
console.log("- SOCKET_PORT:", process.env.SOCKET_PORT || "3001 (default)");
console.log(
  "- CLIENT_URL:",
  process.env.CLIENT_URL || "http://localhost:3000 (default)",
);

const PORT = process.env.SOCKET_PORT || 3001;

// Create HTTP server untuk Socket.IO
const httpServer = createServer();

// Use dynamic import to ensure env vars are loaded first
const { initChatSocket } = await import("./src/server/socket/chatSocket.js");

// Initialize Socket.IO dengan HTTP server
const io = initChatSocket(httpServer);
console.log("🔌 Socket.IO initialized");

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
