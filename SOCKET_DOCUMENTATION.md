# Socket.IO Implementation Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Server-Side Implementation](#server-side-implementation)
4. [Client-Side Implementation](#client-side-implementation)
5. [Socket Events](#socket-events)
6. [Real-Time Message Flow](#real-time-message-flow)
7. [Room Management](#room-management)
8. [Error Handling](#error-handling)
9. [Setup & Configuration](#setup--configuration)
10. [Best Practices](#best-practices)

---

## Overview

This project uses **Socket.IO** to enable real-time, bidirectional communication between the client and server for instant messaging functionality. Socket.IO provides:

- **Real-time message delivery** without polling
- **Room-based architecture** for conversation isolation
- **Automatic reconnection** on connection loss
- **Fallback mechanisms** for reliability

### Key Features

- ✅ Real-time messaging between users
- ✅ Group chat support
- ✅ Room-based message broadcasting
- ✅ Typing indicators
- ✅ Automatic message persistence to MongoDB
- ✅ Error handling and fallback mechanisms

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Next.js)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  chat/page.js - Main Chat Component                  │  │
│  │  - Initialize Socket.IO client                       │  │
│  │  - Handle events (connect, receiveMessage, etc.)     │  │
│  │  - Emit events (joinRoom, sendMessage, typing)       │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↕                                  │
│                    Socket.IO Client                          │
└─────────────────────────────────────────────────────────────┘
                            ↕
                   WebSocket Connection
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              Socket Server (Node.js HTTP Server)            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  socketServer.js - Server Initialization             │  │
│  │  - Create HTTP server                                │  │
│  │  - Initialize Socket.IO with CORS                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  chatSocket.js - Socket Event Handlers               │  │
│  │  - Handle connection/disconnection                   │  │
│  │  - Process messages                                  │  │
│  │  - Manage rooms (join/leave)                         │  │
│  │  - Interact with MongoDB                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
                        MongoDB
           (Store messages permanently)
```

---

## Server-Side Implementation

### 1. Socket Server Setup (`socketServer.js`)

This file creates the standalone Socket.IO server that runs separately from the Next.js application.

```javascript
// Location: client/my-app/socketServer.js

import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.SOCKET_PORT || 3001;

// Create HTTP server for Socket.IO
const httpServer = createServer();

// Initialize Socket.IO with the server
const { initChatSocket } = await import("./src/server/socket/chatSocket.js");
const io = initChatSocket(httpServer);

// Start the server
httpServer.listen(PORT, () => {
  console.log(`✅ Socket.IO server running on http://localhost:${PORT}`);
});
```

**Key Points:**

- Runs on a separate port (default: 3001) from Next.js app (port 3000)
- Uses Node.js HTTP server as the base
- Loads environment variables from `.env.local`
- Implements graceful shutdown on SIGTERM

### 2. Chat Socket Logic (`src/server/socket/chatSocket.js`)

This file contains all the Socket.IO event handlers and business logic.

```javascript
// Location: client/my-app/src/server/socket/chatSocket.js

export function initChatSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    // Event handlers
    socket.on("joinRoom", (conversationId) => {
      /* ... */
    });
    socket.on("leaveRoom", (conversationId) => {
      /* ... */
    });
    socket.on("sendMessage", async (data) => {
      /* ... */
    });
    socket.on("typing", ({ conversationId, userId }) => {
      /* ... */
    });
    socket.on("stopTyping", ({ conversationId, userId }) => {
      /* ... */
    });
    socket.on("disconnect", () => {
      /* ... */
    });
  });

  return io;
}
```

**Key Points:**

- CORS configuration allows cross-origin requests from the client
- Each connected user gets a unique `socket.id`
- All message business logic is handled server-side
- Messages are saved to MongoDB before broadcasting

---

## Client-Side Implementation

### Socket Initialization (`src/app/chat/page.js`)

The client establishes a Socket.IO connection when the chat page loads.

```javascript
// Location: client/my-app/src/app/chat/page.js

import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
  {
    withCredentials: true,
  },
);

socketRef.current = socket;
```

**Key Points:**

- Socket is stored in a `useRef` to persist across re-renders
- Connection is established once during component mount
- Properly cleaned up on component unmount
- Uses environment variable for flexible deployment

### Event Listeners

```javascript
// Connection status
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});

