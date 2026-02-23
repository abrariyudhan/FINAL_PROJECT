import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { NotFound } from "../helpers/customErrors";

export default class Member {
  static async getCollection() {
    const db = await getDb();
    return db.collection("members");
  }

  static async getBySubscriptionId(subId) {
    const collection = await this.getCollection();
    return await collection.find({ subscriptionId: subId }).toArray();
  }

  static async create(data) {
    const collection = await this.getCollection();
    return await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });
  }

  static async deleteBySubscriptionId(subId) {
    const collection = await this.getCollection();
    return await collection.deleteMany({ subscriptionId: subId });
  }

  static async deleteById(memberId) {
    const collection = await this.getCollection();
    return await collection.deleteOne({ _id: new ObjectId(memberId) });
  }

  // Ambil members berdasarkan groupRequestId (untuk create group chat)
  static async getByGroupRequestId(groupRequestId) {
    const collection = await this.getCollection();
    return await collection
      .find({
        groupRequestId: groupRequestId,
      })
      .toArray();
  }
}
