# Chat System Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Data Models](#data-models)
4. [Components](#components)
5. [Server Actions](#server-actions)
6. [State Management](#state-management)
7. [User Flows](#user-flows)
8. [Features](#features)
9. [Integration with Socket.IO](#integration-with-socketio)
10. [File Structure](#file-structure)
11. [API Reference](#api-reference)
12. [Best Practices](#best-practices)
13. [Troubleshooting](#troubleshooting)

---

## Overview

The chat system is a full-featured real-time messaging application built with **Next.js 14**, **MongoDB**, and **Socket.IO**. It supports both direct (1-on-1) and group conversations with rich features including:

- ✅ Real-time messaging via Socket.IO
- ✅ Direct (1-on-1) conversations
- ✅ Group chat support
- ✅ File and image sharing
- ✅ Message reactions (emoji)
- ✅ Unread message indicators
- ✅ User presence detection
- ✅ Search and filtering
- ✅ Automatic conversation syncing

### Technology Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js Server Actions, MongoDB
- **Real-time**: Socket.IO (WebSocket)
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Date Formatting**: date-fns

---

## Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     Client Application                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /chat Page (Main Container)                             │  │
│  │  - State Management                                      │  │
│  │  - Socket.IO Connection                                  │  │
│  │  - Event Handlers                                        │  │
│  │  ┌────────────┬─────────────────┬──────────────────┐    │  │
│  │  │  Sidebar   │  MessageList    │   ChatArea       │    │  │
│  │  │            │  - Conversations│   - MessageList  │    │  │
│  │  │  Navigation│  - Search       │   - MessageInput │    │  │
│  │  │            │  - Filters      │   - Actions      │    │  │
│  │  └────────────┴─────────────────┴──────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↕                                     │
│              Server Actions (chat.js, auth.js)                  │
└────────────────────────────────────────────────────────────────┘
                            ↕
┌────────────────────────────────────────────────────────────────┐
│                     Database Layer                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Models (Chat.js, Group.js, User.js)                     │  │
│  │  - Business Logic                                        │  │
│  │  - Database Operations                                   │  │
│  │  - Data Aggregation                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↕                                     │
│                       MongoDB                                   │
│  ┌──────────────┬──────────────┬────────────────────────┐      │
│  │   chats      │   groups     │   users                │      │
│  │              │              │                        │      │
│  └──────────────┴──────────────┴────────────────────────┘      │
└────────────────────────────────────────────────────────────────┘
                            ↕
                  Socket.IO Server (Real-time)
```

### Three-Layer Architecture

1. **Presentation Layer** (Components)
   - React components for UI
   - Client-side state management
   - User interactions

2. **Application Layer** (Server Actions)
   - Business logic
   - Data validation
   - API endpoints

3. **Data Layer** (Models)
   - Database operations
   - Data aggregation
   - Schema management

---

## Data Models

### 1. Chat Model

**Collection**: `chats`

**Schema**:

```javascript
{
  _id: ObjectId,                      // Unique conversation ID
  participants: [String],             // Array of user IDs
  type: String,                       // "direct" | "group"
  groupId: String | null,             // Reference to Group (if type is "group")
  messages: [                         // Array of message objects
    {
      _id: ObjectId,                  // Unique message ID
      senderId: String,               // User ID of sender
      content: String,                // Message text content
      type: String,                   // "text" | "image" | "file"
      fileUrl: String | null,         // URL to uploaded file
      fileName: String | null,        // Original file name
      reactions: [                    // Array of reactions
        {
          userId: String,             // User who reacted
          emoji: String               // Emoji character
        }
      ],
      timestamp: Date                 // Message timestamp
    }
  ],
  lastMessage: {                      // Preview of last message
    content: String,
    timestamp: Date
  },
  unreadCount: Number,                // Number of unread messages
  createdAt: Date,
  updatedAt: Date
}
```

**Key Methods**:

- `getAll()` - Get all conversations
- `getAllWithParticipants(userId)` - Get conversations with user details
- `getById(id)` - Get specific conversation
- `create(data)` - Create new conversation
- `addMessage(conversationId, message)` - Add message to conversation
- `addReaction(conversationId, messageId, reaction)` - Add emoji reaction
- `markAsRead(conversationId)` - Reset unread count
- `update(id, data)` - Update conversation
- `delete(id)` - Delete conversation

### 2. Group Model

**Collection**: `groups`

**Schema**:

```javascript
{
  _id: ObjectId,                      // Unique group ID
  name: String,                       // Group name
  description: String,                // Group description
  members: [String],                  // Array of member user IDs
  createdAt: Date,
  updatedAt: Date
}
```

**Key Methods**:

- `getAll()` - Get all groups
- `getById(id)` - Get specific group
- `create(data)` - Create new group
- `addMember(groupId, memberId)` - Add member to group
- `removeMember(groupId, memberId)` - Remove member from group
- `delete(id)` - Delete group

### 3. User Model

**Collection**: `users`

**Schema** (relevant fields):

```javascript
{
  _id: ObjectId,
  fullname: String,
  username: String,
  email: String,
  avatar: String | null,
  // ... other fields
}
```

---

## Components

### 1. ChatPage (`src/app/chat/page.js`)

**Purpose**: Main container component managing the entire chat application.

**Responsibilities**:

- Initialize Socket.IO connection
- Manage global chat state
- Handle user authentication
- Coordinate between child components
- Manage conversation loading and selection
- Handle real-time message updates

**Key State Variables**:

```javascript
const [conversations, setConversations] = useState([]);
const [groups, setGroups] = useState([]);
const [groupMembers, setGroupMembers] = useState([]);
const [activeConversationId, setActiveConversationId] = useState(null);
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [currentUser, setCurrentUser] = useState(null);
const socketRef = useRef(null);
const activeConversationRef = useRef(null);
```

**Key Functions**:

- `initializeChat()` - Setup user session and Socket.IO
- `loadConversations()` - Fetch all conversations
- `loadMessages(conversationId)` - Fetch messages for conversation
- `handleSendMessage(messageData)` - Send message via Socket.IO
- `handleSelectConversation(conversationId)` - Switch active conversation
- `handleStartConversation(userId)` - Start new direct chat
- `handleCreateGroup(groupData)` - Create new group chat

### 2. Sidebar (`src/components/Sidebar.js`)

**Purpose**: Left navigation sidebar with app-level navigation.

**Features**:

- Dashboard link
- Messages link (active indicator)
- Profile link
- Brand logo
- Visual active state

**Styling**: Fixed width (90px), icon-based navigation

### 3. MessageList (`src/components/MessageList.js`)

**Purpose**: Middle section displaying list of conversations.

**Features**:

- **Search Bar**: Filter conversations by name or content
- **Tabs**: ALL / PEOPLE / GROUPS filtering
- **Conversation Items**: Clickable list of chats
- **Group Members**: Show members when PEOPLE tab is active
- **Start Conversation**: Click on group member to start chat

**Props**:

```javascript
{
  conversations: Array,               // List of all conversations
  groupMembers: Array,                // List of group members
  activeConversationId: String,       // Currently selected conversation
  onSelectConversation: Function,     // Handler for selecting conversation
  onStartConversation: Function       // Handler for starting new chat
}
```

**Filtering Logic**:

```javascript
// Search filter
const matchesSearch =
  conv.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  conv.lastMessage?.content?.toLowerCase().includes(searchQuery.toLowerCase());

// Tab filter
if (activeTab === "PEOPLE") {
  matchesTab = conv.type === "direct";
} else if (activeTab === "GROUPS") {
  matchesTab = conv.type === "group";
}
```

### 4. ConversationItem (`src/components/ConversationItem.js`)

**Purpose**: Individual conversation item in the list.

**Features**:

- User/group avatar
- Name display
- Last message preview
- Timestamp
- Unread indicator badge
- Active state highlighting
- Online status (for direct chats)

**Visual States**:

- Active (blue background)
- Inactive (white background)
- Hover (slate background)
- Unread (badge with count)

### 5. ChatArea (`src/components/ChatArea.js`)

**Purpose**: Main chat area showing messages and input.

**Structure**:

```
┌─────────────────────────────────────┐
│  Header (User/Group Info)          │
├─────────────────────────────────────┤
│                                     │
│  Messages Area                      │
│  (Scrollable)                       │
│                                     │
├─────────────────────────────────────┤
│  Message Input                      │
└─────────────────────────────────────┘
```

**Props**:

```javascript
{
  activeConversation: Object,         // Current conversation data
  messages: Array,                    // Messages to display
  currentUserId: String,              // Current user ID
  groups: Array,                      // All groups
  onSendMessage: Function,            // Send message handler
  onUploadFile: Function,             // File upload handler
  onReaction: Function,               // Add reaction handler
  onCreateGroup: Function,            // Create group handler
  onAddGroupMember: Function,         // Add member handler
  onRemoveGroupMember: Function,      // Remove member handler
  onDeleteGroup: Function             // Delete group handler
}
```

**Features**:

- Auto-scroll to latest message
- Empty state when no conversation selected
- Header with conversation info
- Message list rendering
- Message input area

### 6. MessageBubble (`src/components/MessageBubble.js`)

**Purpose**: Display individual message with styling.

**Features**:

- **Different Layouts**:
  - Own messages: Right-aligned, blue background
  - Received messages: Left-aligned, gray background
- **Message Types**:
  - Text messages
  - Image messages (inline display)
  - File messages (download link)
- **Reactions**: Display emoji reactions with counts
- **Quick Reactions**: Hover actions to add ❤️ or 👍
- **Timestamps**: Show time of message
- **Sender Info**: Show sender name and avatar (received messages)

**Props**:

```javascript
{
  message: Object,                    // Message data
  senderName: String,                 // Display name of sender
  isOwnMessage: Boolean,              // Is this the current user's message?
  onReaction: Function                // Handler for adding reactions
}
```

### 7. MessageInput (`src/components/MessageInput.js`)

**Purpose**: Input area for composing and sending messages.

**Features**:

- **Text Input**: Multi-line textarea
- **File Upload**: Button to attach files/images
- **Send Button**: Submit message
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Upload Feedback**: Loading spinner during upload
- **File Type Detection**: Automatically detects images vs files

**Props**:

```javascript
{
  onSendMessage: Function,            // Handler for sending message
  onUploadFile: Function              // Handler for file upload
}
```

**Accepted File Types**:

- Images: `image/*`
- Documents: `.pdf`, `.doc`, `.docx`, `.txt`

### 8. FileAttachment (`src/components/FileAttachment.js`)

**Purpose**: Display file attachment with download link.

**Features**:

- File icon based on type
- File name display
- Download button
- File size (if available)
- Styled card layout

---

## Server Actions

Server Actions are Next.js server-side functions that handle data operations.

**Location**: `src/actions/chat.js`

### Conversation Actions

#### `getConversations()`

Fetches all conversations for the current user.

```javascript
const conversations = await getConversations();
```

**Returns**: Array of conversation objects with participant details.

**Features**:

- Filters by current user
- Populates participant info (names, avatars)
- Sorts by most recent activity
- Auto-syncs group chats if empty

#### `getMessages(conversationId)`

Fetches all messages for a specific conversation.

```javascript
const messages = await getMessages(conversationId);
```

**Returns**: Array of message objects.

#### `sendMessage(conversationId, messageData)`

Sends a new message to a conversation (fallback when Socket.IO unavailable).

```javascript
const result = await sendMessage(conversationId, {
  senderId: userId,
  content: "Hello!",
  type: "text",
});
```

**Parameters**:

- `conversationId`: String - Conversation ID
- `messageData`: Object
  - `senderId`: String - User ID
  - `content`: String - Message content
  - `type`: String - "text" | "image" | "file"
  - `fileUrl`: String (optional) - URL to file
  - `fileName`: String (optional) - File name

**Returns**: `{ success: Boolean, result?: Object, error?: String }`

#### `markConversationAsRead(conversationId)`

Resets unread count for a conversation.

```javascript
await markConversationAsRead(conversationId);
```

#### `findOrCreateConversation(otherUserId)`

Finds existing direct conversation or creates new one.

```javascript
const result = await findOrCreateConversation(otherUserId);
// result: { success, conversationId, isNew }
```

**Use Case**: Starting a new chat with a group member.

### Reaction Actions

#### `addReaction(conversationId, messageId, reactionData)`

Adds an emoji reaction to a message.

```javascript
const result = await addReaction(conversationId, messageId, {
  userId: currentUserId,
  emoji: "❤️",
});
```

### File Upload Actions

#### `uploadFile(formData)`

Uploads a file and returns URL (placeholder implementation).

```javascript
const formData = new FormData();
formData.append("file", file);
const result = await uploadFile(formData);
// result: { success, fileUrl, fileName }
```

**Note**: Currently returns placeholder URL. In production, integrate with cloud storage (AWS S3, Cloudinary, etc.).

### Group Actions

#### `getGroups()`

Fetches all groups.

```javascript
const groups = await getGroups();
```

#### `getGroupMembers()`

Fetches all unique members from user's groups.

```javascript
const members = await getGroupMembers();
```

**Returns**: Array of user objects (excluding current user).

**Use Case**: Populating the "PEOPLE" tab in MessageList.

#### `createGroup(groupData)`

Creates a new group and associated chat.

```javascript
const result = await createGroup({
  name: "Team Chat",
  description: "Project discussion",
  members: [userId1, userId2, userId3],
});
```

**Creates**:

1. Group document in `groups` collection
2. Chat document in `chats` collection with `type: "group"`

#### `addGroupMember(groupId, memberId)`

Adds a member to an existing group.

```javascript
const result = await addGroupMember(groupId, memberId);
```

**Updates**:

1. Group members array
2. Chat participants array

#### `removeGroupMember(groupId, memberId)`

Removes a member from a group.

```javascript
const result = await removeGroupMember(groupId, memberId);
```

#### `deleteGroup(groupId)`

Deletes a group and its associated chat.

```javascript
const result = await deleteGroup(groupId);
```

**Deletes**:

1. Chat document
2. Group document

---

## State Management

### Client-Side State

The chat application uses React's built-in state management with hooks.

#### Main State Variables (ChatPage)

```javascript
// Conversations and messages
const [conversations, setConversations] = useState([]);
const [messages, setMessages] = useState([]);
const [activeConversationId, setActiveConversationId] = useState(null);

// Groups
const [groups, setGroups] = useState([]);
const [groupMembers, setGroupMembers] = useState([]);

// User and loading
const [currentUser, setCurrentUser] = useState(null);
const [isLoading, setIsLoading] = useState(true);

// Socket reference
const socketRef = useRef(null);
const activeConversationRef = useRef(null);
```

#### Why Refs?

**`socketRef`**: Persists Socket.IO instance across re-renders without triggering re-renders.

**`activeConversationRef`**: Prevents stale closures in Socket.IO event listeners.

```javascript
// Keep ref in sync with state
useEffect(() => {
  activeConversationRef.current = activeConversationId;
}, [activeConversationId]);

// Use ref in socket listener to avoid stale values
socket.on("receiveMessage", ({ conversationId, message }) => {
  if (conversationId === activeConversationRef.current) {
    setMessages((prev) => [...prev, message]);
  }
});
```

### State Update Patterns

#### Adding a Message (Optimistic Update)

```javascript
// Receive message via Socket.IO
socket.on("receiveMessage", ({ conversationId, message }) => {
  // Update messages if in active conversation
  if (conversationId === activeConversationRef.current) {
    setMessages((prev) => [...prev, message]);
  }
  // Reload conversations to update last message
  loadConversations();
});
```

#### Switching Conversations

```javascript
useEffect(() => {
  if (activeConversationId) {
    // Load messages for new conversation
    loadMessages(activeConversationId);

    // Join Socket.IO room
    if (socketRef.current) {
      socketRef.current.emit("joinRoom", activeConversationId);
    }

    // Mark as read
    markConversationAsRead(activeConversationId);
  }

  // Cleanup: leave room when changing conversation
  return () => {
    if (activeConversationId && socketRef.current) {
      socketRef.current.emit("leaveRoom", activeConversationId);
    }
  };
}, [activeConversationId]);
```

---

## User Flows

### 1. Starting the Chat Application

```
1. User navigates to /chat
   ↓
2. ChatPage component mounts
   ↓
3. initializeChat() runs:
   a. Fetch current user (getCurrentUser)
   b. Initialize Socket.IO connection
   c. Setup socket event listeners
   d. Load conversations (loadConversations)
   e. Load groups (loadGroups)
   f. Load group members (loadGroupMembers)
   ↓
4. UI renders with conversation list
   ↓
5. User sees empty state or existing conversations
```

### 2. Selecting a Conversation

```
1. User clicks on conversation in MessageList
   ↓
2. onSelectConversation(conversationId) called
   ↓
3. setActiveConversationId(conversationId)
   ↓
4. useEffect triggered:
   a. Load messages for conversation
   b. Join Socket.IO room
   c. Mark conversation as read
   ↓
5. ChatArea displays messages and input
```

### 3. Sending a Message

```
1. User types message in MessageInput
   ↓
2. User presses Enter or clicks Send
   ↓
3. handleSend() in MessageInput
   ↓
4. onSendMessage() prop called (from ChatPage)
   ↓
5. ChatPage.handleSendMessage():
   a. Check if socket connected
   b. socket.emit("sendMessage", data)
   ↓
6. Socket server receives message:
   a. Save to MongoDB
   b. Broadcast to room
   ↓
7. All clients in room receive "receiveMessage"
   ↓
8. Message appears in UI for all users
```

### 4. Starting a New Conversation

```
1. User clicks on group member in MessageList
   ↓
2. onStartConversation(userId) called
   ↓
3. handleStartConversation(userId):
   a. Call findOrCreateConversation(userId)
   b. Check if conversation exists
   c. Create new if doesn't exist
   d. Return conversationId
   ↓
4. setActiveConversationId(conversationId)
   ↓
5. Conversation loads as normal
```

### 5. Creating a Group

```
1. User initiates group creation (UI not shown in code)
   ↓
2. handleCreateGroup(groupData) called
   ↓
3. Server action createGroup():
   a. Create Group document
   b. Create Chat document with type:"group"
   ↓
4. Reload groups and conversations
   ↓
5. New group appears in conversation list
```

### 6. Uploading a File

```
1. User clicks file upload button
   ↓
2. File input opens
   ↓
3. User selects file
   ↓
4. handleFileChange() in MessageInput:
   a. Create FormData
   b. Call onUploadFile(formData)
   c. Show loading spinner
   ↓
5. Server uploads file (or generates URL)
   ↓
6. Send message with file info:
   - type: "image" or "file"
   - fileUrl: URL to file
   - fileName: Original file name
   ↓
7. Message appears with file attachment
```

### 7. Adding a Reaction

```
1. User hovers over message
   ↓
2. Quick reaction buttons appear
   ↓
3. User clicks reaction (❤️ or 👍)
   ↓
4. onReaction(messageId, emoji) called
   ↓
5. handleAddReaction():
   a. Call addReaction server action
   b. Update message in database
   ↓
6. Reload messages
   ↓
7. Reaction appears under message
```

---

## Features

### 1. Real-Time Messaging

**How it works**:

- Socket.IO establishes WebSocket connection
- Users join "rooms" based on conversation ID
- Messages broadcast to all users in room
- Instant delivery without page refresh

**Fallback**: If Socket.IO fails, falls back to server actions.

### 2. Direct Messages (1-on-1)

**Characteristics**:

- Two participants
- Type: "direct"
- No groupId
- Privacy: Only participants can view

**Creation**: Automatic via `findOrCreateConversation()`

### 3. Group Chats

**Characteristics**:

- Multiple participants
- Type: "group"
- Has groupId reference
- Shared among all members

**Management**:

- Add members
- Remove members
- Delete group (admin action)

### 4. File Sharing

**Supported Types**:

- Images: Displayed inline
- Documents: Download link

**Process**:

1. User selects file
2. Upload to server (placeholder)
3. Message sent with fileUrl
4. Rendered based on type

**Future Enhancement**: Integrate with cloud storage (S3, Cloudinary).

### 5. Message Reactions

**Features**:

- Quick reactions on hover (❤️, 👍)
- Multiple users can react
- Reaction counts displayed
- Grouped by emoji type

**Data Structure**:

```javascript
reactions: [
  { userId: "user1", emoji: "❤️" },
  { userId: "user2", emoji: "❤️" },
  { userId: "user3", emoji: "👍" },
];
```

**Display**: Count for each unique emoji.

### 6. Unread Indicators

**How it works**:

- `unreadCount` incremented on new message
- Badge displayed on conversation item
- Reset to 0 when conversation opened

**Actions**:

- `Chat.addMessage()` increments count
- `markConversationAsRead()` resets to 0

### 7. Search and Filters

**Search**: Searches in:

- Conversation names (user/group)
- Last message content

**Filters**:

- **ALL**: Show all conversations
- **PEOPLE**: Show direct chats only
- **GROUPS**: Show group chats only

### 8. Auto-Sync Group Chats

**Purpose**: Sync group data with chat conversations.

**Trigger**: When `getConversations()` returns empty results.

**Process**:

1. Call `syncGroupChats()`
2. Create chat conversations for existing groups
3. Reload conversations
4. Display synced data

**Implementation**: `src/actions/syncChats.js`

---

## Integration with Socket.IO

The chat system uses Socket.IO for real-time communication. See [SOCKET_DOCUMENTATION.md](SOCKET_DOCUMENTATION.md) for detailed Socket.IO documentation.

### Quick Integration Overview

#### Client-Side Setup

```javascript
// Initialize Socket.IO
const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
  { withCredentials: true },
);

socketRef.current = socket;

// Listen for messages
socket.on("receiveMessage", ({ conversationId, message }) => {
  if (conversationId === activeConversationRef.current) {
    setMessages((prev) => [...prev, message]);
  }
  loadConversations();
});
```

#### Sending Messages

```javascript
// Via Socket.IO (preferred)
if (socketRef.current && socketRef.current.connected) {
  socketRef.current.emit("sendMessage", {
    conversationId,
    senderId,
    content,
    type: "text",
  });
}
// Fallback to server action
else {
  await sendMessage(conversationId, messageData);
}
```

#### Room Management

```javascript
// Join room when opening conversation
useEffect(() => {
  if (activeConversationId && socketRef.current) {
    socketRef.current.emit("joinRoom", activeConversationId);
  }

  return () => {
    if (activeConversationId && socketRef.current) {
      socketRef.current.emit("leaveRoom", activeConversationId);
    }
  };
}, [activeConversationId]);
```

---

## File Structure

```
client/my-app/
├── src/
│   ├── app/
│   │   └── chat/
│   │       └── page.js              # Main chat page component
│   │
│   ├── components/
│   │   ├── Sidebar.js               # Left navigation sidebar
│   │   ├── MessageList.js           # Conversation list with search
│   │   ├── ConversationItem.js      # Individual conversation item
│   │   ├── ChatArea.js              # Main chat area container
│   │   ├── MessageBubble.js         # Individual message display
│   │   ├── MessageInput.js          # Message composition input
│   │   └── FileAttachment.js        # File attachment display
│   │
│   ├── actions/
│   │   ├── chat.js                  # Chat server actions
│   │   ├── auth.js                  # Authentication actions
│   │   └── syncChats.js             # Group chat sync logic
│   │
│   └── server/
│       ├── models/
│       │   ├── Chat.js              # Chat database model
│       │   ├── Group.js             # Group database model
│       │   └── User.js              # User database model
│       │
│       ├── socket/
│       │   └── chatSocket.js        # Socket.IO event handlers
│       │
│       └── config/
│           └── mongodb.js           # MongoDB connection
│
└── socketServer.js                  # Socket.IO server entry point
```

---

## API Reference

### Chat Model API

```javascript
// Get conversations
const chats = await Chat.getAllWithParticipants(userId);

// Get specific conversation
const chat = await Chat.getById(conversationId);

// Create conversation
const result = await Chat.create({
  participants: [userId1, userId2],
  type: "direct",
});

// Add message
await Chat.addMessage(conversationId, {
  senderId: userId,
  content: "Hello!",
  type: "text",
});

// Add reaction
await Chat.addReaction(conversationId, messageId, {
  userId: userId,
  emoji: "❤️",
});

// Mark as read
await Chat.markAsRead(conversationId);

// Delete conversation
await Chat.delete(conversationId);
```

### Server Actions API

```javascript
// Conversations
const conversations = await getConversations();
const messages = await getMessages(conversationId);
await sendMessage(conversationId, messageData);
await markConversationAsRead(conversationId);
const result = await findOrCreateConversation(otherUserId);

// Reactions
await addReaction(conversationId, messageId, reactionData);

// Files
const result = await uploadFile(formData);

// Groups
const groups = await getGroups();
const members = await getGroupMembers();
await createGroup(groupData);
await addGroupMember(groupId, memberId);
await removeGroupMember(groupId, memberId);
await deleteGroup(groupId);
```

### Socket.IO Events

See [SOCKET_DOCUMENTATION.md](SOCKET_DOCUMENTATION.md) for complete list.

**Client → Server**:

- `joinRoom(conversationId)`
- `leaveRoom(conversationId)`
- `sendMessage(data)`
- `typing({ conversationId, userId })`
- `stopTyping({ conversationId, userId })`

**Server → Client**:

- `connect`
- `disconnect`
- `receiveMessage({ conversationId, message })`
- `messageError({ error })`
- `userTyping({ conversationId, userId })`
- `userStoppedTyping({ conversationId, userId })`

---

## Best Practices

### 1. Use Server Actions for Data Operations

✅ **Good**:

```javascript
const conversations = await getConversations();
```

❌ **Avoid**:

```javascript
// Don't directly import models in client components
import Chat from "@/server/models/Chat"; // ❌
```

**Why**: Server actions provide a clean API layer and handle serialization.

### 2. Always Clean Up Socket Listeners

✅ **Good**:

```javascript
useEffect(() => {
  socket.on("receiveMessage", handler);

  return () => {
    socket.off("receiveMessage", handler);
  };
}, []);
```

**Why**: Prevents memory leaks and duplicate listeners.

### 3. Use Refs to Avoid Stale Closures

✅ **Good**:

```javascript
const activeConversationRef = useRef(activeConversationId);

useEffect(() => {
  activeConversationRef.current = activeConversationId;
}, [activeConversationId]);

socket.on("receiveMessage", ({ conversationId }) => {
  if (conversationId === activeConversationRef.current) {
    // Use current value
  }
});
```

**Why**: Socket listeners capture values at creation time; refs always have current value.

### 4. Handle Loading States

✅ **Good**:

```javascript
const [isLoading, setIsLoading] = useState(true);

if (isLoading) {
  return <LoadingSpinner />;
}

return <ChatUI />;
```

**Why**: Improves UX and prevents errors from rendering incomplete data.

### 5. Validate Data Before Sending

✅ **Good**:

```javascript
const handleSend = () => {
  if (!message.trim()) return;
  if (!activeConversationId) return;

  onSendMessage({ content: message, type: "text" });
};
```

**Why**: Prevents sending empty messages and errors.

### 6. Use Optimistic Updates

✅ **Good**:

```javascript
// Add message to UI immediately
setMessages((prev) => [...prev, newMessage]);

// Then persist to server
socket.emit("sendMessage", newMessage);
```

**Why**: Feels instant to user; rollback if server fails.

### 7. Implement Fallback Mechanisms

✅ **Good**:

```javascript
if (socketRef.current && socketRef.current.connected) {
  // Use real-time socket
  socket.emit("sendMessage", data);
} else {
  // Fallback to HTTP
  await sendMessage(conversationId, data);
}
```

**Why**: Ensures app works even if WebSocket fails.

### 8. Serialize Data for Client Components

✅ **Good**:

```javascript
const conversations = await Chat.getAll();
return JSON.parse(JSON.stringify(conversations));
```

**Why**: Removes MongoDB ObjectIds and Dates that can't serialize to client.

### 9. Use Descriptive Variable Names

✅ **Good**:

```javascript
const activeConversationId = "123";
const currentUserId = "user456";
```

❌ **Avoid**:

```javascript
const id = "123";
const uid = "user456";
```

**Why**: Makes code self-documenting and easier to maintain.

### 10. Keep Components Focused

✅ **Good**:

- `MessageBubble`: Only renders one message
- `MessageInput`: Only handles input
- `ChatArea`: Coordinates between them

**Why**: Single responsibility principle; easier to test and maintain.

---

## Troubleshooting

### Messages Not Appearing

**Symptoms**: Message sent but not visible to others.

**Possible Causes**:

1. User not in Socket.IO room
2. Socket disconnected
3. Database save failed

**Solutions**:

```javascript
// Check socket connection
console.log("Socket connected:", socketRef.current?.connected);

// Check room membership
socket.emit("joinRoom", conversationId);

// Check server logs for errors
```

### Stale Message List

**Symptoms**: Old messages shown when switching conversations.

**Cause**: State not clearing properly.

**Solution**:

```javascript
useEffect(() => {
  if (activeConversationId) {
    setMessages([]); // Clear before loading
    loadMessages(activeConversationId);
  }
}, [activeConversationId]);
```

### Duplicate Messages

**Symptoms**: Same message appears multiple times.

**Causes**:

1. Multiple socket listeners
2. Both socket and HTTP request used

**Solution**:

```javascript
// Clean up listeners
useEffect(() => {
  const handler = (data) => {
    /* ... */
  };
  socket.on("receiveMessage", handler);

  return () => socket.off("receiveMessage", handler);
}, []);

// Use only one method (socket OR HTTP, not both)
```

### File Upload Not Working

**Symptoms**: File upload fails or returns placeholder URL.

**Cause**: Upload action is placeholder implementation.

**Solution**: Implement actual file upload service:

```javascript
// In uploadFile() action
const result = await cloudinary.upload(file);
return { success: true, fileUrl: result.url };
```

### Conversations Not Loading

**Symptoms**: Empty conversation list when data exists.

**Possible Causes**:

1. User not authenticated
2. Database connection issue
3. Incorrect filtering

**Solutions**:

```javascript
// Check authentication
const user = await getCurrentUser();
console.log("Current user:", user);

// Check database
const allChats = await Chat.getAll();
console.log("Total chats:", allChats.length);

// Check filtering
const userChats = await Chat.getAllWithParticipants(userId);
console.log("User's chats:", userChats.length);
```

### Group Members Not Showing

**Symptoms**: PEOPLE tab empty when groups exist.

**Cause**: `getGroupMembers()` filtering incorrect user.

**Solution**:

```javascript
// In getGroupMembers()
const userGroups = groups.filter(
  (group) => group.members?.includes(userId), // Check current user is member
);
```

### Socket Connection Issues

**Symptoms**: Real-time messages not working.

**Possible Causes**:

1. Socket server not running
2. Wrong Socket URL
3. CORS issues

**Solutions**:

```bash
# Start socket server
node socketServer.js

# Check environment variable
echo $NEXT_PUBLIC_SOCKET_URL

# Check CORS settings in chatSocket.js
```

### Search Not Working

**Symptoms**: Search returns no results when conversations exist.

**Cause**: Case sensitivity or null values.

**Solution**:

```javascript
const matchesSearch =
  conv.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  conv.lastMessage?.content?.toLowerCase().includes(searchQuery.toLowerCase());
```

**Note**: Use optional chaining (`?.`) to handle null/undefined values.

---

## Performance Optimization

### 1. Message Pagination

**Current**: Loads all messages at once.

**Improvement**: Implement pagination:

```javascript
const loadMessages = async (conversationId, page = 1, limit = 50) => {
  const messages = await getMessages(conversationId, { page, limit });
  setMessages(messages);
};
```

### 2. Virtual Scrolling

**Current**: Renders all conversation items.

**Improvement**: Use virtual scrolling library (react-window):

```javascript
<VirtualList height={600} itemCount={conversations.length} itemSize={80}>
  {({ index, style }) => (
    <ConversationItem style={style} conversation={conversations[index]} />
  )}
</VirtualList>
```

### 3. Debounce Search

**Current**: Searches on every keystroke.

**Improvement**: Debounce search input:

```javascript
const debouncedSearch = useDebouncedValue(searchQuery, 300);

useEffect(() => {
  // Only search after 300ms of no typing
  filterConversations(debouncedSearch);
}, [debouncedSearch]);
```

### 4. Memoize Filtered Lists

**Current**: Filters recalculated on every render.

**Improvement**: Use `useMemo`:

```javascript
const filteredConversations = useMemo(() => {
  return conversations.filter(conv =>
    // filtering logic
  );
}, [conversations, searchQuery, activeTab]);
```

### 5. Lazy Load Images

**Current**: All images load immediately.

**Improvement**: Use lazy loading:

```javascript
<img src={imageUrl} loading="lazy" alt="Message attachment" />
```

---

## Future Enhancements

### Planned Features

1. **Message Editing/Deletion**
   - Edit sent messages
   - Delete messages
   - Show "edited" indicator

2. **Read Receipts**
   - Track who read messages
   - Display checkmarks (sent/delivered/read)

3. **Typing Indicators**
   - Show "User is typing..." indicator
   - Currently implemented on backend, needs UI

4. **Voice Messages**
   - Record audio messages
   - Play inline

5. **Video/Voice Calls**
   - WebRTC integration
   - Group calls

6. **Message Search**
   - Search within conversation
   - Global message search

7. **Pinned Messages**
   - Pin important messages
   - Quick access to pinned

8. **Custom Reactions**
   - Reaction picker with more emojis
   - Custom emoji support

9. **Message Threads**
   - Reply to specific messages
   - Threaded conversations

10. **Mentions**
    - @mention users in groups
    - Notification on mention

11. **Rich Text Formatting**
    - Bold, italic, code blocks
    - Markdown support

12. **Message Forwarding**
    - Forward messages to other chats
    - Multiple selection

---

## Conclusion

This chat system provides a robust foundation for real-time messaging with:

- Clean architecture separating concerns
- Real-time updates via Socket.IO
- Comprehensive feature set
- Scalable component structure
- Production-ready error handling

For Socket.IO specific documentation, see [SOCKET_DOCUMENTATION.md](SOCKET_DOCUMENTATION.md).

---

## Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [React Hooks Reference](https://react.dev/reference/react)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [date-fns Documentation](https://date-fns.org/docs)