// Receive messages
socket.on("receiveMessage", ({ conversationId, message }) => {
  if (conversationId === activeConversationRef.current) {
    setMessages((prev) => [...prev, message]);
  }
  loadConversations(); // Update last message preview
});

// Error handling
socket.on("messageError", ({ error }) => {
  console.error("❌ Message error:", error);
  alert("Failed to send message: " + error);
});
```

---

## Socket Events

### Server Events (Listened by Server)

| Event         | Parameters                                                       | Description                                  |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| `joinRoom`    | `conversationId`                                                 | Join a conversation room to receive messages |
| `leaveRoom`   | `conversationId`                                                 | Leave a conversation room                    |
| `sendMessage` | `{ conversationId, senderId, content, type, fileUrl, fileName }` | Send a new message                           |
| `typing`      | `{ conversationId, userId }`                                     | Notify others that user is typing            |
| `stopTyping`  | `{ conversationId, userId }`                                     | Notify others that user stopped typing       |
| `disconnect`  | -                                                                | User disconnected from server                |

### Client Events (Emitted by Server)

| Event               | Parameters                    | Description                          |
| ------------------- | ----------------------------- | ------------------------------------ |
| `connect`           | -                             | Successfully connected to server     |
| `disconnect`        | -                             | Disconnected from server             |
| `connect_error`     | `error`                       | Connection failed                    |
| `receiveMessage`    | `{ conversationId, message }` | New message received                 |
| `messageError`      | `{ error }`                   | Error occurred while sending message |
| `userTyping`        | `{ conversationId, userId }`  | User started typing                  |
| `userStoppedTyping` | `{ conversationId, userId }`  | User stopped typing                  |

---

## Real-Time Message Flow

### Sending a Message

```
1. User types message in ChatArea component
   ↓
2. handleSendMessage() called in chat/page.js
   ↓
3. Client emits 'sendMessage' event via Socket.IO
   socket.emit("sendMessage", {
     conversationId: "123",
     senderId: "user456",
     content: "Hello!",
     type: "text"
   })
   ↓
4. Server receives event in chatSocket.js
   ↓
5. Server saves message to MongoDB
   await Chat.addMessage(conversationId, messageData)
   ↓
6. Server broadcasts to all users in room
   io.to(conversationId).emit("receiveMessage", {
     conversationId,
     message: newMessage
   })
   ↓
7. All clients in room receive 'receiveMessage' event
   ↓
8. Each client updates their local message state
   setMessages((prev) => [...prev, message])
```

### Message Fallback Mechanism

If Socket.IO is not connected, the client falls back to HTTP requests:

```javascript
if (socketRef.current && socketRef.current.connected) {
  // Use Socket.IO (preferred)
  socketRef.current.emit("sendMessage", messageData);
} else {
  // Fallback to server action
  const result = await sendMessage(conversationId, messageData);
  if (result.success) {
    await loadMessages(conversationId);
  }
}
```

---

## Room Management

### What are Rooms?

Rooms are virtual channels within Socket.IO that isolate messages to specific conversations. Only users in the same room receive messages broadcast to that room.

### Join Room

When a user opens a conversation:

```javascript
// Client-side
useEffect(() => {
  if (activeConversationId && socketRef.current) {
    socketRef.current.emit("joinRoom", activeConversationId);
  }

  // Cleanup: leave room when unmounting or changing conversation
  return () => {
    if (activeConversationId && socketRef.current) {
      socketRef.current.emit("leaveRoom", activeConversationId);
    }
  };
}, [activeConversationId]);
```

```javascript
// Server-side
socket.on("joinRoom", (conversationId) => {
  socket.join(conversationId);
  console.log(`User ${socket.id} joined room ${conversationId}`);
});
```

### Leave Room

```javascript
socket.on("leaveRoom", (conversationId) => {
  socket.leave(conversationId);
  console.log(`User ${socket.id} left room ${conversationId}`);
});
```

### Broadcasting to Rooms

```javascript
// Broadcast to all users in a specific room
io.to(conversationId).emit("receiveMessage", messageData);

