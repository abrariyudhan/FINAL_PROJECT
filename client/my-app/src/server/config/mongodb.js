import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DBNAME || "final-subs"

const client = new MongoClient(uri)
let db

async function connect() {
  await client.connect()
  db = client.db(dbName)
  return db
}

export async function getDb() {
  if (!db) return await connect()
  return db
}

