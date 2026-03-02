module.exports = [
"[externals]/node:async_hooks [external] (node:async_hooks, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/[externals]_node:async_hooks_b485b2a4._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/node:async_hooks [external] (node:async_hooks, cjs)");
    });
});
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ulid/dist/index.esm.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/f06ff_ulid_dist_index_esm_598a67f9.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ulid/dist/index.esm.js [app-route] (ecmascript)");
    });
});
}),
"[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)");
    });
});
}),
];