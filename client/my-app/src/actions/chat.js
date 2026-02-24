"use server";

import Chat from "@/server/models/Chat";
import Group from "@/server/models/Group";
import { revalidatePath } from "next/cache";

// Fetch all conversations sorted by most recent
export async function getConversations() {
  try {
    // Get current user untuk filter conversations
    const { getCurrentUser } = await import("./auth");
    const user = await getCurrentUser();
    const userId = user?.userId;

    const conversations = await Chat.getAllWithParticipants(userId); // Get conversations with user details, filtered by user

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

// Handle file upload to Cloudinary
export async function uploadFile(formData) {
  try {
    // Dynamic import for cloudinary
    const { v2: cloudinary } = await import("cloudinary");

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const file = formData.get("file");
    if (!file) {
      throw new Error("No file provided");
    }

    const fileName = file.name;
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    console.log("📤 Uploading to Cloudinary:", fileName);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "chat-uploads",
          resource_type: "auto",
          public_id: `chat-${Date.now()}-${fileName.split(".")[0]}`,
        },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(buffer);
    });

    console.log("✅ File uploaded to Cloudinary:", result.secure_url);

    return {
      success: true,
      fileUrl: result.secure_url,
      fileName: fileName,
    };
  } catch (error) {
    console.error("❌ Error uploading file to Cloudinary:", error);
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

// Get all unique members from user's groups with their details
export async function getGroupMembers() {
  try {
    const { getCurrentUser } = await import("./auth");
    const user = await getCurrentUser();
    const userId = user?.userId;

    if (!userId) {
      return [];
    }

    // Get all groups where the user is a member
    const groups = await Group.getAll();
    const userGroups = groups.filter((group) =>
      group.members?.includes(userId),
    );

    // Collect all unique member IDs (excluding current user)
    const memberIds = new Set();
    userGroups.forEach((group) => {
      group.members?.forEach((memberId) => {
        if (memberId !== userId) {
          memberIds.add(memberId);
        }
      });
    });

    // Get user details for all members
    const User = (await import("@/server/models/User")).default;
    const { ObjectId } = await import("mongodb");
    const userCollection = await User.getCollection();

    const members = await userCollection
      .find({
        _id: { $in: Array.from(memberIds).map((id) => new ObjectId(id)) },
      })
      .toArray();

    // Return member details with safe fields only
    return JSON.parse(
      JSON.stringify(
        members.map((member) => ({
          _id: member._id.toString(),
          fullname: member.fullname,
          username: member.username,
          email: member.email,
          avatar: member.avatar || null,
        })),
      ),
    );
  } catch (error) {
    console.error("Error fetching group members:", error);
    return [];
  }
}

// Find or create a direct conversation with a specific user
export async function findOrCreateConversation(otherUserId) {
  try {
    const { getCurrentUser } = await import("./auth");
    const user = await getCurrentUser();
    const userId = user?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if conversation already exists between these two users
    const conversations = await Chat.getAll();
    const existingConv = conversations.find(
      (conv) =>
        conv.type === "direct" &&
        conv.participants?.length === 2 &&
        conv.participants.includes(userId) &&
        conv.participants.includes(otherUserId),
    );

    if (existingConv) {
      return {
        success: true,
        conversationId: existingConv._id.toString(),
        isNew: false,
      };
    }

    // Create new direct conversation
    const result = await Chat.create({
      participants: [userId, otherUserId],
      type: "direct",
    });

    revalidatePath("/chat");
    return {
      success: true,
      conversationId: result.insertedId.toString(),
      isNew: true,
    };
  } catch (error) {
    console.error("Error finding/creating conversation:", error);
    return { success: false, error: error.message };
  }
}
