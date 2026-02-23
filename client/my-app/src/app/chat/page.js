"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Sidebar from "@/components/Sidebar";
import MessageList from "@/components/MessageList";
import ChatArea from "@/components/ChatArea";
import {
  getConversations,
  getMessages,
  sendMessage,
  uploadFile,
  addReaction,
  getGroups,
  createGroup,
  addGroupMember,
  removeGroupMember,
  deleteGroup,
  markConversationAsRead,
} from "@/actions/chat";
import { getCurrentUser } from "@/actions/auth";

export default function ChatPage() {
  // State management for chat application
  const [conversations, setConversations] = useState([]);
  const [groups, setGroups] = useState([]); // Store all groups
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const socketRef = useRef(null);

  // Initialize user and Socket.IO connection
  useEffect(() => {
    initializeChat();

    return () => {
      // Cleanup: disconnect socket saat component unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Initialize chat: get user, connect socket, load data
  const initializeChat = async () => {
    try {
      // Get current user dari auth
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);

        // Setup Socket.IO connection untuk real-time messaging
        const socket = io(
          process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
          {
            withCredentials: true,
          },
        );

        socketRef.current = socket;

        // Listen for incoming messages dari socket
        socket.on("receiveMessage", ({ conversationId, message }) => {
          // Update messages jika sedang di conversation yang sama
          if (conversationId === activeConversationId) {
            setMessages((prev) => [...prev, message]);
          }
          // Reload conversations untuk update last message preview
          loadConversations();
        });

        // Listen for typing indicators
        socket.on("userTyping", ({ conversationId, userId }) => {
          // TODO: Show typing indicator UI
          console.log(`User ${userId} is typing in ${conversationId}`);
        });

        socket.on("userStoppedTyping", ({ conversationId, userId }) => {
          // TODO: Hide typing indicator UI
          console.log(`User ${userId} stopped typing in ${conversationId}`);
        });
      }

      // Load conversations dan groups
      await loadConversations();
      await loadGroups();
    } catch (error) {
      console.error("Error initializing chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load all conversations from server
  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const data = await getConversations();

      // Map conversations dengan participant details dari backend
      const mappedConversations = data.map((conv) => {
        // Untuk direct chats, ambil participant yg bukan current user
        if (conv.type === "direct") {
          const otherParticipant = conv.participantDetails?.find(
            (p) => p._id !== currentUser?.userId,
          );
          return {
            ...conv,
            userName:
              otherParticipant?.fullname ||
              otherParticipant?.username ||
              "Unknown User",
            userAvatar: otherParticipant?.avatar || null,
          };
        } else {
          // Untuk group chats, show semua participant names atau group name
          const participantNames = conv.participantDetails
            ?.map((p) => p.fullname || p.username)
            .join(", ");
          return {
            ...conv,
            userName: participantNames || "Group Chat",
            userAvatar: null, // Groups biasanya punya avatar terpisah
          };
        }
      });

      setConversations(mappedConversations);
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load all groups from server
  const loadGroups = async () => {
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (error) {
      console.error("Error loading groups:", error);
    }
  };

  // Load messages when a conversation is selected
  useEffect(() => {
    if (activeConversationId) {
      loadMessages(activeConversationId);

      // Join conversation room via socket untuk receive real-time messages
      if (socketRef.current) {
        socketRef.current.emit("joinRoom", activeConversationId);
      }

      // Mark conversation as read
      markConversationAsRead(activeConversationId);
    }

    // Cleanup: leave room saat pindah conversation
    return () => {
      if (activeConversationId && socketRef.current) {
        socketRef.current.emit("leaveRoom", activeConversationId);
      }
    };
  }, [activeConversationId]);

  // Fetch messages for the active conversation
  const loadMessages = async (conversationId) => {
    try {
      const data = await getMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessages([]);
    }
  };

  // Handle selecting a conversation from the list
  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
  };

  // Handle sending a new message
  const handleSendMessage = async (messageData) => {
    if (!activeConversationId || !currentUser) return;

    try {
      // Kirim via Socket.IO untuk real-time delivery
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", {
          conversationId: activeConversationId,
          senderId: currentUser.userId,
          content: messageData.content,
          type: messageData.type || "text",
          fileUrl: messageData.fileUrl || null,
          fileName: messageData.fileName || null,
        });
      }

      // Fallback: kirim via server action jika socket belum ready
      const result = await sendMessage(activeConversationId, {
        ...messageData,
        senderId: currentUser.userId,
      });

      if (result.success) {
        // Reload messages untuk show new message (jika socket gagal)
        await loadMessages(activeConversationId);
        // Reload conversations untuk update last message preview
        await loadConversations();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle file upload
  const handleUploadFile = async (formData) => {
    try {
      const result = await uploadFile(formData);
      return result;
    } catch (error) {
      console.error("Error uploading file:", error);
      return { success: false, error: error.message };
    }
  };

  // Handle adding reaction to a message
  const handleAddReaction = async (conversationId, messageId, reactionData) => {
    try {
      const result = await addReaction(conversationId, messageId, reactionData);
      if (result.success) {
        // Reload messages to show the new reaction
        await loadMessages(conversationId);
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  // ========== GROUP HANDLERS ==========

  // Handle creating a new group chat
  const handleCreateGroup = async (groupData) => {
    if (!currentUser) return;

    try {
      const result = await createGroup({
        name: groupData.name,
        description: groupData.description,
        members: groupData.members || [currentUser.userId], // Include current user in group
      });

      if (result.success) {
        // Reload groups and conversations to show the new group
        await loadGroups();
        await loadConversations();
        return result;
      }
    } catch (error) {
      console.error("Error creating group:", error);
      return { success: false, error: error.message };
    }
  };

  // Handle adding a member to a group
  const handleAddGroupMember = async (groupId, memberId) => {
    try {
      const result = await addGroupMember(groupId, memberId);
      if (result.success) {
        // Reload groups and conversations
        await loadGroups();
        await loadConversations();
      }
      return result;
    } catch (error) {
      console.error("Error adding group member:", error);
      return { success: false, error: error.message };
    }
  };

  // Handle removing a member from a group
  const handleRemoveGroupMember = async (groupId, memberId) => {
    try {
      const result = await removeGroupMember(groupId, memberId);
      if (result.success) {
        // Reload groups and conversations
        await loadGroups();
        await loadConversations();
      }
      return result;
    } catch (error) {
      console.error("Error removing group member:", error);
      return { success: false, error: error.message };
    }
  };

  // Handle deleting a group
  const handleDeleteGroup = async (groupId) => {
    try {
      const result = await deleteGroup(groupId);
      if (result.success) {
        // Clear active conversation if it was the deleted group
        const deletedGroupConv = conversations.find(
          (conv) => conv.groupId === groupId,
        );
        if (deletedGroupConv && activeConversationId === deletedGroupConv._id) {
          setActiveConversationId(null);
          setMessages([]);
        }

        // Reload groups and conversations
        await loadGroups();
        await loadConversations();
      }
      return result;
    } catch (error) {
      console.error("Error deleting group:", error);
      return { success: false, error: error.message };
    }
  };

  // Find the active conversation object
  const activeConversation = conversations.find(
    (conv) => conv._id === activeConversationId,
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-bold text-slate-400">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Left Sidebar with navigation */}
      <Sidebar />

      {/* Middle section with conversation list */}
      <MessageList
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
      />

      {/* Right section with active chat */}
      <ChatArea
        activeConversation={activeConversation}
        messages={messages}
        currentUserId={currentUser?.userId}
        groups={groups}
        onSendMessage={handleSendMessage}
        onUploadFile={handleUploadFile}
        onReaction={handleAddReaction}
        onCreateGroup={handleCreateGroup}
        onAddGroupMember={handleAddGroupMember}
        onRemoveGroupMember={handleRemoveGroupMember}
        onDeleteGroup={handleDeleteGroup}
      />
    </div>
  );
}
