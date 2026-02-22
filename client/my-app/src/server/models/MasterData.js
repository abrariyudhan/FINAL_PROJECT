import { getDb } from "../config/mongodb";
import { ObjectId } from "mongodb";

class MasterService {
  static async getCollection() {
    const db = await getDb()
    return db.collection("services")
  }

  static async findAll() {
    const coll = await this.getCollection()
    return coll.find({}).sort({ serviceName: 1 }).toArray()
  }

  static async findByName(serviceName) {
    const coll = await this.getCollection()
    return coll.findOne({ serviceName: serviceName })
  }
}

export default MasterService