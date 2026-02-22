import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { NotFound } from "../helpers/customErrors";

export default class MemberRequest {
  static async getCollection() {
    const db = await getDb();
    return db.collection("memberRequests");
  }

  // Ambil semua request masuk untuk GroupRequest tertentu (untuk owner)
  static async getByGroupRequestId(groupRequestId) {
  const collection = await this.getCollection();
  return await collection
    .find({ groupRequestId: new ObjectId(groupRequestId) })
    .sort({ createdAt: -1 })
    .toArray();
}

  // Ambil semua request yang pernah dikirim user tertentu (untuk user melihat status requestnya)
  static async getByUserId(userId) {
  const collection = await this.getCollection();
  return await collection
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray();
}

  // Cek apakah user sudah pernah request ke GroupRequest yang sama
  static async findExisting(userId, groupRequestId) {
    const collection = await this.getCollection();
    return await collection.findOne({
      userId: new ObjectId(userId),
      groupRequestId: new ObjectId(groupRequestId),
    });
  }

  // Buat MemberRequest baru
  static async create(data) {
    const collection = await this.getCollection();
    return await collection.insertOne({
      userId: new ObjectId(data.userId),
      groupRequestId: new ObjectId(data.groupRequestId),
      status: "pending", // pending | approved | rejected
      createdAt: new Date(),
    });
  }

  // Update status (approve atau reject) — hanya bisa dilakukan owner
  static async updateStatus(id, status) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
  }

  // Ambil satu MemberRequest by ID (untuk keperluan approve, cek data user-nya)
  static async getById(id) {
  if (!id || id.length !== 24) throw new Error("Invalid MemberRequest ID");
  const collection = await this.getCollection();
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (!result) throw new NotFound("MemberRequest not found");
  return result;
}
}