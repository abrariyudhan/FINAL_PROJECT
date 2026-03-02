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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/bcrypt.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "comparePassword",
    ()=>comparePassword,
    "hashPassword",
    ()=>hashPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
;
function hashPassword(password) {
    const salt = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].genSaltSync(10);
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hashSync(password, salt);
}
function comparePassword(password, hashedPassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compareSync(password, hashedPassword);
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/User.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$bcrypt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/bcrypt.js [app-rsc] (ecmascript)");
;
;
class User {
    static async getCollection() {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection("users");
    }
    static async register({ fullname, username, email, password, phoneNumber }) {
        const collection = await this.getCollection();
        // Validasi tidak boleh kosong
        if (!fullname || !fullname.trim()) {
            throw new Error("Full name is required");
        }
        if (!username || !username.trim()) {
            throw new Error("Username is required");
        }
        if (!email || !email.trim()) {
            throw new Error("Email is required");
        }
        if (!password || password.length < 5) {
            throw new Error("Password must be at least 5 characters");
        }
        if (!phoneNumber || !phoneNumber.trim()) {
            throw new Error("Phone number is required");
        }
        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
        // Cek unique username
        const existingUsername = await collection.findOne({
            username: username.trim().toLowerCase()
        });
        if (existingUsername) {
            throw new Error("Username already exists");
        }
        // Cek unique email
        const existingEmail = await collection.findOne({
            email: email.trim().toLowerCase()
        });
        if (existingEmail) {
            throw new Error("Email already exists");
        }
        const hashedPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$bcrypt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashPassword"])(password);
        const result = await collection.insertOne({
            fullname: fullname.trim(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            phoneNumber: phoneNumber.trim(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return result;
    }
    static async findByEmail(email) {
        const collection = await this.getCollection();
        return collection.findOne({
            email: email.trim().toLowerCase()
        });
    }
    static async getUserById(id) {
        const { ObjectId } = await __turbopack_context__.A("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb, async loader)");
        const collection = await this.getCollection();
        return collection.findOne({
            _id: new ObjectId(id)
        });
    }
    static async findOrCreateGoogleUser({ name, email, avatar }) {
        const collection = await this.getCollection();
        let user = await collection.findOne({
            email: email.trim().toLowerCase()
        });
        if (!user) {
            // Generate username dari email (sebelum @)
            let baseUsername = email.split("@")[0].toLowerCase();
            let username = baseUsername;
            let counter = 1;
            while(await collection.findOne({
                username
            })){
                username = `${baseUsername}${counter}`;
                counter++;
            }
            const result = await collection.insertOne({
                fullname: name,
                username: username,
                email: email.trim().toLowerCase(),
                password: null,
                phoneNumber: null,
                avatar: avatar || null,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            user = {
                _id: result.insertedId,
                fullname: name,
                username,
                email: email.trim().toLowerCase()
            };
        }
        return user;
    }
}
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/jwt.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signToken",
    ()=>signToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/index.js [app-rsc] (ecmascript)");
;
const SECRET_KEY = process.env.SECRET_KEY || "kukukakikukaku";
function signToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].sign(payload, SECRET_KEY);
}
function verifyToken(token) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].verify(token, SECRET_KEY);
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0008bc02f888225a6d5ff93a8cb081943e792f754a":"logoutUser","00f61449bfa800080fb378de5109477d69053c6a1f":"getCurrentUser","402065b2e3175b3d7d8d533f85db7dc7e92c1d1e5e":"registerUser","4031928dabbc792460afd70ee112d9aa4bfaaea396":"loginUser"},"",""] */ __turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$User$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/User.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$bcrypt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/bcrypt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function registerUser({ fullname, username, email, password, phoneNumber }) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$User$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].register({
            fullname,
            username,
            email,
            password,
            phoneNumber
        });
        return {
            success: true,
            message: "Registration successful! Please login."
        };
    } catch (error) {
        return {
            error: error.message || "Registration failed"
        };
    }
}
async function loginUser({ email, password }) {
    try {
        if (!email || !email.trim()) {
            throw new Error("Email is required");
        }
        if (!password || password.length < 5) {
            throw new Error("Password must be at least 5 characters");
        }
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$User$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        if (!user.password) {
            throw new Error("This account uses Google login. Please sign in with Google.");
        }
        const isValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$bcrypt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["comparePassword"])(password, user.password);
        if (!isValid) {
            throw new Error("Invalid email or password");
        }
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signToken"])({
            userId: user._id.toString(),
            email: user.email,
            fullname: user.fullname
        });
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        cookieStore.set("access_token", token, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message || "Login failed"
        };
    }
}
async function logoutUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete("access_token");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/");
}
async function getCurrentUser() {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get("access_token");
        if (!token) return null;
        const { verifyToken } = await __turbopack_context__.A("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/jwt.js [app-rsc] (ecmascript, async loader)");
        const decoded = verifyToken(token.value);
        return decoded;
    } catch  {
        return null;
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerUser, "402065b2e3175b3d7d8d533f85db7dc7e92c1d1e5e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginUser, "4031928dabbc792460afd70ee112d9aa4bfaaea396", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutUser, "0008bc02f888225a6d5ff93a8cb081943e792f754a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCurrentUser, "00f61449bfa800080fb378de5109477d69053c6a1f", null);
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
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/GroupRequest.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GroupRequest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/customErrors.js [app-rsc] (ecmascript)");
;
;
;
class GroupRequest {
    static async getCollection() {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection("groupRequests");
    }
    // Ambil semua GroupRequest yang masih open (untuk halaman browse)
    static async getAllOpen() {
        const collection = await this.getCollection();
        return await collection.find({
            status: "open"
        }).toArray();
    }
    // Ambil semua GroupRequest (semua status: open, full, closed) — untuk explore
    static async getAll() {
        const collection = await this.getCollection();
        return await collection.find({}).sort({
            createdAt: -1
        }).toArray();
    }
    // Ambil semua GroupRequest milik owner tertentu
    static async getByOwnerId(ownerId) {
        const collection = await this.getCollection();
        return await collection.find({
            ownerId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](ownerId)
        }).sort({
            createdAt: -1
        }).toArray();
    }
    // Ambil satu GroupRequest by ID
    static async getById(id) {
        if (!id || id.length !== 24) throw new Error("Invalid GroupRequest ID");
        const collection = await this.getCollection();
        const result = await collection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        });
        if (!result) throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("GroupRequest not found");
        return result;
    }
    // Buat GroupRequest baru
    static async create(data) {
        const collection = await this.getCollection();
        return await collection.insertOne({
            ownerId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](data.ownerId),
            serviceId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](data.serviceId),
            title: data.title,
            description: data.description || "",
            maxSlot: Number(data.maxSlot),
            availableSlot: Number(data.maxSlot),
            status: "open",
            createdAt: new Date()
        });
    }
    // Update availableSlot (kurangi 1 saat ada member yang approved)
    static async decrementSlot(id) {
        const collection = await this.getCollection();
        const groupRequest = await this.getById(id);
        const newSlot = groupRequest.availableSlot - 1;
        const newStatus = newSlot <= 0 ? "full" : "open";
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        }, {
            $set: {
                availableSlot: newSlot,
                status: newStatus
            }
        });
    }
    // Tutup GroupRequest secara manual oleh owner
    static async close(id, ownerId) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id),
            ownerId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](ownerId)
        }, {
            $set: {
                status: "closed"
            }
        });
    }
    // Hapus GroupRequest
    static async delete(id, ownerId) {
        const collection = await this.getCollection();
        return await collection.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id),
            ownerId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](ownerId)
        });
    }
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/MemberRequest.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MemberRequest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/helpers/customErrors.js [app-rsc] (ecmascript)");
;
;
;
class MemberRequest {
    static async getCollection() {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$config$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection("memberRequests");
    }
    // Ambil semua request masuk untuk GroupRequest tertentu (untuk owner)
    static async getByGroupRequestId(groupRequestId) {
        const collection = await this.getCollection();
        return await collection.find({
            groupRequestId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](groupRequestId)
        }).sort({
            createdAt: -1
        }).toArray();
    }
    // Ambil semua request yang pernah dikirim user tertentu (untuk user melihat status requestnya)
    static async getByUserId(userId) {
        const collection = await this.getCollection();
        return await collection.find({
            userId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](userId)
        }).sort({
            createdAt: -1
        }).toArray();
    }
    // Cek apakah user sudah pernah request ke GroupRequest yang sama
    static async findExisting(userId, groupRequestId) {
        const collection = await this.getCollection();
        return await collection.findOne({
            userId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](userId),
            groupRequestId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](groupRequestId)
        });
    }
    // Buat MemberRequest baru
    static async create(data) {
        const collection = await this.getCollection();
        return await collection.insertOne({
            userId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](data.userId),
            groupRequestId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](data.groupRequestId),
            status: "pending",
            createdAt: new Date()
        });
    }
    // Update status (approve atau reject) — hanya bisa dilakukan owner
    static async updateStatus(id, status) {
        const collection = await this.getCollection();
        return await collection.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        }, {
            $set: {
                status,
                updatedAt: new Date()
            }
        });
    }
    // Ambil satu MemberRequest by ID (untuk keperluan approve, cek data user-nya)
    static async getById(id) {
        if (!id || id.length !== 24) throw new Error("Invalid MemberRequest ID");
        const collection = await this.getCollection();
        const result = await collection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$mongodb$29$__["ObjectId"](id)
        });
        if (!result) throw new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$helpers$2f$customErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFound"]("MemberRequest not found");
        return result;
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
            groupRequestId: data.groupRequestId || null,
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
    // Get all conversations with populated participant details (names, avatars)
    static async getAllWithParticipants(userId = null) {
        const collection = await this.getCollection();
        // Build match filter - if userId provided, only get chats where user is participant
        const matchStage = userId ? {
            participants: userId
        } : {};
        return await collection.aggregate([
            {
                $match: matchStage
            },
            {
                $addFields: {
                    // Convert participant strings to ObjectIds for lookup
                    participantIds: {
                        $map: {
                            input: "$participants",
                            as: "participantId",
                            in: {
                                $toObjectId: "$$participantId"
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "participantIds",
                    foreignField: "_id",
                    as: "participantDetails"
                }
            },
            {
                $addFields: {
                    // Convert groupId string to ObjectId if exists
                    groupObjectId: {
                        $cond: {
                            if: {
                                $ne: [
                                    "$groupId",
                                    null
                                ]
                            },
                            then: {
                                $toObjectId: "$groupId"
                            },
                            else: null
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "groups",
                    localField: "groupObjectId",
                    foreignField: "_id",
                    as: "groupDetails"
                }
            },
            {
                $project: {
                    participants: 1,
                    type: 1,
                    groupId: 1,
                    messages: 1,
                    lastMessage: 1,
                    unreadCount: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    // Only return necessary user fields: fullname, username, avatar
                    participantDetails: {
                        $map: {
                            input: "$participantDetails",
                            as: "user",
                            in: {
                                _id: "$$user._id",
                                fullname: "$$user.fullname",
                                username: "$$user.username",
                                avatar: "$$user.avatar"
                            }
                        }
                    },
                    // Get group name if it's a group chat
                    groupName: {
                        $arrayElemAt: [
                            "$groupDetails.name",
                            0
                        ]
                    }
                }
            },
            {
                // Sort: chats with messages first (by timestamp), then new chats by createdAt
                $sort: {
                    "lastMessage.timestamp": -1,
                    createdAt: -1
                }
            }
        ]).toArray();
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
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/groupRequest.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4053ec0a1314899c2feea337d202c96a04df8ea03b":"rejectMemberRequest","40809777f9f03ec9ba8b0a18e79165a14f41a7be53":"closeGroupRequest","408c876aa042ef1ae73b8950537177a8a0fb7653cf":"deleteGroupRequest","408e5d04791ac596934754fe4965eb50d907c304cc":"createGroupRequest","4098658ff9c5663c2ff0cbcfe7f48cc045246afa8a":"sendMemberRequest","409da26cd467fc50847550ddf8bd9fcc895e634b12":"approveMemberRequest"},"",""] */ __turbopack_context__.s([
    "approveMemberRequest",
    ()=>approveMemberRequest,
    "closeGroupRequest",
    ()=>closeGroupRequest,
    "createGroupRequest",
    ()=>createGroupRequest,
    "deleteGroupRequest",
    ()=>deleteGroupRequest,
    "rejectMemberRequest",
    ()=>rejectMemberRequest,
    "sendMemberRequest",
    ()=>sendMemberRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/GroupRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/MemberRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Member$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Member.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Group.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/models/Chat.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
async function createGroupRequest(formData) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user) return {
            error: "Unauthorized"
        };
        const serviceId = formData.get("serviceId");
        const title = formData.get("title");
        const description = formData.get("description");
        const maxSlot = formData.get("maxSlot");
        const subscriptionId = formData.get("subscriptionId");
        if (!serviceId || !title || !maxSlot) {
            return {
                error: "ServiceId, title, and maxSlot are required"
            };
        }
        if (Number(maxSlot) < 1 || Number(maxSlot) > 20) {
            return {
                error: "Max slot must be between 1 and 20"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            ownerId: user.userId,
            serviceId,
            subscriptionId,
            title,
            description,
            maxSlot
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/group-requests");
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message || "Failed to create group request"
        };
    }
}
async function closeGroupRequest(groupRequestId) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user) return {
            error: "Unauthorized"
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].close(groupRequestId, user.userId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/group-requests");
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message || "Failed to close group request"
        };
    }
}
async function deleteGroupRequest(groupRequestId) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user) return {
            error: "Unauthorized"
        };
        // Pastikan GroupRequest milik user ini
        const groupReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(groupRequestId);
        if (groupReq.ownerId.toString() !== user.userId) {
            return {
                error: "You are not authorized to delete this group request"
            };
        }
        const { getDb } = await __turbopack_context__.A("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript, async loader)");
        const { ObjectId } = await __turbopack_context__.A("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb, async loader)");
        const db = await getDb();
        // 1. Hapus semua MemberRequest yang terkait
        await db.collection("memberRequests").deleteMany({
            groupRequestId: new ObjectId(groupRequestId)
        });
        // 2. Hapus semua Member yang terkait
        await db.collection("members").deleteMany({
            groupRequestId: groupRequestId
        });
        // 3. Hapus GroupRequest-nya
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].delete(groupRequestId, user.userId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/group-requests");
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message || "Failed to delete group request"
        };
    }
}
async function sendMemberRequest(groupRequestId) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user) return {
            error: "Unauthorized"
        };
        // Cek apakah sudah pernah request sebelumnya
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findExisting(user.userId, groupRequestId);
        if (existing) {
            if (existing.status === "pending") return {
                error: "You already have a pending request"
            };
            if (existing.status === "approved") return {
                error: "You are already a member"
            };
            // Kalau rejected, boleh request ulang — update status ke pending lagi
            await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].updateStatus(existing._id.toString(), "pending");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/explore");
            return {
                success: true
            };
        }
        // Cek apakah GroupRequest masih open dan ada slot
        const groupReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(groupRequestId);
        if (groupReq.status !== "open") {
            return {
                error: "This group is no longer accepting requests"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            userId: user.userId,
            groupRequestId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/explore");
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message || "Failed to send request"
        };
    }
}
// ============================================================
// APPROVE / REJECT ACTIONS (Owner)
// ============================================================
// Buat Group dan Chat otomatis saat GroupRequest penuh
async function createGroupFromRequest(groupRequestId) {
    try {
        const groupReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(groupRequestId);
        // Ambil semua members yang sudah approved
        const members = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Member$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getByGroupRequestId(groupRequestId);
        const memberIds = members.map((m)=>m.userId.toString());
        // Include owner juga sebagai member
        const ownerIdString = groupReq.ownerId.toString();
        if (!memberIds.includes(ownerIdString)) {
            memberIds.push(ownerIdString);
        }
        // Create Group
        const groupResult = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Group$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            name: groupReq.title,
            description: groupReq.description || `Group for ${groupReq.title}`,
            members: memberIds,
            groupRequestId: groupRequestId
        });
        const groupId = groupResult.insertedId.toString();
        // Create Chat untuk group
        const chatResult = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Chat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            participants: memberIds,
            type: "group",
            groupId: groupId
        });
        return {
            success: true,
            groupId
        };
    } catch (error) {
        console.error("Error creating group:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function approveMemberRequest(memberRequestId) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user) return {
            error: "Unauthorized"
        };
        const memberReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(memberRequestId);
        const groupReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(memberReq.groupRequestId.toString());
        if (groupReq.ownerId.toString() !== user.userId) {
            return {
                error: "You are not authorized to approve this request"
            };
        }
        if (memberReq.status !== "pending") {
            return {
                error: "This request has already been processed"
            };
        }
        if (groupReq.availableSlot <= 0) {
            return {
                error: "No available slots"
            };
        }
        const { getDb } = await __turbopack_context__.A("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/server/config/mongodb.js [app-rsc] (ecmascript, async loader)");
        const { ObjectId } = await __turbopack_context__.A("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb, async loader)");
        const db = await getDb();
        const requestUser = await db.collection("users").findOne({
            _id: new ObjectId(memberReq.userId.toString())
        });
        // 1. Update status → approved
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].updateStatus(memberRequestId, "approved");
        // 2. Kurangi slot
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].decrementSlot(memberReq.groupRequestId.toString());
        // 3. Buat Member baru dengan groupRequestId untuk tracking
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$Member$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            subscriptionId: groupReq.subscriptionId?.toString() || groupReq._id.toString(),
            userId: memberReq.userId.toString(),
            groupRequestId: memberReq.groupRequestId.toString(),
            name: requestUser?.fullname || requestUser?.username || "Unknown",
            email: requestUser?.email || "",
            phone: requestUser?.phoneNumber || ""
        });
        // 4. Cek jika GroupRequest sudah full, create Group & Chat otomatis
        const updatedGroupReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(memberReq.groupRequestId.toString());
        if (updatedGroupReq.status === "full") {
            await createGroupFromRequest(memberReq.groupRequestId.toString());
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/group-requests/${memberReq.groupRequestId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/chat");
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message || "Failed to approve request"
        };
    }
}
async function rejectMemberRequest(memberRequestId) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user) return {
            error: "Unauthorized"
        };
        const memberReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(memberRequestId);
        const groupReq = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$GroupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getById(memberReq.groupRequestId.toString());
        if (groupReq.ownerId.toString() !== user.userId) {
            return {
                error: "You are not authorized to reject this request"
            };
        }
        if (memberReq.status !== "pending") {
            return {
                error: "This request has already been processed"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$server$2f$models$2f$MemberRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].updateStatus(memberRequestId, "rejected");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/group-requests/${memberReq.groupRequestId}`);
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message || "Failed to reject request"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createGroupRequest,
    closeGroupRequest,
    deleteGroupRequest,
    sendMemberRequest,
    approveMemberRequest,
    rejectMemberRequest
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createGroupRequest, "408e5d04791ac596934754fe4965eb50d907c304cc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(closeGroupRequest, "40809777f9f03ec9ba8b0a18e79165a14f41a7be53", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteGroupRequest, "408c876aa042ef1ae73b8950537177a8a0fb7653cf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendMemberRequest, "4098658ff9c5663c2ff0cbcfe7f48cc045246afa8a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(approveMemberRequest, "409da26cd467fc50847550ddf8bd9fcc895e634b12", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rejectMemberRequest, "4053ec0a1314899c2feea337d202c96a04df8ea03b", null);
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/.next-internal/server/app/dashboard/group-requests/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/groupRequest.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$groupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/groupRequest.js [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/.next-internal/server/app/dashboard/group-requests/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/groupRequest.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0008bc02f888225a6d5ff93a8cb081943e792f754a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutUser"],
    "00f61449bfa800080fb378de5109477d69053c6a1f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"],
    "402065b2e3175b3d7d8d533f85db7dc7e92c1d1e5e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerUser"],
    "4031928dabbc792460afd70ee112d9aa4bfaaea396",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginUser"],
    "408e5d04791ac596934754fe4965eb50d907c304cc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$groupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGroupRequest"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$group$2d$requests$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$groupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/.next-internal/server/app/dashboard/group-requests/create/page/actions.js { ACTIONS_MODULE0 => "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/groupRequest.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$groupRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/groupRequest.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f01936ee._.js.map