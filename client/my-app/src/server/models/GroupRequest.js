import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { NotFound } from "../helpers/customErrors";

export default class GroupRequest {
  static async getCollection() {
    const db = await getDb();
    return db.collection("groupRequests");
  }

  static async getAllOpen() {
    const db = await getDb();
    return await db.collection("groupRequests").aggregate([
      { $match: { status: "open" } },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner"
        }
      },
      {
        $unwind: {
          path: "$service",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          serviceName: { $ifNull: ["$service.serviceName", "$serviceName"] },
          logo: { $ifNull: ["$service.logo", "$logo"] },
          category: { $ifNull: ["$service.category", "$category"] } // ✅ TAMBAH INI
        }
      },
      { $sort: { createdAt: -1 } }
    ]).toArray();
  }

  static async getAll() {
    const db = await getDb();
    return await db.collection("groupRequests").aggregate([
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner"
        }
      },
      {
        $unwind: {
          path: "$service",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          serviceName: { $ifNull: ["$service.serviceName", "$serviceName"] },
          logo: { $ifNull: ["$service.logo", "$logo"] },
          category: { $ifNull: ["$service.category", "$category"] } // ✅ TAMBAH INI
        }
      },
      { $sort: { createdAt: -1 } }
    ]).toArray();
  }

  static async getByOwnerId(ownerId) {
    const db = await getDb();
    return await db.collection("groupRequests").aggregate([
      { $match: { ownerId: new ObjectId(ownerId) } },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner"
        }
      },
      {
        $unwind: {
          path: "$service",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          serviceName: { $ifNull: ["$service.serviceName", "$serviceName"] },
          logo: { $ifNull: ["$service.logo", "$logo"] },
          category: { $ifNull: ["$service.category", "$category"] } // ✅ TAMBAH INI
        }
      },
      { $sort: { createdAt: -1 } }
    ]).toArray();
  }

  static async getById(id) {
    if (!id || id.length !== 24) throw new Error("Invalid GroupRequest ID");
    const db = await getDb();

    const result = await db.collection("groupRequests").aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner"
        }
      },
      {
        $unwind: {
          path: "$service",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          serviceName: { $ifNull: ["$service.serviceName", "$serviceName"] },
          logo: { $ifNull: ["$service.logo", "$logo"] },
          category: { $ifNull: ["$service.category", "$category"] } // ✅ TAMBAH INI
        }
      }
    ]).toArray();

    if (!result || result.length === 0) throw new NotFound("GroupRequest not found");
    return result[0];
  }

  // ✅ FIX: Tambah category dan serviceId
  static async create(data) {
    const collection = await this.getCollection();
    
    const doc = {
      ownerId: new ObjectId(data.ownerId),
      serviceName: data.serviceName,
      logo: data.logo || "",
      category: data.category || "Other", // ✅ TAMBAH INI
      title: data.title,
      description: data.description || "",
      maxSlot: Number(data.maxSlot),
      availableSlot: Number(data.maxSlot),
      status: "open",
      createdAt: new Date(),
    };

    // ✅ TAMBAH INI: Jika ada serviceId, simpan sebagai ObjectId
    if (data.serviceId) {
      doc.serviceId = new ObjectId(data.serviceId);
    }

    return await collection.insertOne(doc);
  }

  // ✅ FIX: Update juga harus handle category
  static async update(id, ownerId, data) {
    const collection = await this.getCollection();
    const groupRequest = await this.getById(id);

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
          category: data.category || groupRequest.category || "Other", // ✅ TAMBAH INI
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