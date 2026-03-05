module.exports = [
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DBNAME || "final-subs";
const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["MongoClient"](uri);
let db;
async function connect() {
    await client.connect();
    db = client.db(dbName);
    return db;
}
async function getDb() {
    if (!db) return await connect();
    return db;
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Chat.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Chat
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)");
;
;
class Chat {
    static async getCollection() {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection("chats");
    }
    // Get all conversations for the user with their last message
    static async getAll() {
        const collection = await this.getCollection();
        return await collection.find().sort({
            "lastMessage.timestamp": -1
        }) // Sort by most recent message
        .toArray();
    }
    // Get a specific conversation by ID
    static async getById(id) {
        if (!id || id.length !== 24) throw new Error("Invalid Chat ID format");
        const collection = await this.getCollection();
        return await collection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        });
    }
    // Create a new conversation with initial structure
    static async create(data) {
        const collection = await this.getCollection();
        const result = await collection.insertOne({
            participants: data.participants || [],
            type: data.type || "direct",
            groupId: data.groupId || null,
            messages: [],
            lastMessage: null,
            unreadCount: 0,
            createdAt: new Date()
        });
        return result;
    }
    // Add a new message to a conversation
    static async addMessage(conversationId, message) {
        const collection = await this.getCollection();
        const messageData = {
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](),
            senderId: message.senderId,
            content: message.content,
            type: message.type || "text",
            fileUrl: message.fileUrl || null,
            fileName: message.fileName || null,
            reactions: [],
            timestamp: new Date()
        };
        // Add message to messages array and update lastMessage
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](conversationId)
        }, {
            $push: {
                messages: messageData
            },
            $set: {
                lastMessage: {
                    content: message.content,
                    timestamp: messageData.timestamp
                },
                updatedAt: new Date()
            },
            $inc: {
                unreadCount: 1
            }
        });
    }
    // Add a reaction to a specific message
    static async addReaction(conversationId, messageId, reaction) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](conversationId),
            "messages._id": new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](messageId)
        }, {
            $push: {
                "messages.$.reactions": {
                    userId: reaction.userId,
                    emoji: reaction.emoji
                }
            }
        });
    }
    // Reset unread count for a conversation
    static async markAsRead(conversationId) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](conversationId)
        }, {
            $set: {
                unreadCount: 0
            }
        });
    }
    // Update conversation data
    static async update(id, data) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        }, {
            $set: {
                ...data,
                updatedAt: new Date()
            }
        });
    }
    // Delete a conversation
    static async delete(id) {
        const collection = await this.getCollection();
        return await collection.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        });
    }
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Group.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Group
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)");
;
;
class Group {
    static async getCollection() {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection("groups");
    }
    // Get all groups
    static async getAll() {
        const collection = await this.getCollection();
        return await collection.find().toArray();
    }
    // Get a specific group by ID
    static async getById(id) {
        if (!id || id.length !== 24) throw new Error("Invalid Group ID format");
        const collection = await this.getCollection();
        return await collection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        });
    }
    // Create a new group
    static async create(data) {
        const collection = await this.getCollection();
        const result = await collection.insertOne({
            name: data.name,
            description: data.description || "",
            members: data.members || [],
            createdAt: new Date()
        });
        return result;
    }
    // Add a member to the group
    static async addMember(groupId, memberId) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](groupId)
        }, {
            $addToSet: {
                members: memberId
            }
        });
    }
    // Remove a member from the group
    static async removeMember(groupId, memberId) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](groupId)
        }, {
            $pull: {
                members: memberId
            }
        });
    }
    // Delete a group
    static async delete(groupId) {
        const collection = await this.getCollection();
        return await collection.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](groupId)
        });
    }
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/chat.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000b0d83df5c3b9dd778b4b6e8695ab1fc247bbf51":"getConversations","0094a43c25296cf231f841dfa3be929b835eb73116":"getGroups","4000abdb3e8055daeb6a5ecc5359c9361b5734d2a5":"markConversationAsRead","4021202e676d81de030db50301af32e77731cbd681":"uploadFile","40245c1a2a4cd2de637d7d95763b7ee3601c4f4ea8":"deleteGroup","4040677caf7fa639bcc0ae8b28b7fc8d7e93d26d36":"getMessages","405425b538ec338e40695ad1cf96085edc8964a99f":"createConversation","408142f3401f941354440a8e6a6adf3d649e79c182":"createGroup","40dc10c7af4c3738a421c1dcc44932545b8ed3c295":"getGroupById","6023452ec2f83375acd1e23b0ee8453e98c5c17ad2":"removeGroupMember","607d69b559a5fe873a247793ef301d9eb7601df169":"sendMessage","60fbb463abbee56e0156819ebaa969a7b3de74bce7":"addGroupMember","7020120914dd5e1b9ac8ca96cd116c1ee2aaf8de0a":"addReaction"},"",""] */ __turbopack_context__.s([
    "addGroupMember",
    ()=>addGroupMember,
    "addReaction",
    ()=>addReaction,
    "createConversation",
    ()=>createConversation,
    "createGroup",
    ()=>createGroup,
    "deleteGroup",
    ()=>deleteGroup,
    "getConversations",
    ()=>getConversations,
    "getGroupById",
    ()=>getGroupById,
    "getGroups",
    ()=>getGroups,
    "getMessages",
    ()=>getMessages,
    "markConversationAsRead",
    ()=>markConversationAsRead,
    "removeGroupMember",
    ()=>removeGroupMember,
    "sendMessage",
    ()=>sendMessage,
    "uploadFile",
    ()=>uploadFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Chat.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Group.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getConversations() {
    try {
        const conversations = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getAll();
        // Convert ObjectIds to strings for client-side rendering
        return JSON.parse(JSON.stringify(conversations));
    } catch (error) {
        console.error("Error fetching conversations:", error);
        throw error;
    }
}
async function getMessages(conversationId) {
    try {
        const conversation = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(conversationId);
        if (!conversation) {
            throw new Error("Conversation not found");
        }
        return JSON.parse(JSON.stringify(conversation.messages || []));
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
}
async function sendMessage(conversationId, messageData) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].addMessage(conversationId, {
            senderId: messageData.senderId,
            content: messageData.content,
            type: messageData.type || "text",
            fileUrl: messageData.fileUrl || null,
            fileName: messageData.fileName || null
        });
        // Revalidate the chat page to show new message
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true,
            result
        };
    } catch (error) {
        console.error("Error sending message:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function addReaction(conversationId, messageId, reactionData) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].addReaction(conversationId, messageId, {
            userId: reactionData.userId,
            emoji: reactionData.emoji
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true,
            result
        };
    } catch (error) {
        console.error("Error adding reaction:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function markConversationAsRead(conversationId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].markAsRead(conversationId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error marking conversation as read:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function createConversation(participantIds) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            participants: participantIds
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true,
            conversationId: result.insertedId.toString()
        };
    } catch (error) {
        console.error("Error creating conversation:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function uploadFile(formData) {
    try {
        // TODO: Implement actual file upload to storage service (e.g., AWS S3, Cloudinary)
        // For now, returning a placeholder URL
        const file = formData.get("file");
        const fileName = file.name;
        // Placeholder: In production, upload to cloud storage and get actual URL
        const fileUrl = `/uploads/${Date.now()}-${fileName}`;
        return {
            success: true,
            fileUrl,
            fileName
        };
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getGroups() {
    try {
        const groups = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getAll();
        // Convert ObjectIds to strings for client-side rendering
        return JSON.parse(JSON.stringify(groups));
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
    }
}
async function getGroupById(groupId) {
    try {
        const group = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        return JSON.parse(JSON.stringify(group));
    } catch (error) {
        console.error("Error fetching group:", error);
        throw error;
    }
}
async function createGroup(groupData) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            name: groupData.name,
            description: groupData.description || "",
            members: groupData.members || []
        });
        // Also create a conversation for the group
        if (result.insertedId) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
                participants: groupData.members || [],
                type: "group",
                groupId: result.insertedId.toString()
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true,
            groupId: result.insertedId.toString()
        };
    } catch (error) {
        console.error("Error creating group:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function addGroupMember(groupId, memberId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].addMember(groupId, memberId);
        // Also need to update the conversation's participants
        // Find the conversation associated with this group
        const conversations = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getAll();
        const groupConv = conversations.find((conv)=>conv.groupId === groupId);
        if (groupConv) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].update(groupConv._id.toString(), {
                $addToSet: {
                    participants: memberId
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error adding group member:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function removeGroupMember(groupId, memberId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].removeMember(groupId, memberId);
        // Also update the conversation's participants
        const conversations = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getAll();
        const groupConv = conversations.find((conv)=>conv.groupId === groupId);
        if (groupConv) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].update(groupConv._id.toString(), {
                $pull: {
                    participants: memberId
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error removing group member:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function deleteGroup(groupId) {
    try {
        // Find and delete the conversation associated with this group
        const conversations = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getAll();
        const groupConv = conversations.find((conv)=>conv.groupId === groupId);
        if (groupConv) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].delete(groupConv._id.toString());
        }
        // Delete the group
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].delete(groupId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting group:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getConversations,
    getMessages,
    sendMessage,
    addReaction,
    markConversationAsRead,
    createConversation,
    uploadFile,
    getGroups,
    getGroupById,
    createGroup,
    addGroupMember,
    removeGroupMember,
    deleteGroup
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getConversations, "000b0d83df5c3b9dd778b4b6e8695ab1fc247bbf51", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMessages, "4040677caf7fa639bcc0ae8b28b7fc8d7e93d26d36", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendMessage, "607d69b559a5fe873a247793ef301d9eb7601df169", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addReaction, "7020120914dd5e1b9ac8ca96cd116c1ee2aaf8de0a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(markConversationAsRead, "4000abdb3e8055daeb6a5ecc5359c9361b5734d2a5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createConversation, "405425b538ec338e40695ad1cf96085edc8964a99f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadFile, "4021202e676d81de030db50301af32e77731cbd681", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGroups, "0094a43c25296cf231f841dfa3be929b835eb73116", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGroupById, "40dc10c7af4c3738a421c1dcc44932545b8ed3c295", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createGroup, "408142f3401f941354440a8e6a6adf3d649e79c182", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addGroupMember, "60fbb463abbee56e0156819ebaa969a7b3de74bce7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeGroupMember, "6023452ec2f83375acd1e23b0ee8453e98c5c17ad2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteGroup, "40245c1a2a4cd2de637d7d95763b7ee3601c4f4ea8", null);
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/.next-internal/server/app/chat/page/actions.js { ACTIONS_MODULE0 => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/chat.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/chat.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/.next-internal/server/app/chat/page/actions.js { ACTIONS_MODULE0 => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/chat.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000b0d83df5c3b9dd778b4b6e8695ab1fc247bbf51",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConversations"],
    "0094a43c25296cf231f841dfa3be929b835eb73116",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGroups"],
    "4021202e676d81de030db50301af32e77731cbd681",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadFile"],
    "40245c1a2a4cd2de637d7d95763b7ee3601c4f4ea8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteGroup"],
    "4040677caf7fa639bcc0ae8b28b7fc8d7e93d26d36",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMessages"],
    "408142f3401f941354440a8e6a6adf3d649e79c182",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGroup"],
    "6023452ec2f83375acd1e23b0ee8453e98c5c17ad2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeGroupMember"],
    "607d69b559a5fe873a247793ef301d9eb7601df169",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendMessage"],
    "60fbb463abbee56e0156819ebaa969a7b3de74bce7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addGroupMember"],
    "7020120914dd5e1b9ac8ca96cd116c1ee2aaf8de0a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addReaction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$chat$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/.next-internal/server/app/chat/page/actions.js { ACTIONS_MODULE0 => "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/chat.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/chat.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=OneDrive_Dokumen_Hacktiv8_phase%203_FINAL_PROJECT_client_my-app_0ab20be7._.js.map