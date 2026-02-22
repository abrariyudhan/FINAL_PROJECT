"use server";

import Chat from "@/server/models/Chat";
import { revalidatePath } from "next/cache";

// Fetch all conversations sorted by most recent
export async function getConversations() {
  try {
    const conversations = await Chat.getAll();
    // Convert ObjectIds to strings for client-side rendering
    return JSON.parse(JSON.stringify(conversations));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
}

// Fetch messages for a specific conversation
export async function getMessages(conversationId) {
  try {
    const conversation = await Chat.getById(conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    return JSON.parse(JSON.stringify(conversation.messages || []));
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

// Send a new message to a conversation
export async function sendMessage(conversationId, messageData) {
  try {
    const result = await Chat.addMessage(conversationId, {
      senderId: messageData.senderId,
      content: messageData.content,
      type: messageData.type || "text",
      fileUrl: messageData.fileUrl || null,
      fileName: messageData.fileName || null,
    });

    // Revalidate the chat page to show new message
    revalidatePath("/chat");
    return { success: true, result };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: error.message };
  }
}

// Add a reaction (emoji) to a message
export async function addReaction(conversationId, messageId, reactionData) {
  try {
    const result = await Chat.addReaction(conversationId, messageId, {
      userId: reactionData.userId,
      emoji: reactionData.emoji,
    });

    revalidatePath("/chat");
    return { success: true, result };
  } catch (error) {
    console.error("Error adding reaction:", error);
    return { success: false, error: error.message };
  }
}

// Mark a conversation as read (reset unread count)
export async function markConversationAsRead(conversationId) {
  try {
    await Chat.markAsRead(conversationId);
    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error marking conversation as read:", error);
    return { success: false, error: error.message };
  }
}

// Create a new conversation
export async function createConversation(participantIds) {
  try {
    const result = await Chat.create({
      participants: participantIds,
    });

    revalidatePath("/chat");
    return { success: true, conversationId: result.insertedId.toString() };
  } catch (error) {
    console.error("Error creating conversation:", error);
    return { success: false, error: error.message };
  }
}

// Handle file upload (placeholder - you may need to implement actual file storage)
export async function uploadFile(formData) {
  try {
    // TODO: Implement actual file upload to storage service (e.g., AWS S3, Cloudinary)
    // For now, returning a placeholder URL
    const file = formData.get("file");
    const fileName = file.name;

    // Placeholder: In production, upload to cloud storage and get actual URL
    const fileUrl = `/uploads/${Date.now()}-${fileName}`;

    return {
      success: true,
      fileUrl,
      fileName,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message };
  }
}
