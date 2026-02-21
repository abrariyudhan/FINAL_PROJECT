import { getDb } from "../config/mongodb";
import { hashPassword } from "../helpers/bcrypt";

export default class User {
    static async getCollection() {
        const db = await getDb()
        return db.collection("users")
    }

    static async register({ name, email, password }) {
        const collection = await this.getCollection()

        // Validasi tidak boleh kosong
        if (!name || !name.trim()) {
            throw new Error("Name is required")
        }
        if (!email || !email.trim()) {
            throw new Error("Email is required")
        }
        if (!password || password.length < 5) {
            throw new Error("Password must be at least 5 characters")
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format")
        }

        // Cek unique name
        const existingName = await collection.findOne({ name: name.trim() })
        if (existingName) {
            throw new Error("Name already taken")
        }

        // Cek unique email
        const existingEmail = await collection.findOne({ email: email.trim().toLowerCase() })
        if (existingEmail) {
            throw new Error("Email already registered")
        }

        const hashedPassword = hashPassword(password)

        const result = await collection.insertOne({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return result
    }

    static async findByEmail(email) {
        const collection = await this.getCollection()
        return collection.findOne({ email: email.trim().toLowerCase() })
    }

    static async getUserById(id) {
        const { ObjectId } = await import("mongodb")
        const collection = await this.getCollection()
        return collection.findOne({ _id: new ObjectId(id) })
    }

    static async findOrCreateGoogleUser({ name, email, avatar }) {
        const collection = await this.getCollection()
        
        let user = await collection.findOne({ email: email.trim().toLowerCase() })

        if (!user) {
            const result = await collection.insertOne({
                name: name,
                email: email.trim().toLowerCase(),
                password: null,
                avatar: avatar || null,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            user = { _id: result.insertedId, name, email: email.trim().toLowerCase() }
        }

        return user
    }
}