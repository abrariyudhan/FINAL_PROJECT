"use client";

import { useState, useEffect } from "react";
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
} from "@/actions/chat";

export default function ChatPage() {
  // State management for chat application
  const [conversations, setConversations] = useState([]);
  const [groups, setGroups] = useState([]); // Store all groups
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Current user ID (in real app, this would come from authentication)
  const currentUserId = "current-user-id";

  // Fetch conversations and groups on component mount
  useEffect(() => {
    loadConversations();
    loadGroups();
  }, []);

  // Load all conversations from server
  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const data = await getConversations();
      setConversations(data);
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
    }
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
    if (!activeConversationId) return;

    try {
      const result = await sendMessage(activeConversationId, messageData);
      if (result.success) {
        // Reload messages to show the new message
        await loadMessages(activeConversationId);
        // Reload conversations to update last message preview
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
    try {
      const result = await createGroup({
        name: groupData.name,
        description: groupData.description,
        members: groupData.members || [currentUserId], // Include current user in group
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
        currentUserId={currentUserId}
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
