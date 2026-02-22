import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";

export default class Group {
  static async getCollection() {
    const db = await getDb();
    return db.collection("groups");
  }

  // Get all groups
  static async getAll() {
    const collection = await this.getCollection();
    return await collection.find().toArray();
  }

  // Get a specific group by ID
  static async getById(id) {
    if (!id || id.length !== 24) throw new Error("Invalid Group ID format");
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  // Create a new group
  static async create(data) {
    const collection = await this.getCollection();
    const result = await collection.insertOne({
      name: data.name,
      description: data.description || "",
      members: data.members || [], // Array of member IDs
      createdAt: new Date(),
    });
    return result;
  }

  // Add a member to the group
  static async addMember(groupId, memberId) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(groupId) },
      { $addToSet: { members: memberId } }, // Add member if not already in the array
    );
  }

  // Remove a member from the group
  static async removeMember(groupId, memberId) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(groupId) },
      { $pull: { members: memberId } }, // Remove member from the array
    );
  }

  // Delete a group
  static async delete(groupId) {
    const collection = await this.getCollection();
    return await collection.deleteOne({ _id: new ObjectId(groupId) });
  }
}
