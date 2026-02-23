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
  getGroupMembers,
  findOrCreateConversation,
  createGroup,
  addGroupMember,
  removeGroupMember,
  deleteGroup,
  markConversationAsRead,
} from "@/actions/chat";
import { getCurrentUser } from "@/actions/auth";
import { syncGroupChats } from "@/actions/syncChats";

export default function ChatPage() {
  // State management for chat application
  const [conversations, setConversations] = useState([]);
  const [groups, setGroups] = useState([]); // Store all groups
  const [groupMembers, setGroupMembers] = useState([]); // Store all unique group members
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const socketRef = useRef(null);
  const activeConversationRef = useRef(null); // Ref to avoid stale closure in socket listeners

  // Keep ref in sync with state
  useEffect(() => {
    activeConversationRef.current = activeConversationId;
  }, [activeConversationId]);

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

        // Connection status logging
        socket.on("connect", () => {
          console.log("✅ Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
          console.log("❌ Socket disconnected");
        });

        socket.on("connect_error", (error) => {
          console.error("🔴 Socket connection error:", error);
        });

        // Listen for incoming messages dari socket
        socket.on("receiveMessage", ({ conversationId, message }) => {
          console.log("📥 Received message:", message);
          // Update messages jika sedang di conversation yang sama
          if (conversationId === activeConversationRef.current) {
            setMessages((prev) => [...prev, message]);
          }
          // Reload conversations untuk update last message preview
          loadConversations();
        });

        // Listen for message errors
        socket.on("messageError", ({ error }) => {
          console.error("❌ Message error:", error);
          alert("Failed to send message: " + error);
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

      // Load conversations, groups, and group members
      await loadConversations();
      await loadGroups();
      await loadGroupMembers();
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
      let data = await getConversations();

      console.log("Loaded conversations:", data.length, data); // Debug log

      // If no conversations found, try syncing group chats
      if (data.length === 0) {
        console.log(
          "🔄 No conversations found, attempting to sync group chats...",
        );
        const syncResult = await syncGroupChats();
        if (
          syncResult.success &&
          (syncResult.groupsCreated > 0 || syncResult.chatsCreated > 0)
        ) {
          console.log(
            `✅ Synced ${syncResult.groupsCreated || 0} groups and ${syncResult.chatsCreated || 0} chats, reloading...`,
          );
          // Reload conversations after sync
          data = await getConversations();
          console.log("After sync:", data.length, data);
        }
      }

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
          // Untuk group chats, gunakan group name dari database
          return {
            ...conv,
            userName: conv.groupName || "Group Chat",
            userAvatar: null, // Groups bisa punya avatar terpisah nanti
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

  // Load all unique group members
  const loadGroupMembers = async () => {
    try {
      const data = await getGroupMembers();
      setGroupMembers(data);
    } catch (error) {
      console.error("Error loading group members:", error);
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

  // Handle starting/opening a conversation with a specific user
  const handleStartConversation = async (userId) => {
    try {
      const result = await findOrCreateConversation(userId);
      if (result.success) {
        // If new conversation was created, reload conversations
        if (result.isNew) {
          await loadConversations();
        }
        // Select the conversation
        setActiveConversationId(result.conversationId);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
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
      if (socketRef.current && socketRef.current.connected) {
        console.log("📤 Sending message via Socket.IO");
        socketRef.current.emit("sendMessage", {
          conversationId: activeConversationId,
          senderId: currentUser.userId,
          content: messageData.content,
          type: messageData.type || "text",
          fileUrl: messageData.fileUrl || null,
          fileName: messageData.fileName || null,
        });

        // Socket will handle saving and broadcasting, so we're done
        return;
      }

      // Fallback: kirim via server action jika socket tidak connected
      console.log("⚠️ Socket not connected, using fallback server action");
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
        groupMembers={groupMembers}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onStartConversation={handleStartConversation}
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
