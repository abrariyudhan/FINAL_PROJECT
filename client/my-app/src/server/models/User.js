import { getDb } from "../config/mongodb";
import { hashPassword } from "../helpers/bcrypt";

export default class User {
    static async getCollection() {
        const db = await getDb()
        return db.collection("users")
    }

    static async register({ fullname, username, email, password, phoneNumber }) {
        const collection = await this.getCollection()

        // Validasi tidak boleh kosong
        if (!fullname || !fullname.trim()) {
            throw new Error("Full name is required")
        }
        if (!username || !username.trim()) {
            throw new Error("Username is required")
        }
        if (!email || !email.trim()) {
            throw new Error("Email is required")
        }
        if (!password || password.length < 5) {
            throw new Error("Password must be at least 5 characters")
        }
        if (!phoneNumber || !phoneNumber.trim()) {
            throw new Error("Phone number is required")
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format")
        }

        // Cek unique username
        const existingUsername = await collection.findOne({ username: username.trim().toLowerCase() })
        if (existingUsername) {
            throw new Error("Username already exists")
        }

        // Cek unique email
        const existingEmail = await collection.findOne({ email: email.trim().toLowerCase() })
        if (existingEmail) {
            throw new Error("Email already exists")
        }

        const hashedPassword = hashPassword(password)

        const result = await collection.insertOne({
            fullname: fullname.trim(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            phoneNumber: phoneNumber.trim(),
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
            // Generate username dari email (sebelum @)
            let baseUsername = email.split("@")[0].toLowerCase()
            let username = baseUsername
            let counter = 1
            while (await collection.findOne({ username })) {
                username = `${baseUsername}${counter}`
                counter++
            }

            const result = await collection.insertOne({
                fullname: name,
                username: username,
                email: email.trim().toLowerCase(),
                password: null,
                phoneNumber: null,
                avatar: avatar || null,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            user = { _id: result.insertedId, fullname: name, username, email: email.trim().toLowerCase() }
        }

        return user
    }
}