import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { NotFound } from "../helpers/customErrors";

export default class GroupRequest {
  static async getCollection() {
    const db = await getDb();
    return db.collection("groupRequests");
  }

  // Ambil semua GroupRequest yang masih open (untuk halaman browse)
  static async getAllOpen() {
    const collection = await this.getCollection();
    return await collection.find({ status: "open" }).toArray();
  }

  // Ambil semua GroupRequest (semua status: open, full, closed) — untuk explore
  static async getAll() {
    const collection = await this.getCollection();
    return await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  }

  // Ambil semua GroupRequest milik owner tertentu
  static async getByOwnerId(ownerId) {
    const collection = await this.getCollection();
    return await collection
      .find({ ownerId: new ObjectId(ownerId) })
      .sort({ createdAt: -1 })
      .toArray();
  }

  // Ambil satu GroupRequest by ID
  static async getById(id) {
    if (!id || id.length !== 24) throw new Error("Invalid GroupRequest ID");
    const collection = await this.getCollection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result) throw new NotFound("GroupRequest not found");
    return result;
  }

  // Buat GroupRequest baru
  static async create(data) {
    const collection = await this.getCollection();
    return await collection.insertOne({
      ownerId: new ObjectId(data.ownerId),
      serviceId: new ObjectId(data.serviceId),
      title: data.title,
      description: data.description || "",
      maxSlot: Number(data.maxSlot),
      availableSlot: Number(data.maxSlot), // awalnya sama dengan maxSlot
      status: "open", // open | closed | full
      createdAt: new Date(),
    });
  }

  // Update availableSlot (kurangi 1 saat ada member yang approved)
  static async decrementSlot(id) {
    const collection = await this.getCollection();
    const groupRequest = await this.getById(id);

    const newSlot = groupRequest.availableSlot - 1;
    const newStatus = newSlot <= 0 ? "full" : "open";

    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { availableSlot: newSlot, status: newStatus } }
    );
  }

  // Tutup GroupRequest secara manual oleh owner
  static async close(id, ownerId) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(id), ownerId: new ObjectId(ownerId) },
      { $set: { status: "closed" } }
    );
  }

  // Hapus GroupRequest
  static async delete(id, ownerId) {
    const collection = await this.getCollection();
    return await collection.deleteOne({
      _id: new ObjectId(id),
      ownerId: new ObjectId(ownerId),
    });
  }
}