// Broadcast to all in room EXCEPT sender
socket.to(conversationId).emit("userTyping", { userId });
```

---

## Error Handling

### Server-Side Error Handling

```javascript
socket.on("sendMessage", async (data) => {
  try {
    // Save message to database
    await Chat.addMessage(conversationId, messageData);

    // Broadcast to room
    io.to(conversationId).emit("receiveMessage", {
      conversationId,
      message: newMessage,
    });
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
    // Notify sender of error
    socket.emit("messageError", { error: error.message });
  }
});
```

### Client-Side Error Handling

```javascript
// Listen for errors from server
socket.on("messageError", ({ error }) => {
  console.error("❌ Message error:", error);
  alert("Failed to send message: " + error);
});

// Handle connection errors
socket.on("connect_error", (error) => {
  console.error("🔴 Socket connection error:", error);
  // Could implement retry logic or user notification
});
```

### Connection Recovery

Socket.IO automatically attempts to reconnect when connection is lost. The client application:

- Maintains message history in state
- Falls back to HTTP requests if socket is disconnected
- Rejoins rooms upon reconnection

---

## Setup & Configuration

### Environment Variables

Create a `.env.local` file in the `client/my-app` directory:

```env
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/your-database

# Socket.IO server port
SOCKET_PORT=3001

# Client URL for CORS
CLIENT_URL=http://localhost:3000

# Client-side socket URL (must start with NEXT_PUBLIC_)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Starting the Socket Server

```bash
# Navigate to the client directory
cd client/my-app

# Install dependencies (if not already done)
npm install

# Run the Socket.IO server
node socketServer.js
```

**Note:** The Socket.IO server must run **separately** from the Next.js development server.

### Production Deployment

For production, you need to:

1. **Deploy Socket Server Separately**
   - Deploy `socketServer.js` to a Node.js hosting service
   - Ensure it's accessible from your client domain

2. **Update Environment Variables**

   ```env
   NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.com
   CLIENT_URL=https://your-frontend.com
   ```

3. **Configure CORS**
   - Update CORS settings in `chatSocket.js` to allow your production domain
   - Consider using environment variables for flexible configuration

4. **Use HTTPS**
   - Socket.IO works best with secure connections (WSS protocol)
   - Ensure your socket server uses SSL/TLS certificates

---

## Best Practices

### 1. Use Refs for Socket Instances

```javascript
const socketRef = useRef(null);
socketRef.current = socket;
```

**Why:** Prevents stale closures in event listeners and ensures the same socket instance is reused.

### 2. Clean Up on Unmount

```javascript
useEffect(() => {
  // Setup socket

  return () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };
}, []);
```

**Why:** Prevents memory leaks and duplicate connections.

### 3. Use Rooms for Conversation Isolation

```javascript
socket.join(conversationId); // Join specific conversation
io.to(conversationId).emit("message", data); // Broadcast only to that room
```

**Why:** Ensures messages are only delivered to relevant participants.

### 4. Keep State Refs Updated

```javascript
const activeConversationRef = useRef(null);

useEffect(() => {
  activeConversationRef.current = activeConversationId;
}, [activeConversationId]);
```

**Why:** Prevents stale values in socket event listeners.

### 5. Always Validate Data Server-Side

