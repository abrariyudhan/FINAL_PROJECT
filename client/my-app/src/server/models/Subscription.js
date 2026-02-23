import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { NotFound } from "../helpers/customErrors";

export default class Subscription {
  static async getCollection() {
    const db = await getDb()
    return db.collection("subscriptions")
  }

  static async getAll() {
    const collection = await this.getCollection()
    return await collection.find().sort({ billingDate: 1 }).toArray()
  }

  static async getById(id) {
    if (!id || id.length !== 24) throw new NotFound("Invalid Subscription ID format")

    const collection = await this.getCollection()
    const sub = await collection.findOne({ _id: new ObjectId(id) })

    if (!sub) throw new NotFound("Subscription not found in database")

    return sub
  }

  static async getByUserAndId(userId, subscriptionId) {
    if (!userId) throw new Error("User ID is required")
    if (!subscriptionId || subscriptionId.length !== 24) {
      throw new NotFound("Invalid Subscription ID format")
    }

    const collection = await this.getCollection()
    const sub = await collection.findOne({
      _id: new ObjectId(subscriptionId),
      userId: userId.toString()
    })

    if (!sub) throw new NotFound("Subscription not found or access denied")

    return sub
  }

  static async getByUser(userId) {
    if (!userId) return [];
    const collection = await this.getCollection()

    return await collection.find({
      $or: [
        { userId: userId.toString() },
        { userId: new ObjectId(userId) }
      ]
    }).sort({ billingDate: 1 }).toArray()
  }

  static async create(data) {
    const collection = await this.getCollection()
    const result = await collection.insertOne({
      ...data,
      type: data.type || "Individual",
      createdAt: new Date(),
    })
    return result
  }

  static async update(id, userId, data) {
    const collection = await this.getCollection()
    const existing = await this.getByUserAndId(userId, id)
    if (!existing) throw new NotFound("Subscription not found or access denied")

    return await collection.updateOne(
      {
        _id: new ObjectId(id),
        userId: userId.toString()
      },
      { $set: { ...data, updatedAt: new Date() } }
    )
  }

  static async delete(id, userId) {
    const collection = await this.getCollection()
    const existing = await this.getByUserAndId(userId, id)
    if (!existing) throw new NotFound("Subscription not found or access denied")

    return await collection.deleteOne({
      _id: new ObjectId(id),
      userId: userId.toString()
    })
  }

}