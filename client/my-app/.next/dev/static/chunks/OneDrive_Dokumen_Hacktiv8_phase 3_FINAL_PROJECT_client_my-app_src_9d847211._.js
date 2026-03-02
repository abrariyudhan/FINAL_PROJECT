(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/subscription.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/subscription.js'\n\nExpected a semicolon");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddSubscriptionForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$subscription$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/subscription.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AddSubscriptionForm(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(162);
    if ($[0] !== "65642d08ee58de7ff14c8a54b9118762a72942f15681e89e76bb9e38fc066e6a") {
        for(let $i = 0; $i < 162; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "65642d08ee58de7ff14c8a54b9118762a72942f15681e89e76bb9e38fc066e6a";
    }
    const { masterServices } = t0;
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isManualInput, setIsManualInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedServiceName, setSelectedServiceName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Entertainment");
    const [currentLogo, setCurrentLogo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [subType, setSubType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Individual");
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [members, setMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [billingDate, setBillingDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cycle, setCycle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = new Date().toISOString().split("T");
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const today = t2[0];
    let t3;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "AddSubscriptionForm[useEffect()]": ()=>{
                const handleClickOutside = {
                    "AddSubscriptionForm[useEffect() > handleClickOutside]": (event)=>{
                        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                            setIsOpen(false);
                        }
                    }
                }["AddSubscriptionForm[useEffect() > handleClickOutside]"];
                document.addEventListener("mousedown", handleClickOutside);
                return ()=>document.removeEventListener("mousedown", handleClickOutside);
            }
        })["AddSubscriptionForm[useEffect()]"];
        t4 = [];
        $[3] = t3;
        $[4] = t4;
    } else {
        t3 = $[3];
        t4 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "AddSubscriptionForm[handleSelectService]": (svc)=>{
                setIsManualInput(false);
                setSelectedServiceName(svc.serviceName);
                setCategory(svc.category || "Entertainment");
                setCurrentLogo(svc.logo || "");
                setIsOpen(false);
            }
        })["AddSubscriptionForm[handleSelectService]"];
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    const handleSelectService = t5;
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "AddSubscriptionForm[handleManualOption]": ()=>{
                setIsManualInput(true);
                setSelectedServiceName("");
                setCategory("Other");
                setCurrentLogo("");
                setIsOpen(false);
            }
        })["AddSubscriptionForm[handleManualOption]"];
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    const handleManualOption = t6;
    let t7;
    if ($[7] !== members) {
        t7 = ({
            "AddSubscriptionForm[addMemberField]": ()=>setMembers([
                    ...members,
                    {
                        id: Date.now()
                    }
                ])
        })["AddSubscriptionForm[addMemberField]"];
        $[7] = members;
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    const addMemberField = t7;
    let t8;
    if ($[9] !== members) {
        t8 = ({
            "AddSubscriptionForm[removeMemberField]": (id)=>setMembers(members.filter({
                    "AddSubscriptionForm[removeMemberField > members.filter()]": (m)=>m.id !== id
                }["AddSubscriptionForm[removeMemberField > members.filter()]"]))
        })["AddSubscriptionForm[removeMemberField]"];
        $[9] = members;
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    const removeMemberField = t8;
    const totalOrang = 1 + members.length;
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t15;
    let t16;
    let t17;
    let t18;
    let t19;
    let t20;
    let t21;
    let t22;
    let t23;
    let t9;
    if ($[11] !== addMemberField || $[12] !== billingDate || $[13] !== category || $[14] !== currentLogo || $[15] !== cycle || $[16] !== isManualInput || $[17] !== isOpen || $[18] !== masterServices || $[19] !== members || $[20] !== price || $[21] !== removeMemberField || $[22] !== selectedServiceName || $[23] !== subType || $[24] !== totalOrang) {
        const pricePerPerson = price > 0 ? Math.round(price / totalOrang) : 0;
        const monthlyEquivalent = Math.round(pricePerPerson / cycle);
        t23 = "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900";
        t21 = "max-w-6xl mx-auto";
        let t24;
        if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
            t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/dashboard",
                className: "group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl group-hover:-translate-x-1 transition-transform",
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 149,
                        columnNumber: 139
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold uppercase tracking-wider",
                        children: "Back to Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 149,
                        columnNumber: 221
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 149,
                columnNumber: 13
            }, this);
            $[40] = t24;
        } else {
            t24 = $[40];
        }
        let t25;
        if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
            t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl md:text-5xl font-black tracking-tight",
                children: [
                    "Add New ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
                        children: "Subscription"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 156,
                        columnNumber: 84
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 156,
                columnNumber: 13
            }, this);
            $[41] = t25;
        } else {
            t25 = $[41];
        }
        let t26;
        if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
            t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    t24,
                    t25,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 163,
                                columnNumber: 112
                            }, this),
                            "Track your subscription expenses easily"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 163,
                        columnNumber: 50
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 163,
                columnNumber: 13
            }, this);
            $[42] = t26;
        } else {
            t26 = $[42];
        }
        let t27;
        if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
            t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block text-xs font-bold text-slate-500 mb-1",
                children: "Your Share"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 170,
                columnNumber: 13
            }, this);
            $[43] = t27;
        } else {
            t27 = $[43];
        }
        const t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gradient-to-br from-blue-50 to-cyan-50 px-8 py-5 rounded-3xl border border-blue-100 shadow-lg",
            children: [
                t27,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
                    children: [
                        "Rp ",
                        pricePerPerson.toLocaleString("id-ID")
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                    lineNumber: 175,
                    columnNumber: 136
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 175,
            columnNumber: 17
        }, this);
        if ($[44] !== t28) {
            t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-12 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50 border border-blue-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row md:items-center justify-between gap-6",
                    children: [
                        t26,
                        t28
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                    lineNumber: 177,
                    columnNumber: 120
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 177,
                columnNumber: 13
            }, this);
            $[44] = t28;
            $[45] = t22;
        } else {
            t22 = $[45];
        }
        t18 = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$subscription$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFullSubscription"];
        t19 = "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start";
        let t29;
        if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
            t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg",
                        children: "🎯"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 187,
                        columnNumber: 59
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-black text-slate-800",
                        children: "Service Details"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 187,
                        columnNumber: 211
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 187,
                columnNumber: 13
            }, this);
            $[46] = t29;
        } else {
            t29 = $[46];
        }
        let t30;
        if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
            t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-xs font-bold text-slate-600 mb-2 ml-1",
                children: "Service Name"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 194,
                columnNumber: 13
            }, this);
            $[47] = t30;
        } else {
            t30 = $[47];
        }
        let t31;
        if ($[48] !== currentLogo || $[49] !== isManualInput || $[50] !== isOpen || $[51] !== selectedServiceName) {
            t31 = isManualInput ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "serviceName",
                        value: selectedServiceName,
                        onChange: {
                            "AddSubscriptionForm[<input>.onChange]": (e)=>setSelectedServiceName(e.target.value)
                        }["AddSubscriptionForm[<input>.onChange]"],
                        placeholder: "Type service name...",
                        className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                        required: true,
                        autoFocus: true
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 201,
                        columnNumber: 79
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "AddSubscriptionForm[<button>.onClick]": ()=>setIsManualInput(false)
                        }["AddSubscriptionForm[<button>.onClick]"],
                        className: "px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl text-sm font-bold text-slate-600 transition-all shadow-sm",
                        children: "↺"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 203,
                        columnNumber: 412
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 201,
                columnNumber: 29
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "hidden",
                        name: "serviceName",
                        value: selectedServiceName,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 205,
                        columnNumber: 198
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: {
                            "AddSubscriptionForm[<div>.onClick]": ()=>setIsOpen(!isOpen)
                        }["AddSubscriptionForm[<div>.onClick]"],
                        className: "w-full flex items-center gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-14 h-14 rounded-xl flex items-center justify-center font-black shadow-md ${currentLogo ? "bg-white" : "bg-white/50"}`,
                                children: currentLogo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: currentLogo,
                                    className: "w-10 h-10 object-contain",
                                    alt: "logo"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 207,
                                    columnNumber: 403
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl text-slate-300",
                                    children: "?"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 207,
                                    columnNumber: 479
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 207,
                                columnNumber: 250
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-xl font-bold block ${selectedServiceName ? "text-slate-900" : "text-slate-400"}`,
                                        children: selectedServiceName || "Select a service..."
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                        lineNumber: 207,
                                        columnNumber: 560
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500",
                                        children: "Click to choose from library"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                        lineNumber: 207,
                                        columnNumber: 718
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 207,
                                columnNumber: 536
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-2xl transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : "text-slate-400"}`,
                                children: "▼"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 207,
                                columnNumber: 800
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 205,
                        columnNumber: 284
                    }, this)
                ]
            }, void 0, true);
            $[48] = currentLogo;
            $[49] = isManualInput;
            $[50] = isOpen;
            $[51] = selectedServiceName;
            $[52] = t31;
        } else {
            t31 = $[52];
        }
        let t32;
        if ($[53] !== isOpen || $[54] !== masterServices) {
            t32 = isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 w-full mt-3 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-96 overflow-y-auto p-3",
                    children: [
                        masterServices.map({
                            "AddSubscriptionForm[masterServices.map()]": (svc_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: {
                                        "AddSubscriptionForm[masterServices.map() > <div>.onClick]": ()=>handleSelectService(svc_0)
                                    }["AddSubscriptionForm[masterServices.map() > <div>.onClick]"],
                                    className: "flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-2xl cursor-pointer transition-all group border border-transparent hover:border-blue-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: svc_0.logo,
                                                className: "w-8 h-8 object-contain",
                                                alt: svc_0.serviceName
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                                lineNumber: 221,
                                                columnNumber: 402
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 221,
                                            columnNumber: 272
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-slate-700 group-hover:text-blue-600 transition-colors",
                                                    children: svc_0.serviceName
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                                    lineNumber: 221,
                                                    columnNumber: 515
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xs text-slate-400",
                                                    children: svc_0.category
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                                    lineNumber: 221,
                                                    columnNumber: 628
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 221,
                                            columnNumber: 491
                                        }, this)
                                    ]
                                }, svc_0._id, true, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 219,
                                    columnNumber: 67
                                }, this)
                        }["AddSubscriptionForm[masterServices.map()]"]),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: handleManualOption,
                            className: "flex items-center gap-4 p-4 mt-2 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-2xl cursor-pointer transition-all border-2 border-dashed border-slate-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 flex items-center justify-center border-2 border-dashed border-slate-400 rounded-xl font-black text-slate-400 text-xl",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 222,
                                    columnNumber: 305
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-slate-600",
                                            children: "Manual Entry"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 222,
                                            columnNumber: 462
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-xs text-slate-400",
                                            children: "Add custom service"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 222,
                                            columnNumber: 524
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 222,
                                    columnNumber: 457
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                            lineNumber: 222,
                            columnNumber: 59
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                    lineNumber: 218,
                    columnNumber: 181
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 218,
                columnNumber: 23
            }, this);
            $[53] = isOpen;
            $[54] = masterServices;
            $[55] = t32;
        } else {
            t32 = $[55];
        }
        let t33;
        if ($[56] !== t31 || $[57] !== t32) {
            t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "group relative",
                ref: dropdownRef,
                children: [
                    t30,
                    t31,
                    t32
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 231,
                columnNumber: 13
            }, this);
            $[56] = t31;
            $[57] = t32;
            $[58] = t33;
        } else {
            t33 = $[58];
        }
        let t34;
        if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
            t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-xs font-bold text-slate-600 mb-2 ml-1",
                children: "Category"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 240,
                columnNumber: 13
            }, this);
            $[59] = t34;
        } else {
            t34 = $[59];
        }
        let t35;
        if ($[60] !== category) {
            t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: "category",
                value: category
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 247,
                columnNumber: 13
            }, this);
            $[60] = category;
            $[61] = t35;
        } else {
            t35 = $[61];
        }
        let t36;
        if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
            t36 = ({
                "AddSubscriptionForm[<select>.onChange]": (e_0)=>setCategory(e_0.target.value)
            })["AddSubscriptionForm[<select>.onChange]"];
            $[62] = t36;
        } else {
            t36 = $[62];
        }
        const t37 = !isManualInput;
        let t38;
        let t39;
        let t40;
        let t41;
        let t42;
        if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
            t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "Entertainment",
                children: "🎬 Entertainment"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 269,
                columnNumber: 13
            }, this);
            t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "Music",
                children: "🎵 Music"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 270,
                columnNumber: 13
            }, this);
            t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "Work",
                children: "💼 Work"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 271,
                columnNumber: 13
            }, this);
            t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "Education",
                children: "📚 Education"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 272,
                columnNumber: 13
            }, this);
            t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "Other",
                children: "📦 Other"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 273,
                columnNumber: 13
            }, this);
            $[63] = t38;
            $[64] = t39;
            $[65] = t40;
            $[66] = t41;
            $[67] = t42;
        } else {
            t38 = $[63];
            t39 = $[64];
            t40 = $[65];
            t41 = $[66];
            t42 = $[67];
        }
        let t43;
        if ($[68] !== category || $[69] !== t37) {
            t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: category,
                onChange: t36,
                className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                disabled: t37,
                children: [
                    t38,
                    t39,
                    t40,
                    t41,
                    t42
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 288,
                columnNumber: 13
            }, this);
            $[68] = category;
            $[69] = t37;
            $[70] = t43;
        } else {
            t43 = $[70];
        }
        let t44;
        if ($[71] !== isManualInput) {
            t44 = !isManualInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-slate-400 mt-2 ml-1 italic",
                children: "Auto-filled from database"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 297,
                columnNumber: 31
            }, this);
            $[71] = isManualInput;
            $[72] = t44;
        } else {
            t44 = $[72];
        }
        let t45;
        if ($[73] !== t35 || $[74] !== t43 || $[75] !== t44) {
            t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t34,
                    t35,
                    t43,
                    t44
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 305,
                columnNumber: 13
            }, this);
            $[73] = t35;
            $[74] = t43;
            $[75] = t44;
            $[76] = t45;
        } else {
            t45 = $[76];
        }
        let t46;
        if ($[77] === Symbol.for("react.memo_cache_sentinel")) {
            t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-xs font-bold text-slate-600 mb-2 ml-1",
                children: "Billing Cycle"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 315,
                columnNumber: 13
            }, this);
            $[77] = t46;
        } else {
            t46 = $[77];
        }
        let t47;
        if ($[78] === Symbol.for("react.memo_cache_sentinel")) {
            t47 = ({
                "AddSubscriptionForm[<select>.onChange]": (e_1)=>setCycle(Number(e_1.target.value))
            })["AddSubscriptionForm[<select>.onChange]"];
            $[78] = t47;
        } else {
            t47 = $[78];
        }
        let t48;
        let t49;
        let t50;
        let t51;
        if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
            t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "1",
                children: "📅 Monthly"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 334,
                columnNumber: 13
            }, this);
            t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "3",
                children: "📅 Quarterly (3 Months)"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 335,
                columnNumber: 13
            }, this);
            t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "6",
                children: "📅 Semi-Annual (6 Months)"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 336,
                columnNumber: 13
            }, this);
            t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "12",
                children: "📅 Annual (12 Months)"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 337,
                columnNumber: 13
            }, this);
            $[79] = t48;
            $[80] = t49;
            $[81] = t50;
            $[82] = t51;
        } else {
            t48 = $[79];
            t49 = $[80];
            t50 = $[81];
            t51 = $[82];
        }
        let t52;
        if ($[83] !== cycle) {
            t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t46,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        name: "billingCycle",
                        value: cycle,
                        onChange: t47,
                        className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                        children: [
                            t48,
                            t49,
                            t50,
                            t51
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 350,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 350,
                columnNumber: 13
            }, this);
            $[83] = cycle;
            $[84] = t52;
        } else {
            t52 = $[84];
        }
        let t53;
        if ($[85] !== t45 || $[86] !== t52) {
            t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [
                    t45,
                    t52
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 358,
                columnNumber: 13
            }, this);
            $[85] = t45;
            $[86] = t52;
            $[87] = t53;
        } else {
            t53 = $[87];
        }
        let t54;
        if ($[88] !== t33 || $[89] !== t53) {
            t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6",
                children: [
                    t29,
                    t33,
                    t53
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 367,
                columnNumber: 13
            }, this);
            $[88] = t33;
            $[89] = t53;
            $[90] = t54;
        } else {
            t54 = $[90];
        }
        let t55;
        if ($[91] === Symbol.for("react.memo_cache_sentinel")) {
            t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg",
                        children: "📆"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 376,
                        columnNumber: 59
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-black text-slate-800",
                        children: "Important Dates"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 376,
                        columnNumber: 213
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 376,
                columnNumber: 13
            }, this);
            $[91] = t55;
        } else {
            t55 = $[91];
        }
        let t56;
        if ($[92] === Symbol.for("react.memo_cache_sentinel")) {
            t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-xs font-bold text-slate-600 mb-2 ml-1",
                children: "Next Billing Date"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 383,
                columnNumber: 13
            }, this);
            $[92] = t56;
        } else {
            t56 = $[92];
        }
        let t57;
        let t58;
        if ($[93] === Symbol.for("react.memo_cache_sentinel")) {
            t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t56,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "billingDate",
                        type: "date",
                        min: today,
                        onChange: {
                            "AddSubscriptionForm[<input>.onChange]": (e_2)=>setBillingDate(e_2.target.value)
                        }["AddSubscriptionForm[<input>.onChange]"],
                        className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 391,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 391,
                columnNumber: 13
            }, this);
            t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-xs font-bold text-slate-600 mb-2 ml-1",
                children: "Reminder Date"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 394,
                columnNumber: 13
            }, this);
            $[93] = t57;
            $[94] = t58;
        } else {
            t57 = $[93];
            t58 = $[94];
        }
        let t59;
        if ($[95] !== billingDate) {
            t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100",
                children: [
                    t55,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                            t57,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    t58,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        name: "reminderDate",
                                        type: "date",
                                        min: today,
                                        max: billingDate,
                                        className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                        lineNumber: 403,
                                        columnNumber: 184
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 403,
                                columnNumber: 174
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 403,
                        columnNumber: 114
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 403,
                columnNumber: 13
            }, this);
            $[95] = billingDate;
            $[96] = t59;
        } else {
            t59 = $[96];
        }
        let t60;
        if ($[97] === Symbol.for("react.memo_cache_sentinel")) {
            t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg",
                        children: "👥"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 411,
                        columnNumber: 59
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-black text-slate-800",
                        children: "Subscription Type"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 411,
                        columnNumber: 214
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 411,
                columnNumber: 13
            }, this);
            $[97] = t60;
        } else {
            t60 = $[97];
        }
        let t61;
        if ($[98] === Symbol.for("react.memo_cache_sentinel")) {
            t61 = [
                "Individual",
                "Family"
            ];
            $[98] = t61;
        } else {
            t61 = $[98];
        }
        let t62;
        let t63;
        if ($[99] !== subType) {
            t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 p-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl mb-8 border border-blue-100",
                children: t61.map({
                    "AddSubscriptionForm[(anonymous)()]": (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: {
                                "AddSubscriptionForm[(anonymous)() > <button>.onClick]": ()=>{
                                    setSubType(t);
                                    if (t === "Individual") {
                                        setMembers([]);
                                    }
                                }
                            }["AddSubscriptionForm[(anonymous)() > <button>.onClick]"],
                            className: `flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${subType === t ? "bg-white text-blue-600 shadow-lg border border-blue-100" : "text-slate-500 hover:text-slate-700"}`,
                            children: t === "Family" ? "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66 Family Sharing" : "\uD83D\uDC64 " + t
                        }, t, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                            lineNumber: 427,
                            columnNumber: 54
                        }, this)
                }["AddSubscriptionForm[(anonymous)()]"])
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 426,
                columnNumber: 13
            }, this);
            t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: "type",
                value: subType
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 436,
                columnNumber: 13
            }, this);
            $[99] = subType;
            $[100] = t62;
            $[101] = t63;
        } else {
            t62 = $[100];
            t63 = $[101];
        }
        let t64;
        if ($[102] !== addMemberField || $[103] !== members || $[104] !== removeMemberField || $[105] !== subType) {
            t64 = subType === "Family" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 animate-in fade-in slide-in-from-top-4 duration-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold text-slate-700",
                                children: "Family Members"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 446,
                                columnNumber: 167
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addMemberField,
                                className: "px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-200 active:scale-95",
                                children: "+ Add Member"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 446,
                                columnNumber: 235
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 446,
                        columnNumber: 116
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: members.map({
                            "AddSubscriptionForm[members.map()]": (m_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-10 gap-3 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 items-center shadow-sm hover:shadow-md transition-shadow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                name: "memberName[]",
                                                placeholder: "\uD83D\uDC64 Name",
                                                className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed !bg-white",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                                lineNumber: 447,
                                                columnNumber: 296
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 447,
                                            columnNumber: 265
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                name: "memberEmail[]",
                                                type: "email",
                                                placeholder: "\uD83D\uDCE7 Email",
                                                className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed !bg-white"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                                lineNumber: 447,
                                                columnNumber: 711
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 447,
                                            columnNumber: 680
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                name: "memberPhone[]",
                                                placeholder: "\uD83D\uDCF1 Phone",
                                                className: "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed !bg-white"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                                lineNumber: 447,
                                                columnNumber: 1125
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 447,
                                            columnNumber: 1094
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-1 flex justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: {
                                                    "AddSubscriptionForm[members.map() > <button>.onClick]": ()=>removeMemberField(m_0.id)
                                                }["AddSubscriptionForm[members.map() > <button>.onClick]"],
                                                className: "w-10 h-10 flex items-center justify-center bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-slate-200 hover:border-red-300",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                                lineNumber: 447,
                                                columnNumber: 1546
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                            lineNumber: 447,
                                            columnNumber: 1495
                                        }, this)
                                    ]
                                }, m_0.id, true, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 447,
                                    columnNumber: 58
                                }, this)
                        }["AddSubscriptionForm[members.map()]"])
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 446,
                        columnNumber: 534
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 446,
                columnNumber: 37
            }, this);
            $[102] = addMemberField;
            $[103] = members;
            $[104] = removeMemberField;
            $[105] = subType;
            $[106] = t64;
        } else {
            t64 = $[106];
        }
        let t65;
        if ($[107] !== t62 || $[108] !== t63 || $[109] !== t64) {
            t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100",
                children: [
                    t60,
                    t62,
                    t63,
                    t64
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 461,
                columnNumber: 13
            }, this);
            $[107] = t62;
            $[108] = t63;
            $[109] = t64;
            $[110] = t65;
        } else {
            t65 = $[110];
        }
        if ($[111] !== t54 || $[112] !== t59 || $[113] !== t65) {
            t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2 space-y-6",
                children: [
                    t54,
                    t59,
                    t65
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 470,
                columnNumber: 13
            }, this);
            $[111] = t54;
            $[112] = t59;
            $[113] = t65;
            $[114] = t20;
        } else {
            t20 = $[114];
        }
        t17 = "lg:sticky lg:top-6 space-y-6";
        t14 = "bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl border border-slate-700 relative overflow-hidden";
        if ($[115] === Symbol.for("react.memo_cache_sentinel")) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 481,
                columnNumber: 13
            }, this);
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 482,
                columnNumber: 13
            }, this);
            $[115] = t15;
            $[116] = t16;
        } else {
            t15 = $[115];
            t16 = $[116];
        }
        t12 = "relative z-10 space-y-8";
        let t66;
        if ($[117] === Symbol.for("react.memo_cache_sentinel")) {
            t66 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4",
                children: "💰 Payment Details"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 492,
                columnNumber: 13
            }, this);
            $[117] = t66;
        } else {
            t66 = $[117];
        }
        let t67;
        if ($[118] === Symbol.for("react.memo_cache_sentinel")) {
            t67 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-bold text-blue-400 uppercase tracking-wider",
                children: "Total Amount"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 499,
                columnNumber: 13
            }, this);
            $[118] = t67;
        } else {
            t67 = $[118];
        }
        let t68;
        if ($[119] === Symbol.for("react.memo_cache_sentinel")) {
            t68 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-lg font-black text-slate-500",
                children: "IDR"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 506,
                columnNumber: 13
            }, this);
            $[119] = t68;
        } else {
            t68 = $[119];
        }
        if ($[120] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t66,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            t67,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline gap-3",
                                children: [
                                    t68,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        name: "pricePaid",
                                        type: "number",
                                        min: "0",
                                        placeholder: "0",
                                        onChange: {
                                            "AddSubscriptionForm[<input>.onChange]": (e_3)=>setPrice(Math.max(0, Number(e_3.target.value)))
                                        }["AddSubscriptionForm[<input>.onChange]"],
                                        className: "bg-transparent text-5xl font-black text-white outline-none w-full tracking-tight placeholder:text-slate-700",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                        lineNumber: 512,
                                        columnNumber: 103
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                lineNumber: 512,
                                columnNumber: 55
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 512,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 512,
                columnNumber: 13
            }, this);
            $[120] = t13;
        } else {
            t13 = $[120];
        }
        t9 = "pt-6 border-t border-slate-700 space-y-4";
        let t69;
        if ($[121] === Symbol.for("react.memo_cache_sentinel")) {
            t69 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-bold text-slate-400 uppercase",
                children: "Split Between:"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 522,
                columnNumber: 13
            }, this);
            $[121] = t69;
        } else {
            t69 = $[121];
        }
        const t70 = totalOrang > 1 ? "People" : "Person";
        let t71;
        if ($[122] !== t70 || $[123] !== totalOrang) {
            t71 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-2",
                children: [
                    t69,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg font-black text-cyan-400",
                        children: [
                            totalOrang,
                            " ",
                            t70
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 530,
                        columnNumber: 74
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 530,
                columnNumber: 13
            }, this);
            $[122] = t70;
            $[123] = totalOrang;
            $[124] = t71;
        } else {
            t71 = $[124];
        }
        let t72;
        if ($[125] === Symbol.for("react.memo_cache_sentinel")) {
            t72 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-bold text-slate-400 uppercase",
                children: "Your Share:"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 539,
                columnNumber: 13
            }, this);
            $[125] = t72;
        } else {
            t72 = $[125];
        }
        const t73 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-2xl font-black text-emerald-400",
            children: [
                "Rp ",
                pricePerPerson.toLocaleString("id-ID")
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 544,
            columnNumber: 17
        }, this);
        let t74;
        if ($[126] !== t73) {
            t74 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    t72,
                    t73
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 547,
                columnNumber: 13
            }, this);
            $[126] = t73;
            $[127] = t74;
        } else {
            t74 = $[127];
        }
        if ($[128] !== t71 || $[129] !== t74) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10",
                children: [
                    t71,
                    t74
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 554,
                columnNumber: 13
            }, this);
            $[128] = t71;
            $[129] = t74;
            $[130] = t10;
        } else {
            t10 = $[130];
        }
        t11 = cycle > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold text-blue-300 uppercase",
                        children: "Monthly Equivalent:"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 561,
                        columnNumber: 149
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg font-black text-blue-400",
                        children: [
                            "Rp ",
                            monthlyEquivalent.toLocaleString("id-ID")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                        lineNumber: 561,
                        columnNumber: 235
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 561,
                columnNumber: 98
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 561,
            columnNumber: 24
        }, this);
        $[11] = addMemberField;
        $[12] = billingDate;
        $[13] = category;
        $[14] = currentLogo;
        $[15] = cycle;
        $[16] = isManualInput;
        $[17] = isOpen;
        $[18] = masterServices;
        $[19] = members;
        $[20] = price;
        $[21] = removeMemberField;
        $[22] = selectedServiceName;
        $[23] = subType;
        $[24] = totalOrang;
        $[25] = t10;
        $[26] = t11;
        $[27] = t12;
        $[28] = t13;
        $[29] = t14;
        $[30] = t15;
        $[31] = t16;
        $[32] = t17;
        $[33] = t18;
        $[34] = t19;
        $[35] = t20;
        $[36] = t21;
        $[37] = t22;
        $[38] = t23;
        $[39] = t9;
    } else {
        t10 = $[25];
        t11 = $[26];
        t12 = $[27];
        t13 = $[28];
        t14 = $[29];
        t15 = $[30];
        t16 = $[31];
        t17 = $[32];
        t18 = $[33];
        t19 = $[34];
        t20 = $[35];
        t21 = $[36];
        t22 = $[37];
        t23 = $[38];
        t9 = $[39];
    }
    let t24;
    if ($[131] !== t10 || $[132] !== t11 || $[133] !== t9) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t9,
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 610,
            columnNumber: 11
        }, this);
        $[131] = t10;
        $[132] = t11;
        $[133] = t9;
        $[134] = t24;
    } else {
        t24 = $[134];
    }
    let t25;
    if ($[135] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            name: "isReminderActive",
            defaultChecked: true,
            className: "w-5 h-5 text-blue-500 rounded-lg bg-slate-700 border-slate-600 focus:ring-2 focus:ring-blue-500"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 620,
            columnNumber: 11
        }, this);
        $[135] = t25;
    } else {
        t25 = $[135];
    }
    let t26;
    if ($[136] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pt-6 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all group",
                    children: [
                        t25,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-bold text-white group-hover:text-blue-300 transition-colors",
                                    children: "Smart Reminder"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 627,
                                    columnNumber: 219
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block text-xs text-slate-400",
                                    children: "Get notified before due date"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                                    lineNumber: 627,
                                    columnNumber: 331
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                            lineNumber: 627,
                            columnNumber: 195
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl",
                            children: "🔔"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                            lineNumber: 627,
                            columnNumber: 419
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                    lineNumber: 627,
                    columnNumber: 43
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-blue-500/20 active:scale-95 hover:shadow-2xl",
                    children: "💾 Save Subscription"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                    lineNumber: 627,
                    columnNumber: 462
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 627,
            columnNumber: 11
        }, this);
        $[136] = t26;
    } else {
        t26 = $[136];
    }
    let t27;
    if ($[137] !== t12 || $[138] !== t13 || $[139] !== t24) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t12,
            children: [
                t13,
                t24,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 634,
            columnNumber: 11
        }, this);
        $[137] = t12;
        $[138] = t13;
        $[139] = t24;
        $[140] = t27;
    } else {
        t27 = $[140];
    }
    let t28;
    if ($[141] !== t14 || $[142] !== t15 || $[143] !== t16 || $[144] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t14,
            children: [
                t15,
                t16,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 644,
            columnNumber: 11
        }, this);
        $[141] = t14;
        $[142] = t15;
        $[143] = t16;
        $[144] = t27;
        $[145] = t28;
    } else {
        t28 = $[145];
    }
    let t29;
    if ($[146] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-3xl shadow-lg border border-slate-100 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-semibold text-slate-500 leading-relaxed",
                children: "✨ This subscription will be added to your dashboard for easy tracking"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
                lineNumber: 655,
                columnNumber: 99
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 655,
            columnNumber: 11
        }, this);
        $[146] = t29;
    } else {
        t29 = $[146];
    }
    let t30;
    if ($[147] !== t17 || $[148] !== t28) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t17,
            children: [
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 662,
            columnNumber: 11
        }, this);
        $[147] = t17;
        $[148] = t28;
        $[149] = t30;
    } else {
        t30 = $[149];
    }
    let t31;
    if ($[150] !== t18 || $[151] !== t19 || $[152] !== t20 || $[153] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            action: t18,
            className: t19,
            children: [
                t20,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 671,
            columnNumber: 11
        }, this);
        $[150] = t18;
        $[151] = t19;
        $[152] = t20;
        $[153] = t30;
        $[154] = t31;
    } else {
        t31 = $[154];
    }
    let t32;
    if ($[155] !== t21 || $[156] !== t22 || $[157] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t21,
            children: [
                t22,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 682,
            columnNumber: 11
        }, this);
        $[155] = t21;
        $[156] = t22;
        $[157] = t31;
        $[158] = t32;
    } else {
        t32 = $[158];
    }
    let t33;
    if ($[159] !== t23 || $[160] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t23,
            children: t32
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/AddForm.js",
            lineNumber: 692,
            columnNumber: 11
        }, this);
        $[159] = t23;
        $[160] = t32;
        $[161] = t33;
    } else {
        t33 = $[161];
    }
    return t33;
}
_s(AddSubscriptionForm, "jry+C5B9UmvY/xHouAIBncxAK0c=");
_c = AddSubscriptionForm;
var _c;
__turbopack_context__.k.register(_c, "AddSubscriptionForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Dokumen_Hacktiv8_phase%203_FINAL_PROJECT_client_my-app_src_9d847211._.js.map