```javascript
socket.on("sendMessage", async (data) => {
  // Validate required fields
  if (!data.conversationId || !data.senderId || !data.content) {
    socket.emit("messageError", { error: "Missing required fields" });
    return;
  }

  // Process message...
});
```

**Why:** Never trust client-side data; always validate on the server.

### 6. Log Everything (Development)

```javascript
console.log("📥 Received message from", senderId);
console.log("💾 Saving message to database...");
console.log("✅ Message saved successfully");
```

**Why:** Makes debugging easier and helps track message flow.

### 7. Implement Fallback Mechanisms

```javascript
if (socketRef.current && socketRef.current.connected) {
  // Use socket
} else {
  // Fall back to HTTP
}
```

**Why:** Ensures application works even if WebSocket connection fails.

### 8. Use TypeScript (Optional but Recommended)

Define interfaces for socket events to ensure type safety:

```typescript
interface MessageData {
  conversationId: string;
  senderId: string;
  content: string;
  type: "text" | "file" | "image";
  fileUrl?: string;
  fileName?: string;
}

socket.emit("sendMessage", messageData as MessageData);
```

---

## Troubleshooting

### Common Issues

#### 1. Socket Not Connecting

**Symptoms:** Console shows connection errors
**Solution:**

- Verify Socket.IO server is running (`node socketServer.js`)
- Check `NEXT_PUBLIC_SOCKET_URL` is correct
- Ensure CORS is properly configured

#### 2. Messages Not Appearing

**Symptoms:** Messages sent but not received by others
**Solution:**

- Verify users have joined the room (`joinRoom` event)
- Check server logs for errors
- Ensure `activeConversationId` matches on client and server

#### 3. Duplicate Messages

**Symptoms:** Same message appears multiple times
**Solution:**

- Ensure socket connection is only initialized once
- Clean up event listeners properly
- Don't have multiple `socket.on()` for same event

#### 4. Port Already in Use

**Symptoms:** `EADDRINUSE` error when starting socket server
**Solution:**

```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (Windows)
taskkill /PID <PID> /F
```

---

## Performance Considerations

### 1. Message Batching

For high-frequency messages, consider batching:

```javascript
const messageBuffer = [];
setInterval(() => {
  if (messageBuffer.length > 0) {
    io.to(room).emit("messagesBatch", messageBuffer);
    messageBuffer.length = 0;
  }
}, 100);
```

### 2. Middleware for Authentication

Add authentication middleware to validate users:

```javascript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (isValidToken(token)) {
    next();
  } else {
    next(new Error("Authentication error"));
  }
});
```

### 3. Message Size Limits

Set limits on message payload size:

```javascript
io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    if (data.content.length > 5000) {
      socket.emit("messageError", { error: "Message too long" });
      return;
    }
    // Process message
  });
});
```

---

## Future Enhancements

Potential improvements to the socket implementation:

1. **Read Receipts**: Track when messages are read by recipients
2. **Online Status**: Show real-time user online/offline status
3. **Message Delivery Status**: Show sent/delivered/read indicators
4. **Voice/Video Calls**: Integrate WebRTC for real-time calls
5. **File Upload Progress**: Show upload progress via socket events
6. **Message Editing/Deletion**: Real-time message updates
7. **Presence Detection**: Detect when users are viewing a conversation
8. **Push Notifications**: Integrate with push services for offline users

---

## Additional Resources

- [Socket.IO Official Documentation](https://socket.io/docs/v4/)
- [Socket.IO Client API](https://socket.io/docs/v4/client-api/)
- [Socket.IO Server API](https://socket.io/docs/v4/server-api/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)

---

## Conclusion

This Socket.IO implementation provides a robust, real-time messaging system with:

- ✅ Bidirectional communication
- ✅ Room-based message isolation
- ✅ Automatic persistence to MongoDB
- ✅ Error handling and fallback mechanisms
- ✅ Scalable architecture

The system is production-ready with proper error handling, logging, and graceful degradation when WebSocket connections fail.
