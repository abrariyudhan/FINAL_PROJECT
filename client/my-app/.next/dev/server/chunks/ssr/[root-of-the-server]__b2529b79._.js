module.exports = [
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/favicon.ico.mjs { IMAGE => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/favicon.ico.mjs { IMAGE => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/customErrors.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BadRequest",
    ()=>BadRequest,
    "CustomError",
    ()=>CustomError,
    "NotFound",
    ()=>NotFound,
    "Unauthorized",
    ()=>Unauthorized
]);
class CustomError extends Error {
    constructor(message, statusCode = 500){
        super(message);
        this.statusCode = statusCode;
    }
}
class BadRequest extends CustomError {
    constructor(message){
        super(message, 400);
    }
}
class Unauthorized extends CustomError {
    constructor(message){
        super(message, 401);
    }
}
class NotFound extends CustomError {
    constructor(message){
        super(message, 404);
    }
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Subscription.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Subscription
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/customErrors.js [app-rsc] (ecmascript)");
;
;
;
class Subscription {
    static async getCollection() {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection("subscriptions");
    }
    static async getAll() {
        const collection = await this.getCollection();
        return await collection.find().sort({
            billingDate: 1
        }).toArray();
    }
    static async getById(id) {
        if (!id || id.length !== 24) throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("Invalid Subscription ID format");
        const collection = await this.getCollection();
        const sub = await collection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        });
        if (!sub) throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("Subscription not found in database");
        return sub;
    }
    static async getByUserAndId(userId, subscriptionId) {
        if (!userId) throw new Error("User ID is required");
        if (!subscriptionId || subscriptionId.length !== 24) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("Invalid Subscription ID format");
        }
        const collection = await this.getCollection();
        const sub = await collection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](subscriptionId),
            userId: userId.toString()
        });
        if (!sub) throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("Subscription not found or access denied");
        return sub;
    }
    static async getByUser(userId) {
        if (!userId) return [];
        const collection = await this.getCollection();
        return await collection.find({
            $or: [
                {
                    userId: userId.toString()
                },
                {
                    userId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](userId)
                }
            ]
        }).sort({
            billingDate: 1
        }).toArray();
    }
    static async create(data) {
        const collection = await this.getCollection();
        const result = await collection.insertOne({
            ...data,
            type: data.type || "Individual",
            createdAt: new Date()
        });
        return result;
    }
    static async update(id, userId, data) {
        const collection = await this.getCollection();
        const existing = await this.getByUserAndId(userId, id);
        if (!existing) throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("Subscription not found or access denied");
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id),
            userId: userId.toString()
        }, {
            $set: {
                ...data,
                updatedAt: new Date()
            }
        });
    }
    static async delete(id, userId) {
        const collection = await this.getCollection();
        const existing = await this.getByUserAndId(userId, id);
        if (!existing) throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("Subscription not found or access denied");
        return await collection.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id),
            userId: userId.toString()
        });
    }
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Member.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Member
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/customErrors.js [app-rsc] (ecmascript)");
;
;
;
class Member {
    static async getCollection() {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection("members");
    }
    static async getBySubscriptionId(subId) {
        const collection = await this.getCollection();
        return await collection.find({
            subscriptionId: subId
        }).toArray();
    }
    static async create(data) {
        const collection = await this.getCollection();
        return await collection.insertOne({
            ...data,
            createdAt: new Date()
        });
    }
    static async deleteBySubscriptionId(subId) {
        const collection = await this.getCollection();
        return await collection.deleteMany({
            subscriptionId: subId
        });
    }
    static async deleteById(memberId) {
        const collection = await this.getCollection();
        return await collection.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](memberId)
        });
    }
    // Ambil members berdasarkan groupRequestId (untuk create group chat)
    static async getByGroupRequestId(groupRequestId) {
        const collection = await this.getCollection();
        return await collection.find({
            groupRequestId: groupRequestId
        }).toArray();
    }
    static async updateTelegramId(memberId, chatId) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](memberId)
        }, {
            $set: {
                telegramChatId: chatId.toString()
            }
        });
    }
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
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SubscriptionDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Subscription$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Subscription.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Member$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Member.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/date-fns/format.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function SubscriptionDetailPage({ params }) {
    const { id } = await params;
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user.userId) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/dashboard");
    }
    try {
        const { getDb } = await __turbopack_context__.A("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript, async loader)");
        const { ObjectId } = await __turbopack_context__.A("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb, async loader)");
        const db = await getDb();
        // Coba akses sebagai owner dulu
        let sub = null;
        let isOwner = true;
        try {
            sub = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Subscription$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getByUserAndId(user.userId, id);
        } catch  {
            // Bukan owner — cek apakah user adalah member dari subscription ini
            isOwner = false;
            const memberDoc = await db.collection("members").findOne({
                subscriptionId: id,
                userId: user.userId
            });
            if (!memberDoc) (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/dashboard");
            sub = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Subscription$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(id);
        }
        const members = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Member$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getBySubscriptionId(id);
        // LOGIKA PERHITUNGAN
        const cycle = Number(sub.billingCycle) || 1;
        const totalPeople = 1 + members.length;
        const pricePerPerson = Math.round(sub.pricePaid / totalPeople);
        const pricePerMonth = Math.round(pricePerPerson / cycle);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                className: "group flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl group-hover:-translate-x-1 transition-transform",
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-xs font-bold uppercase tracking-wider",
                                                children: "Back to Dashboard"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 53,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-[10px] text-slate-400",
                                                children: "View all subscriptions"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 54,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/dashboard/${id}/edit`,
                                className: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "✏️"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Edit Details"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 md:p-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col lg:flex-row justify-between items-start gap-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-8 flex-1 w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border-2 border-blue-100 flex-shrink-0 relative group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-gradient-to-br from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:to-cyan-400/10 transition-all"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 78,
                                                                columnNumber: 23
                                                            }, this),
                                                            sub.logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: sub.logo,
                                                                alt: sub.serviceName,
                                                                className: "w-16 h-16 object-contain relative z-10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 80,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-500 text-5xl font-black uppercase relative z-10",
                                                                children: sub.serviceName.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 86,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-3 mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                        className: "text-4xl md:text-5xl font-black tracking-tight text-slate-800 break-words",
                                                                        children: sub.serviceName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 95,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    sub.isReminderActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-2 flex-shrink-0 bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-2xl border border-purple-100 shadow-lg",
                                                                        title: "Reminder Active",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            className: "h-6 w-6 text-purple-500",
                                                                            viewBox: "0 0 20 20",
                                                                            fill: "currentColor",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                lineNumber: 101,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 100,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 99,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 94,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold uppercase tracking-wider px-4 py-2 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 rounded-xl border border-slate-200 shadow-sm",
                                                                        children: [
                                                                            "📁 ",
                                                                            sub.category
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 107,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold uppercase tracking-wider px-4 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 rounded-xl border border-blue-200 shadow-sm",
                                                                        children: sub.type === "Family" ? "👨‍👩‍👧‍👦 Family Plan" : "👤 Individual"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 110,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 106,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 93,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-6 -right-6 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 120,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 mb-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-2xl",
                                                                                children: "📅"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                lineNumber: 123,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-blue-600 uppercase tracking-wider",
                                                                                children: "Next Billing"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                lineNumber: 124,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 122,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-lg font-black text-slate-800",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(sub.billingDate), 'dd MMMM yyyy')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 126,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 121,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 119,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-100 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-6 -right-6 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 133,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 mb-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-2xl",
                                                                                children: "🔔"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                lineNumber: 136,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-purple-600 uppercase tracking-wider",
                                                                                children: "Reminder Date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                lineNumber: 137,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 135,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-lg font-black text-slate-800",
                                                                        children: sub.isReminderActive ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(sub.reminderDate), 'dd MMMM yyyy') : "Disabled"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                        lineNumber: 139,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 134,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 132,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full lg:w-auto lg:min-w-[380px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white shadow-2xl border border-slate-700 relative overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                    lineNumber: 152,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                    lineNumber: 153,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                    lineNumber: 154,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative z-10 space-y-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 pb-6 border-b border-slate-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-3xl",
                                                                    children: "💰"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                    lineNumber: 158,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-400 text-xs font-bold uppercase tracking-wider",
                                                                    children: "Financial Summary"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                    lineNumber: 159,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                            lineNumber: 157,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-blue-400 text-xs font-bold uppercase tracking-wider mb-3",
                                                                    children: sub.type === "Family" ? "Your Share" : "Total Bill"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                    lineNumber: 164,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-baseline gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-2xl font-black text-slate-500",
                                                                            children: "IDR"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 168,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-5xl md:text-6xl font-black text-white tracking-tighter",
                                                                            children: sub.type === "Family" ? pricePerPerson.toLocaleString("id-ID") : sub.pricePaid.toLocaleString("id-ID")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 169,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        sub.type === "Family" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-slate-400 text-sm font-bold uppercase",
                                                                            children: "/pax"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 172,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                    lineNumber: 167,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                            lineNumber: 163,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 gap-6 pt-6 border-t border-slate-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-emerald-400 text-xs font-bold uppercase mb-2 flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "📊"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                    lineNumber: 180,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Monthly Eq."
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                    lineNumber: 181,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 179,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-2xl font-black text-emerald-400",
                                                                            children: pricePerMonth.toLocaleString("id-ID")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 183,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                    lineNumber: 178,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-cyan-400 text-xs font-bold uppercase mb-2 flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "🔄"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                    lineNumber: 189,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Cycle"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                                    lineNumber: 190,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 188,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-2xl font-black text-cyan-400",
                                                                            children: cycle === 12 ? 'Annual' : `${cycle}mo`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 192,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                    lineNumber: 187,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                            lineNumber: 177,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-blue-300 text-xs leading-relaxed",
                                                                children: sub.type === "Family" ? `💡 Total bill Rp ${sub.pricePaid.toLocaleString("id-ID")} split with ${members.length} others.` : "💡 Personal subscription billed to your account."
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 200,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                            lineNumber: 199,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                    lineNumber: 156,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    sub.type === "Family" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg",
                                                children: "👥"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 219,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-black tracking-tight text-slate-800",
                                                        children: "Group Members"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 223,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500",
                                                        children: "Shared subscription members"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 224,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 222,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 218,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-slate-500 uppercase tracking-wider bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 px-6 py-3 rounded-2xl shadow-lg",
                                        children: [
                                            members.length,
                                            " Active"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                lineNumber: 217,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: members.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-xl shadow-slate-200/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl",
                                                children: "👥"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 236,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                            lineNumber: 235,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-slate-900 font-black text-xl mb-2",
                                            children: "No Members Yet"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                            lineNumber: 238,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-400 text-sm",
                                            children: "Add family members to split costs"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                            lineNumber: 239,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                    lineNumber: 234,
                                    columnNumber: 19
                                }, this) : members.map((m, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all group relative overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 248,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 relative z-10 flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center text-xl font-black text-blue-500 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all shadow-md border border-blue-100",
                                                        children: m.name.charAt(0).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 251,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-bold text-slate-700 text-base truncate",
                                                                children: m.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 255,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500 font-medium truncate flex items-center gap-2",
                                                                children: m.email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "📧"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 259,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: m.email
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 260,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true) : m.phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "📱"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 264,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: m.phone
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                            lineNumber: 265,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: "No Contact"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                    lineNumber: 268,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                                lineNumber: 256,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 254,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 250,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right border-l border-slate-100 pl-6 ml-4 relative z-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-black text-slate-800 leading-none",
                                                        children: [
                                                            "Rp ",
                                                            pricePerPerson.toLocaleString("id-ID")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 275,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-2 bg-emerald-50 px-3 py-1 rounded-lg inline-block",
                                                        children: "Owes You"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                        lineNumber: 278,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                                lineNumber: 274,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, m._id.toString(), true, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                        lineNumber: 243,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                lineNumber: 232,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                        lineNumber: 216,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
            lineNumber: 45,
            columnNumber: 7
        }, this);
    } catch (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center bg-white p-16 rounded-[3rem] shadow-2xl border border-slate-100 max-w-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-6xl",
                            children: "⚠️"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-slate-800 mb-4",
                        children: "Subscription Not Found"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 mb-8 font-medium text-sm",
                        children: "This subscription may have been deleted or doesn't exist."
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard",
                        className: "inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-xl shadow-blue-200 transition-all active:scale-95",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Return to Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
                lineNumber: 294,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js",
            lineNumber: 293,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/app/dashboard/[id]/page.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b2529b79._.js.map