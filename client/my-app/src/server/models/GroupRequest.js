import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { NotFound } from "../helpers/customErrors";

export default class GroupRequest {
  static async getCollection() {
    const db = await getDb();
    return db.collection("groupRequests");
  }

  static async getAllOpen() {
    const collection = await this.getCollection();
    return await collection.find({ status: "open" }).toArray();
  }

  static async getAll() {
    const collection = await this.getCollection();
    return await collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  static async getByOwnerId(ownerId) {
    const collection = await this.getCollection();
    return await collection
      .find({ ownerId: new ObjectId(ownerId) })
      .sort({ createdAt: -1 })
      .toArray();
  }

  static async getById(id) {
    if (!id || id.length !== 24) throw new Error("Invalid GroupRequest ID");
    const collection = await this.getCollection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result) throw new NotFound("GroupRequest not found");
    return result;
  }

  // Buat GroupRequest baru — tidak perlu subscriptionId/serviceId lagi
  static async create(data) {
    const collection = await this.getCollection();
    return await collection.insertOne({
      ownerId: new ObjectId(data.ownerId),
      serviceName: data.serviceName,
      logo: data.logo || "",
      title: data.title,
      description: data.description || "",
      maxSlot: Number(data.maxSlot),
      availableSlot: Number(data.maxSlot),
      status: "open",
      createdAt: new Date(),
    });
  }

  // Update GroupRequest (edit oleh owner)
  static async update(id, ownerId, data) {
    const collection = await this.getCollection();
    const groupRequest = await this.getById(id);

    // Hitung ulang availableSlot jika maxSlot berubah
    const slotDiff = Number(data.maxSlot) - groupRequest.maxSlot;
    const newAvailableSlot = Math.max(0, groupRequest.availableSlot + slotDiff);
    const newStatus = newAvailableSlot <= 0
      ? "full"
      : groupRequest.status === "full"
        ? "open"
        : groupRequest.status;

    return await collection.updateOne(
      { _id: new ObjectId(id), ownerId: new ObjectId(ownerId) },
      {
        $set: {
          serviceName: data.serviceName,
          logo: data.logo || groupRequest.logo || "",
          title: data.title,
          description: data.description || "",
          maxSlot: Number(data.maxSlot),
          availableSlot: newAvailableSlot,
          status: newStatus,
          updatedAt: new Date(),
        },
      }
    );
  }

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

  // Tambah slot kembali saat member dihapus
  static async incrementSlot(id) {
    const collection = await this.getCollection();
    const groupRequest = await this.getById(id);
    const newSlot = groupRequest.availableSlot + 1;
    const newStatus = groupRequest.status === "full" ? "open" : groupRequest.status;
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { availableSlot: newSlot, status: newStatus } }
    );
  }

  static async close(id, ownerId) {
    const collection = await this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(id), ownerId: new ObjectId(ownerId) },
      { $set: { status: "closed" } }
    );
  }

  static async delete(id, ownerId) {
    const collection = await this.getCollection();
    return await collection.deleteOne({
      _id: new ObjectId(id),
      ownerId: new ObjectId(ownerId),
    });
  }
}