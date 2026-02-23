"use server";

import Chat from "@/server/models/Chat";
import Group from "@/server/models/Group";
import { revalidatePath } from "next/cache";

// Fetch all conversations sorted by most recent
export async function getConversations() {
  try {
    const conversations = await Chat.getAllWithParticipants(); // Get conversations with user details
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

// ========== GROUP FUNCTIONS ==========
// Fungsi-fungsi untuk manage groups dan sync dengan chat

// Fetch all groups
export async function getGroups() {
  try {
    const groups = await Group.getAll();
    // Convert ObjectIds to strings for client-side rendering
    return JSON.parse(JSON.stringify(groups));
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

// Get a specific group by ID
export async function getGroupById(groupId) {
  try {
    const group = await Group.getById(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    return JSON.parse(JSON.stringify(group));
  } catch (error) {
    console.error("Error fetching group:", error);
    throw error;
  }
}

// Create a new group chat (manual create, bukan dari GroupRequest)
export async function createGroup(groupData) {
  try {
    const result = await Group.create({
      name: groupData.name,
      description: groupData.description || "",
      members: groupData.members || [], // Array of member IDs
    });

    // Create Chat conversation untuk group
    if (result.insertedId) {
      await Chat.create({
        participants: groupData.members || [],
        type: "group", // Mark as group conversation
        groupId: result.insertedId.toString(),
      });
    }

    revalidatePath("/chat");
    return { success: true, groupId: result.insertedId.toString() };
  } catch (error) {
    console.error("Error creating group:", error);
    return { success: false, error: error.message };
  }
}

// Add a member to an existing group (update Group dan Chat)
export async function addGroupMember(groupId, memberId) {
  try {
    await Group.addMember(groupId, memberId);

    // Update conversation participants juga
    const conversations = await Chat.getAll();
    const groupConv = conversations.find((conv) => conv.groupId === groupId);

    if (groupConv) {
      await Chat.update(groupConv._id.toString(), {
        $addToSet: { participants: memberId },
      });
    }

    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error adding group member:", error);
    return { success: false, error: error.message };
  }
}

// Remove a member from a group (update Group dan Chat)
export async function removeGroupMember(groupId, memberId) {
  try {
    await Group.removeMember(groupId, memberId);

    // Update conversation participants juga
    const conversations = await Chat.getAll();
    const groupConv = conversations.find((conv) => conv.groupId === groupId);

    if (groupConv) {
      await Chat.update(groupConv._id.toString(), {
        $pull: { participants: memberId },
      });
    }

    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error removing group member:", error);
    return { success: false, error: error.message };
  }
}

// Delete a group and its associated conversation (hapus keduanya)
export async function deleteGroup(groupId) {
  try {
    // Find and delete conversation dulu
    const conversations = await Chat.getAll();
    const groupConv = conversations.find((conv) => conv.groupId === groupId);

    if (groupConv) {
      await Chat.delete(groupConv._id.toString());
    }

    // Delete the group
    await Group.delete(groupId);

    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error deleting group:", error);
    return { success: false, error: error.message };
  }
}
