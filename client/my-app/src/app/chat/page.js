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
} from "@/actions/chat";

export default function ChatPage() {
  // State management for chat application
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Current user ID (in real app, this would come from authentication)
  const currentUserId = "current-user-id";

  // Fetch conversations on component mount
  useEffect(() => {
    loadConversations();
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
        onSendMessage={handleSendMessage}
        onUploadFile={handleUploadFile}
        onReaction={handleAddReaction}
      />
    </div>
  );
}
