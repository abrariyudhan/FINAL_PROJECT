import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";

export default class Chat {
  static async getCollection() {
    const db = await getDb();
    return db.collection("chats");
  }

  // Get all conversations for the user with their last message
  static async getAll() {
    const collection = await this.getCollection();
    return await collection
      .find()
      .sort({ "lastMessage.timestamp": -1 }) // Sort by most recent message
      .toArray();
  }

  // Get all conversations with populated participant details (names, avatars)
  static async getAllWithParticipants() {
    const collection = await this.getCollection();
    return await collection
      .aggregate([
        {
          $addFields: {
            // Convert participant strings to ObjectIds for lookup
            participantIds: {
              $map: {
                input: "$participants",
                as: "participantId",
                in: { $toObjectId: "$$participantId" },
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "participantIds",
            foreignField: "_id",
            as: "participantDetails",
          },
        },
        {
          $project: {
            participants: 1,
            type: 1,
            groupId: 1,
            messages: 1,
            lastMessage: 1,
            unreadCount: 1,
            createdAt: 1,
            updatedAt: 1,
            // Only return necessary user fields: fullname, username, avatar
            participantDetails: {
              $map: {
                input: "$participantDetails",
                as: "user",
                in: {
                  _id: "$$user._id",
                  fullname: "$$user.fullname",
                  username: "$$user.username",
                  avatar: "$$user.avatar",
                },
              },
            },
          },
        },
        {
          $sort: { "lastMessage.timestamp": -1 }, // Sort by most recent message
        },
      ])
      .toArray();
  }

  // Get a specific conversation by ID
  static async getById(id) {
    if (!id || id.length !== 24) throw new Error("Invalid Chat ID format");
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  // Create a new conversation with initial structure
  static async create(data) {
    const collection = await this.getCollection();
    const result = await collection.insertOne({
      participants: data.participants || [], // Array of participant member IDs
      type: data.type || "direct", // 'direct' for 1-on-1, 'group' for group chats
      groupId: data.groupId || null, // Reference to Group if type is 'group'
      messages: [], // Array of message objects
      lastMessage: null, // Last message info for preview
      unreadCount: 0, // Count of unread messages
      createdAt: new Date(),
    });
    return result;
  }

  // Add a new message to a conversation
  static async addMessage(conversationId, message) {
    const collection = await this.getCollection();
    const messageData = {
      _id: new ObjectId(),
      senderId: message.senderId,
      content: message.content,
      type: message.type || "text", // 'text', 'image', 'file'
      fileUrl: message.fileUrl || null,
      fileName: message.fileName || null,
      reactions: [], // Array of { userId, emoji }
      timestamp: new Date(),
    };

    // Add message to messages array and update lastMessage
    return await collection.updateOne(
      { _id: new ObjectId(conversationId) },
      {
        $push: { messages: messageData },
        $set: {
          lastMessage: {
            content: message.content,
            timestamp: messageData.timestamp,
          },
          updatedAt: new Date(),
        },
        $inc: { unreadCount: 1 }, // Increment unread count
      },
    );
  }

  // Add a reaction to a specific message
  static async addReaction(conversationId, messageId, reaction) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      {
        _id: new ObjectId(conversationId),
        "messages._id": new ObjectId(messageId),
      },
      {
        $push: {
          "messages.$.reactions": {
            userId: reaction.userId,
            emoji: reaction.emoji,
          },
        },
      },
    );
  }

  // Reset unread count for a conversation
  static async markAsRead(conversationId) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(conversationId) },
      { $set: { unreadCount: 0 } },
    );
  }

  // Update conversation data
  static async update(id, data) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
    );
  }

  // Delete a conversation
  static async delete(id) {
    const collection = await this.getCollection();
    return await collection.deleteOne({ _id: new ObjectId(id) });
  }
}
