(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/data:578422 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendMemberRequest",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"4098658ff9c5663c2ff0cbcfe7f48cc045246afa8a":"sendMemberRequest"},"OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/groupRequest.js",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4098658ff9c5663c2ff0cbcfe7f48cc045246afa8a", __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "sendMemberRequest");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZ3JvdXBSZXF1ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5cclxuaW1wb3J0IEdyb3VwUmVxdWVzdCBmcm9tIFwiQC9zZXJ2ZXIvbW9kZWxzL0dyb3VwUmVxdWVzdFwiO1xyXG5pbXBvcnQgTWVtYmVyUmVxdWVzdCBmcm9tIFwiQC9zZXJ2ZXIvbW9kZWxzL01lbWJlclJlcXVlc3RcIjtcclxuaW1wb3J0IE1lbWJlciBmcm9tIFwiQC9zZXJ2ZXIvbW9kZWxzL01lbWJlclwiO1xyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIkAvc2VydmVyL21vZGVscy9Hcm91cFwiO1xyXG5pbXBvcnQgQ2hhdCBmcm9tIFwiQC9zZXJ2ZXIvbW9kZWxzL0NoYXRcIjtcclxuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiQC9hY3Rpb25zL2F1dGhcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEdST1VQIFJFUVVFU1QgQUNUSU9OUyAoT3duZXIpXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gT3duZXIgbWVtYnVhdCBHcm91cFJlcXVlc3QgYmFydSBkYXJpIHN1YnNjcmlwdGlvbi1ueWFcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUdyb3VwUmVxdWVzdChmb3JtRGF0YSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKTtcclxuICAgIGlmICghdXNlcikgcmV0dXJuIHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcclxuXHJcbiAgICBjb25zdCBzZXJ2aWNlSWQgPSBmb3JtRGF0YS5nZXQoXCJzZXJ2aWNlSWRcIik7XHJcbiAgICBjb25zdCB0aXRsZSA9IGZvcm1EYXRhLmdldChcInRpdGxlXCIpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBmb3JtRGF0YS5nZXQoXCJkZXNjcmlwdGlvblwiKTtcclxuICAgIGNvbnN0IG1heFNsb3QgPSBmb3JtRGF0YS5nZXQoXCJtYXhTbG90XCIpO1xyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uSWQgPSBmb3JtRGF0YS5nZXQoXCJzdWJzY3JpcHRpb25JZFwiKTtcclxuXHJcbiAgICBpZiAoIXNlcnZpY2VJZCB8fCAhdGl0bGUgfHwgIW1heFNsb3QpIHtcclxuICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiU2VydmljZUlkLCB0aXRsZSwgYW5kIG1heFNsb3QgYXJlIHJlcXVpcmVkXCIgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTnVtYmVyKG1heFNsb3QpIDwgMSB8fCBOdW1iZXIobWF4U2xvdCkgPiAyMCkge1xyXG4gICAgICByZXR1cm4geyBlcnJvcjogXCJNYXggc2xvdCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgMjBcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IEdyb3VwUmVxdWVzdC5jcmVhdGUoe1xyXG4gICAgICBvd25lcklkOiB1c2VyLnVzZXJJZCxcclxuICAgICAgc2VydmljZUlkLFxyXG4gICAgICBzdWJzY3JpcHRpb25JZCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBtYXhTbG90LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL2dyb3VwLXJlcXVlc3RzXCIpO1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4geyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBjcmVhdGUgZ3JvdXAgcmVxdWVzdFwiIH07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBPd25lciBtZW51dHVwIEdyb3VwUmVxdWVzdC1ueWFcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsb3NlR3JvdXBSZXF1ZXN0KGdyb3VwUmVxdWVzdElkKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xyXG4gICAgaWYgKCF1c2VyKSByZXR1cm4geyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xyXG5cclxuICAgIGF3YWl0IEdyb3VwUmVxdWVzdC5jbG9zZShncm91cFJlcXVlc3RJZCwgdXNlci51c2VySWQpO1xyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9ncm91cC1yZXF1ZXN0c1wiKTtcclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gY2xvc2UgZ3JvdXAgcmVxdWVzdFwiIH07XHJcbiAgfVxyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gTUVNQkVSIFJFUVVFU1QgQUNUSU9OUyAoVXNlciB5YW5nIGluZ2luIGJlcmdhYnVuZylcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBVc2VyIG1lbmdpcmltIHJlcXVlc3QgdW50dWsgYmVyZ2FidW5nIGtlIEdyb3VwUmVxdWVzdFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZE1lbWJlclJlcXVlc3QoZ3JvdXBSZXF1ZXN0SWQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XHJcbiAgICBpZiAoIXVzZXIpIHJldHVybiB7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XHJcblxyXG4gICAgLy8gQ2VrIGFwYWthaCBzdWRhaCBwZXJuYWggcmVxdWVzdCBzZWJlbHVtbnlhXHJcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IE1lbWJlclJlcXVlc3QuZmluZEV4aXN0aW5nKFxyXG4gICAgICB1c2VyLnVzZXJJZCxcclxuICAgICAgZ3JvdXBSZXF1ZXN0SWQsXHJcbiAgICApO1xyXG4gICAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICAgIGlmIChleGlzdGluZy5zdGF0dXMgPT09IFwicGVuZGluZ1wiKVxyXG4gICAgICAgIHJldHVybiB7IGVycm9yOiBcIllvdSBhbHJlYWR5IGhhdmUgYSBwZW5kaW5nIHJlcXVlc3RcIiB9O1xyXG4gICAgICBpZiAoZXhpc3Rpbmcuc3RhdHVzID09PSBcImFwcHJvdmVkXCIpXHJcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiWW91IGFyZSBhbHJlYWR5IGEgbWVtYmVyXCIgfTtcclxuICAgICAgLy8gS2FsYXUgcmVqZWN0ZWQsIGJvbGVoIHJlcXVlc3QgdWxhbmcg4oCUIHVwZGF0ZSBzdGF0dXMga2UgcGVuZGluZyBsYWdpXHJcbiAgICAgIGF3YWl0IE1lbWJlclJlcXVlc3QudXBkYXRlU3RhdHVzKGV4aXN0aW5nLl9pZC50b1N0cmluZygpLCBcInBlbmRpbmdcIik7XHJcbiAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9leHBsb3JlXCIpO1xyXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2VrIGFwYWthaCBHcm91cFJlcXVlc3QgbWFzaWggb3BlbiBkYW4gYWRhIHNsb3RcclxuICAgIGNvbnN0IGdyb3VwUmVxID0gYXdhaXQgR3JvdXBSZXF1ZXN0LmdldEJ5SWQoZ3JvdXBSZXF1ZXN0SWQpO1xyXG4gICAgaWYgKGdyb3VwUmVxLnN0YXR1cyAhPT0gXCJvcGVuXCIpIHtcclxuICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiVGhpcyBncm91cCBpcyBubyBsb25nZXIgYWNjZXB0aW5nIHJlcXVlc3RzXCIgfTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBNZW1iZXJSZXF1ZXN0LmNyZWF0ZSh7XHJcbiAgICAgIHVzZXJJZDogdXNlci51c2VySWQsXHJcbiAgICAgIGdyb3VwUmVxdWVzdElkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL2V4cGxvcmVcIik7XHJcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiB7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIHNlbmQgcmVxdWVzdFwiIH07XHJcbiAgfVxyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQVBQUk9WRSAvIFJFSkVDVCBBQ1RJT05TIChPd25lcilcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBCdWF0IEdyb3VwIGRhbiBDaGF0IG90b21hdGlzIHNhYXQgR3JvdXBSZXF1ZXN0IHBlbnVoXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUdyb3VwRnJvbVJlcXVlc3QoZ3JvdXBSZXF1ZXN0SWQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgZ3JvdXBSZXEgPSBhd2FpdCBHcm91cFJlcXVlc3QuZ2V0QnlJZChncm91cFJlcXVlc3RJZCk7XHJcblxyXG4gICAgLy8gQW1iaWwgc2VtdWEgbWVtYmVycyB5YW5nIHN1ZGFoIGFwcHJvdmVkXHJcbiAgICBjb25zdCBtZW1iZXJzID0gYXdhaXQgTWVtYmVyLmdldEJ5R3JvdXBSZXF1ZXN0SWQoZ3JvdXBSZXF1ZXN0SWQpO1xyXG4gICAgY29uc3QgbWVtYmVySWRzID0gbWVtYmVycy5tYXAoKG0pID0+IG0udXNlcklkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIC8vIEluY2x1ZGUgb3duZXIganVnYSBzZWJhZ2FpIG1lbWJlclxyXG4gICAgY29uc3Qgb3duZXJJZFN0cmluZyA9IGdyb3VwUmVxLm93bmVySWQudG9TdHJpbmcoKTtcclxuICAgIGlmICghbWVtYmVySWRzLmluY2x1ZGVzKG93bmVySWRTdHJpbmcpKSB7XHJcbiAgICAgIG1lbWJlcklkcy5wdXNoKG93bmVySWRTdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBHcm91cFxyXG4gICAgY29uc3QgZ3JvdXBSZXN1bHQgPSBhd2FpdCBHcm91cC5jcmVhdGUoe1xyXG4gICAgICBuYW1lOiBncm91cFJlcS50aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb246IGdyb3VwUmVxLmRlc2NyaXB0aW9uIHx8IGBHcm91cCBmb3IgJHtncm91cFJlcS50aXRsZX1gLFxyXG4gICAgICBtZW1iZXJzOiBtZW1iZXJJZHMsXHJcbiAgICAgIGdyb3VwUmVxdWVzdElkOiBncm91cFJlcXVlc3RJZCxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGdyb3VwSWQgPSBncm91cFJlc3VsdC5pbnNlcnRlZElkLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIENoYXQgdW50dWsgZ3JvdXBcclxuICAgIGF3YWl0IENoYXQuY3JlYXRlKHtcclxuICAgICAgcGFydGljaXBhbnRzOiBtZW1iZXJJZHMsXHJcbiAgICAgIHR5cGU6IFwiZ3JvdXBcIiwgLy8gR3JvdXAgY2hhdFxyXG4gICAgICBncm91cElkOiBncm91cElkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYOKchSBHcm91cCBjaGF0IGNyZWF0ZWQgZm9yIEdyb3VwUmVxdWVzdCAke2dyb3VwUmVxdWVzdElkfWApO1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZ3JvdXBJZCB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgZ3JvdXA6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9O1xyXG4gIH1cclxufVxyXG5cclxuLy8gT3duZXIgbWVuZy1hcHByb3ZlIE1lbWJlclJlcXVlc3RcclxuLy8gU2FhdCBhcHByb3ZlOiB1cGRhdGUgc3RhdHVzICsga3VyYW5naSBzbG90ICsgYnVhdCBNZW1iZXIgYmFydVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwcm92ZU1lbWJlclJlcXVlc3QobWVtYmVyUmVxdWVzdElkKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xyXG4gICAgaWYgKCF1c2VyKSByZXR1cm4geyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xyXG5cclxuICAgIC8vIEFtYmlsIE1lbWJlclJlcXVlc3RcclxuICAgIGNvbnN0IG1lbWJlclJlcSA9IGF3YWl0IE1lbWJlclJlcXVlc3QuZ2V0QnlJZChtZW1iZXJSZXF1ZXN0SWQpO1xyXG5cclxuICAgIC8vIEFtYmlsIEdyb3VwUmVxdWVzdCBzZWNhcmEgdGVycGlzYWhcclxuICAgIGNvbnN0IGdyb3VwUmVxID0gYXdhaXQgR3JvdXBSZXF1ZXN0LmdldEJ5SWQoXHJcbiAgICAgIG1lbWJlclJlcS5ncm91cFJlcXVlc3RJZC50b1N0cmluZygpLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBQYXN0aWthbiB5YW5nIGFwcHJvdmUgYWRhbGFoIG93bmVyXHJcbiAgICBpZiAoZ3JvdXBSZXEub3duZXJJZC50b1N0cmluZygpICE9PSB1c2VyLnVzZXJJZCkge1xyXG4gICAgICByZXR1cm4geyBlcnJvcjogXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkIHRvIGFwcHJvdmUgdGhpcyByZXF1ZXN0XCIgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVtYmVyUmVxLnN0YXR1cyAhPT0gXCJwZW5kaW5nXCIpIHtcclxuICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiVGhpcyByZXF1ZXN0IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkXCIgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ3JvdXBSZXEuYXZhaWxhYmxlU2xvdCA8PSAwKSB7XHJcbiAgICAgIHJldHVybiB7IGVycm9yOiBcIk5vIGF2YWlsYWJsZSBzbG90c1wiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQW1iaWwgZGF0YSB1c2VyIHlhbmcgcmVxdWVzdFxyXG4gICAgY29uc3QgeyBnZXREYiB9ID0gYXdhaXQgaW1wb3J0KFwiQC9zZXJ2ZXIvY29uZmlnL21vbmdvZGJcIik7XHJcbiAgICBjb25zdCB7IE9iamVjdElkIH0gPSBhd2FpdCBpbXBvcnQoXCJtb25nb2RiXCIpO1xyXG4gICAgY29uc3QgZGIgPSBhd2FpdCBnZXREYigpO1xyXG4gICAgY29uc3QgcmVxdWVzdFVzZXIgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIikuZmluZE9uZSh7XHJcbiAgICAgIF9pZDogbmV3IE9iamVjdElkKG1lbWJlclJlcS51c2VySWQudG9TdHJpbmcoKSksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAxLiBVcGRhdGUgc3RhdHVzIOKGkiBhcHByb3ZlZFxyXG4gICAgYXdhaXQgTWVtYmVyUmVxdWVzdC51cGRhdGVTdGF0dXMobWVtYmVyUmVxdWVzdElkLCBcImFwcHJvdmVkXCIpO1xyXG5cclxuICAgIC8vIDIuIEt1cmFuZ2kgc2xvdFxyXG4gICAgYXdhaXQgR3JvdXBSZXF1ZXN0LmRlY3JlbWVudFNsb3QobWVtYmVyUmVxLmdyb3VwUmVxdWVzdElkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIC8vIDMuIEJ1YXQgTWVtYmVyIGJhcnUgZGVuZ2FuIGdyb3VwUmVxdWVzdElkIHVudHVrIHRyYWNraW5nXHJcbiAgICBhd2FpdCBNZW1iZXIuY3JlYXRlKHtcclxuICAgICAgc3Vic2NyaXB0aW9uSWQ6XHJcbiAgICAgICAgZ3JvdXBSZXEuc3Vic2NyaXB0aW9uSWQ/LnRvU3RyaW5nKCkgfHwgZ3JvdXBSZXEuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgIHVzZXJJZDogbWVtYmVyUmVxLnVzZXJJZC50b1N0cmluZygpLFxyXG4gICAgICBncm91cFJlcXVlc3RJZDogbWVtYmVyUmVxLmdyb3VwUmVxdWVzdElkLnRvU3RyaW5nKCksIC8vIExpbmsga2UgR3JvdXBSZXF1ZXN0XHJcbiAgICAgIG5hbWU6IHJlcXVlc3RVc2VyPy5mdWxsbmFtZSB8fCByZXF1ZXN0VXNlcj8udXNlcm5hbWUgfHwgXCJVbmtub3duXCIsXHJcbiAgICAgIGVtYWlsOiByZXF1ZXN0VXNlcj8uZW1haWwgfHwgXCJcIixcclxuICAgICAgcGhvbmU6IHJlcXVlc3RVc2VyPy5waG9uZU51bWJlciB8fCBcIlwiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gNC4gQ2VrIGppa2EgR3JvdXBSZXF1ZXN0IHN1ZGFoIGZ1bGwsIGNyZWF0ZSBHcm91cCAmIENoYXQgb3RvbWF0aXNcclxuICAgIGNvbnN0IHVwZGF0ZWRHcm91cFJlcSA9IGF3YWl0IEdyb3VwUmVxdWVzdC5nZXRCeUlkKFxyXG4gICAgICBtZW1iZXJSZXEuZ3JvdXBSZXF1ZXN0SWQudG9TdHJpbmcoKSxcclxuICAgICk7XHJcbiAgICBpZiAodXBkYXRlZEdyb3VwUmVxLnN0YXR1cyA9PT0gXCJmdWxsXCIpIHtcclxuICAgICAgYXdhaXQgY3JlYXRlR3JvdXBGcm9tUmVxdWVzdChtZW1iZXJSZXEuZ3JvdXBSZXF1ZXN0SWQudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvZ3JvdXAtcmVxdWVzdHMvJHttZW1iZXJSZXEuZ3JvdXBSZXF1ZXN0SWR9YCk7XHJcbiAgICByZXZhbGlkYXRlUGF0aChcIi9jaGF0XCIpOyAvLyBSZWZyZXNoIGNoYXQgcGFnZVxyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4geyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBhcHByb3ZlIHJlcXVlc3RcIiB9O1xyXG4gIH1cclxufVxyXG5cclxuLy8gT3duZXIgbWVuZy1yZWplY3QgTWVtYmVyUmVxdWVzdFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVqZWN0TWVtYmVyUmVxdWVzdChtZW1iZXJSZXF1ZXN0SWQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XHJcbiAgICBpZiAoIXVzZXIpIHJldHVybiB7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XHJcblxyXG4gICAgY29uc3QgbWVtYmVyUmVxID0gYXdhaXQgTWVtYmVyUmVxdWVzdC5nZXRCeUlkKG1lbWJlclJlcXVlc3RJZCk7XHJcbiAgICBjb25zdCBncm91cFJlcSA9IGF3YWl0IEdyb3VwUmVxdWVzdC5nZXRCeUlkKFxyXG4gICAgICBtZW1iZXJSZXEuZ3JvdXBSZXF1ZXN0SWQudG9TdHJpbmcoKSxcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGdyb3VwUmVxLm93bmVySWQudG9TdHJpbmcoKSAhPT0gdXNlci51c2VySWQpIHtcclxuICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCB0byByZWplY3QgdGhpcyByZXF1ZXN0XCIgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVtYmVyUmVxLnN0YXR1cyAhPT0gXCJwZW5kaW5nXCIpIHtcclxuICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiVGhpcyByZXF1ZXN0IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkXCIgfTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBNZW1iZXJSZXF1ZXN0LnVwZGF0ZVN0YXR1cyhtZW1iZXJSZXF1ZXN0SWQsIFwicmVqZWN0ZWRcIik7XHJcblxyXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvZ3JvdXAtcmVxdWVzdHMvJHttZW1iZXJSZXEuZ3JvdXBSZXF1ZXN0SWR9YCk7XHJcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiB7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIHJlamVjdCByZXF1ZXN0XCIgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIrVkFzRXNCLDhMQUFBIn0=
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExploreClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$data$3a$578422__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/actions/data:578422 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Badge status untuk request yang sudah dikirim user
function StatusBadge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a";
    }
    const { status } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            pending: {
                label: "Pending",
                bg: "bg-amber-50",
                text: "text-amber-500",
                border: "border-amber-100"
            },
            approved: {
                label: "Approved",
                bg: "bg-emerald-50",
                text: "text-emerald-500",
                border: "border-emerald-100"
            },
            rejected: {
                label: "Rejected",
                bg: "bg-rose-50",
                text: "text-rose-400",
                border: "border-rose-100"
            }
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const config = t1;
    const c = config[status] || config.pending;
    const t2 = `text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${c.bg} ${c.text} ${c.border}`;
    let t3;
    if ($[2] !== c.label || $[3] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t2,
            children: c.label
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 52,
            columnNumber: 10
        }, this);
        $[2] = c.label;
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_c = StatusBadge;
// Badge status GroupRequest (full / closed)
function GroupStatusBadge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a";
    }
    const { status } = t0;
    if (status === "open") {
        return null;
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            full: {
                label: "Full",
                bg: "bg-orange-50",
                text: "text-orange-400",
                border: "border-orange-100"
            },
            closed: {
                label: "Closed",
                bg: "bg-slate-100",
                text: "text-slate-400",
                border: "border-slate-200"
            }
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const config = t1;
    const c = config[status] || config.closed;
    const t2 = `text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border flex-shrink-0 ${c.bg} ${c.text} ${c.border}`;
    let t3;
    if ($[2] !== c.label || $[3] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t2,
            children: c.label
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[2] = c.label;
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_c1 = GroupStatusBadge;
// Card untuk satu GroupRequest
function GroupRequestCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(63);
    if ($[0] !== "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a") {
        for(let $i = 0; $i < 63; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a";
    }
    const { groupRequest, requestStatus, currentUserId } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] !== currentUserId || $[2] !== groupRequest.owner?._id || $[3] !== groupRequest.ownerId) {
        t1 = groupRequest.owner?._id?.toString() === currentUserId || groupRequest.ownerId?.toString() === currentUserId;
        $[1] = currentUserId;
        $[2] = groupRequest.owner?._id;
        $[3] = groupRequest.ownerId;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const isOwner = t1;
    const isFull = groupRequest.status === "full";
    const isClosed = groupRequest.status === "closed";
    const isInactive = isFull || isClosed;
    const hasRequested = !!requestStatus;
    let t2;
    if ($[5] !== groupRequest._id || $[6] !== router) {
        t2 = ({
            "GroupRequestCard[handleRequest]": ()=>{
                setError("");
                startTransition({
                    "GroupRequestCard[handleRequest > startTransition()]": async ()=>{
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$src$2f$actions$2f$data$3a$578422__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["sendMemberRequest"])(groupRequest._id.toString());
                        if (result?.error) {
                            setError(result.error);
                        } else {
                            router.refresh();
                        }
                    }
                }["GroupRequestCard[handleRequest > startTransition()]"]);
            }
        })["GroupRequestCard[handleRequest]"];
        $[5] = groupRequest._id;
        $[6] = router;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    const handleRequest = t2;
    const logo = groupRequest.service?.logo || null;
    const serviceName = groupRequest.service?.serviceName || "Unknown Service";
    const t3 = `bg-white rounded-[2.5rem] border shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-lg transition-all overflow-hidden group ${isInactive ? "border-slate-100 opacity-60" : "border-slate-50 hover:border-sky-50"}`;
    const t4 = `h-1 w-full ${isClosed ? "bg-slate-200" : isFull ? "bg-orange-200" : "bg-sky-400"}`;
    let t5;
    if ($[8] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 174,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== logo || $[11] !== serviceName) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 shadow-sm flex-shrink-0",
            children: logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: logo,
                className: "w-8 h-8 object-contain",
                alt: serviceName
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 182,
                columnNumber: 155
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sky-400 text-xl font-black uppercase",
                children: serviceName.charAt(0)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 182,
                columnNumber: 229
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 182,
            columnNumber: 10
        }, this);
        $[10] = logo;
        $[11] = serviceName;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== groupRequest.title) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-black text-slate-800 text-base leading-tight",
            children: groupRequest.title
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 191,
            columnNumber: 10
        }, this);
        $[13] = groupRequest.title;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== groupRequest.status) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GroupStatusBadge, {
            status: groupRequest.status
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 199,
            columnNumber: 10
        }, this);
        $[15] = groupRequest.status;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== t7 || $[18] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-2 mb-1",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 207,
            columnNumber: 10
        }, this);
        $[17] = t7;
        $[18] = t8;
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    let t10;
    if ($[20] !== serviceName) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider",
            children: serviceName
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 216,
            columnNumber: 11
        }, this);
        $[20] = serviceName;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[22] !== t10 || $[23] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-w-0",
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 224,
            columnNumber: 11
        }, this);
        $[22] = t10;
        $[23] = t9;
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    let t12;
    if ($[25] !== t11 || $[26] !== t6) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-5 mb-6",
            children: [
                t6,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[25] = t11;
        $[26] = t6;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    let t13;
    if ($[28] !== groupRequest.description) {
        t13 = groupRequest.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-slate-500 font-medium mb-6 leading-relaxed line-clamp-2",
            children: groupRequest.description
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 242,
            columnNumber: 39
        }, this);
        $[28] = groupRequest.description;
        $[29] = t13;
    } else {
        t13 = $[29];
    }
    let t14;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1",
            children: "Slots Left"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[30] = t14;
    } else {
        t14 = $[30];
    }
    let t15;
    if ($[31] !== groupRequest.maxSlot) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-300 text-sm font-bold",
            children: [
                " / ",
                groupRequest.maxSlot
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[31] = groupRequest.maxSlot;
        $[32] = t15;
    } else {
        t15 = $[32];
    }
    let t16;
    if ($[33] !== groupRequest.availableSlot || $[34] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-slate-50/80 rounded-2xl border border-slate-100",
            children: [
                t14,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl font-black text-slate-800",
                    children: [
                        groupRequest.availableSlot,
                        t15
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 265,
                    columnNumber: 88
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 265,
            columnNumber: 11
        }, this);
        $[33] = groupRequest.availableSlot;
        $[34] = t15;
        $[35] = t16;
    } else {
        t16 = $[35];
    }
    let t17;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1",
            children: "Owner"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 274,
            columnNumber: 11
        }, this);
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    const t18 = isOwner ? "You" : groupRequest.owner?.fullname || groupRequest.owner?.username || "\u2014";
    let t19;
    if ($[37] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-slate-50/80 rounded-2xl border border-slate-100",
            children: [
                t17,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-black text-slate-700 truncate",
                    children: t18
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 282,
                    columnNumber: 88
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[37] = t18;
        $[38] = t19;
    } else {
        t19 = $[38];
    }
    let t20;
    if ($[39] !== t16 || $[40] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-3 mb-6",
            children: [
                t16,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 290,
            columnNumber: 11
        }, this);
        $[39] = t16;
        $[40] = t19;
        $[41] = t20;
    } else {
        t20 = $[41];
    }
    let t21;
    if ($[42] !== error) {
        t21 = error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-rose-400 text-[10px] font-bold uppercase tracking-wider mb-4 px-1",
            children: error
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 299,
            columnNumber: 20
        }, this);
        $[42] = error;
        $[43] = t21;
    } else {
        t21 = $[43];
    }
    let t22;
    if ($[44] !== groupRequest._id || $[45] !== handleRequest || $[46] !== hasRequested || $[47] !== isClosed || $[48] !== isInactive || $[49] !== isOwner || $[50] !== isPending || $[51] !== requestStatus) {
        t22 = isOwner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/dashboard/group-requests/${groupRequest._id}`,
            className: "w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-sky-300 hover:text-sky-500 transition-all",
            children: "Manage →"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 307,
            columnNumber: 21
        }, this) : isInactive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center py-4 rounded-2xl bg-slate-50 border border-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] font-black text-slate-300 uppercase tracking-widest",
                children: isClosed ? "Group Closed" : "No Slots Available"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 307,
                columnNumber: 450
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 307,
            columnNumber: 347
        }, this) : hasRequested ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-black text-slate-400 uppercase tracking-wider",
                    children: "Your Request"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 307,
                    columnNumber: 716
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                    status: requestStatus
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 307,
                    columnNumber: 816
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 307,
            columnNumber: 613
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleRequest,
            disabled: isPending,
            className: "w-full bg-slate-900 hover:bg-sky-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
            children: isPending ? "Sending..." : "Request to Join \u2192"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 307,
            columnNumber: 863
        }, this);
        $[44] = groupRequest._id;
        $[45] = handleRequest;
        $[46] = hasRequested;
        $[47] = isClosed;
        $[48] = isInactive;
        $[49] = isOwner;
        $[50] = isPending;
        $[51] = requestStatus;
        $[52] = t22;
    } else {
        t22 = $[52];
    }
    let t23;
    if ($[53] !== t12 || $[54] !== t13 || $[55] !== t20 || $[56] !== t21 || $[57] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8",
            children: [
                t12,
                t13,
                t20,
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 322,
            columnNumber: 11
        }, this);
        $[53] = t12;
        $[54] = t13;
        $[55] = t20;
        $[56] = t21;
        $[57] = t22;
        $[58] = t23;
    } else {
        t23 = $[58];
    }
    let t24;
    if ($[59] !== t23 || $[60] !== t3 || $[61] !== t5) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t5,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 334,
            columnNumber: 11
        }, this);
        $[59] = t23;
        $[60] = t3;
        $[61] = t5;
        $[62] = t24;
    } else {
        t24 = $[62];
    }
    return t24;
}
_s(GroupRequestCard, "WSx9/I7X7Q/XVmkbOkQGmDDQctk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c2 = GroupRequestCard;
// Section header dengan counter
function SectionHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a";
    }
    const { title, count, active } = t0;
    const t1 = `w-2 h-8 rounded-full ${active ? "bg-sky-400" : "bg-slate-200"}`;
    let t2;
    if ($[1] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 362,
            columnNumber: 10
        }, this);
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== title) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-lg font-black text-slate-800",
            children: title
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 370,
            columnNumber: 10
        }, this);
        $[3] = title;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const t4 = count !== 1 ? "s" : "";
    let t5;
    if ($[5] !== count || $[6] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[9px] font-black text-slate-400 uppercase tracking-widest",
            children: [
                count,
                " group",
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 379,
            columnNumber: 10
        }, this);
        $[5] = count;
        $[6] = t4;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t3 || $[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t3,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 388,
            columnNumber: 10
        }, this);
        $[8] = t3;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== t2 || $[12] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4 mb-6",
            children: [
                t2,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 397,
            columnNumber: 10
        }, this);
        $[11] = t2;
        $[12] = t6;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    return t7;
}
_c3 = SectionHeader;
function ExploreClient(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "37142894d115aab7dbc244660c8104d794c0c95f07bdf0ca7229271753b6421a";
    }
    const { groupRequests, myRequests, currentUserId } = t0;
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] !== myRequests) {
        t1 = myRequests.reduce(_ExploreClientMyRequestsReduce, {});
        $[1] = myRequests;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const requestStatusMap = t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    if ($[3] !== currentUserId || $[4] !== groupRequests || $[5] !== requestStatusMap || $[6] !== search) {
        let t7;
        if ($[12] !== search) {
            t7 = ({
                "ExploreClient[groupRequests.filter()]": (gr)=>{
                    const q = search.toLowerCase();
                    return gr.title?.toLowerCase().includes(q) || gr.service?.serviceName?.toLowerCase().includes(q) || gr.description?.toLowerCase().includes(q);
                }
            })["ExploreClient[groupRequests.filter()]"];
            $[12] = search;
            $[13] = t7;
        } else {
            t7 = $[13];
        }
        const filtered = groupRequests.filter(t7);
        const activeGroups = filtered.filter(_ExploreClientFilteredFilter);
        const inactiveGroups = filtered.filter(_ExploreClientFilteredFilter2);
        t6 = "min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900";
        t2 = "max-w-6xl mx-auto";
        let t8;
        if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/dashboard",
                className: "group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl group-hover:-translate-x-1 transition-transform",
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                        lineNumber: 455,
                        columnNumber: 142
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-black uppercase tracking-[0.2em]",
                        children: "Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                        lineNumber: 455,
                        columnNumber: 224
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 455,
                columnNumber: 12
            }, this);
            $[14] = t8;
        } else {
            t8 = $[14];
        }
        let t9;
        if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-black tracking-tight text-slate-900",
                children: [
                    "Explore ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sky-500",
                        children: "Groups."
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                        lineNumber: 462,
                        columnNumber: 86
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 462,
                columnNumber: 12
            }, this);
            $[15] = t9;
        } else {
            t9 = $[15];
        }
        const t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1",
            children: [
                t8,
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]",
                    children: [
                        activeGroups.length,
                        " Open Sharing Available"
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 467,
                    columnNumber: 52
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 467,
            columnNumber: 17
        }, this);
        let t11;
        if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/dashboard/group-requests/create",
                className: "bg-slate-900 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center gap-3 active:scale-95 w-fit",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg leading-none",
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                        lineNumber: 470,
                        columnNumber: 272
                    }, this),
                    " Open My Group"
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 470,
                columnNumber: 13
            }, this);
            $[16] = t11;
        } else {
            t11 = $[16];
        }
        if ($[17] !== t10) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6",
                children: [
                    t10,
                    t11
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 476,
                columnNumber: 12
            }, this);
            $[17] = t10;
            $[18] = t3;
        } else {
            t3 = $[18];
        }
        let t12;
        if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = ({
                "ExploreClient[<input>.onChange]": (e)=>setSearch(e.target.value)
            })["ExploreClient[<input>.onChange]"];
            $[19] = t12;
        } else {
            t12 = $[19];
        }
        if ($[20] !== search) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    value: search,
                    onChange: t12,
                    placeholder: "Search by service or title...",
                    className: "w-full max-w-md p-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 shadow-sm placeholder:text-slate-300 transition-all"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 492,
                    columnNumber: 35
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                lineNumber: 492,
                columnNumber: 12
            }, this);
            $[20] = search;
            $[21] = t4;
        } else {
            t4 = $[21];
        }
        t5 = filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-32 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl text-slate-200 font-black",
                        children: "?"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                        lineNumber: 498,
                        columnNumber: 255
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 498,
                    columnNumber: 135
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-slate-900 font-black text-lg mb-1",
                    children: "No Groups Found"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 498,
                    columnNumber: 322
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400 font-bold uppercase tracking-widest text-[9px]",
                    children: search ? "Try a different search term." : "No sharing groups yet."
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 498,
                    columnNumber: 397
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 498,
            columnNumber: 34
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-14",
            children: [
                activeGroups.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                            title: "Active Groups",
                            count: activeGroups.length,
                            active: true
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                            lineNumber: 498,
                            columnNumber: 616
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: activeGroups.map({
                                "ExploreClient[activeGroups.map()]": (gr_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GroupRequestCard, {
                                        groupRequest: gr_2,
                                        requestStatus: requestStatusMap[gr_2._id.toString()],
                                        currentUserId: currentUserId
                                    }, gr_2._id.toString(), false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                                        lineNumber: 499,
                                        columnNumber: 58
                                    }, this)
                            }["ExploreClient[activeGroups.map()]"])
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                            lineNumber: 498,
                            columnNumber: 697
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 498,
                    columnNumber: 611
                }, this),
                inactiveGroups.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                            title: "Inactive Groups",
                            count: inactiveGroups.length,
                            active: false
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                            lineNumber: 500,
                            columnNumber: 99
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: inactiveGroups.map({
                                "ExploreClient[inactiveGroups.map()]": (gr_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GroupRequestCard, {
                                        groupRequest: gr_3,
                                        requestStatus: requestStatusMap[gr_3._id.toString()],
                                        currentUserId: currentUserId,
                                        inactive: true
                                    }, gr_3._id.toString(), false, {
                                        fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                                        lineNumber: 501,
                                        columnNumber: 60
                                    }, this)
                            }["ExploreClient[inactiveGroups.map()]"])
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                            lineNumber: 500,
                            columnNumber: 185
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
                    lineNumber: 500,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 498,
            columnNumber: 555
        }, this);
        $[3] = currentUserId;
        $[4] = groupRequests;
        $[5] = requestStatusMap;
        $[6] = search;
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
        $[10] = t5;
        $[11] = t6;
    } else {
        t2 = $[7];
        t3 = $[8];
        t4 = $[9];
        t5 = $[10];
        t6 = $[11];
    }
    let t7;
    if ($[22] !== t2 || $[23] !== t3 || $[24] !== t4 || $[25] !== t5) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: [
                t3,
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 521,
            columnNumber: 10
        }, this);
        $[22] = t2;
        $[23] = t3;
        $[24] = t4;
        $[25] = t5;
        $[26] = t7;
    } else {
        t7 = $[26];
    }
    let t8;
    if ($[27] !== t6 || $[28] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            children: t7
        }, void 0, false, {
            fileName: "[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/src/components/ExploreClient.js",
            lineNumber: 532,
            columnNumber: 10
        }, this);
        $[27] = t6;
        $[28] = t7;
        $[29] = t8;
    } else {
        t8 = $[29];
    }
    return t8;
}
_s1(ExploreClient, "42GASUL8pX2/N6Oh5HTh0GvQEF0=");
_c4 = ExploreClient;
function _ExploreClientFilteredFilter2(gr_1) {
    return gr_1.status !== "open";
}
function _ExploreClientFilteredFilter(gr_0) {
    return gr_0.status === "open";
}
function _ExploreClientMyRequestsReduce(acc, req) {
    acc[req.groupRequestId?.toString()] = req.status;
    return acc;
}
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "StatusBadge");
__turbopack_context__.k.register(_c1, "GroupStatusBadge");
__turbopack_context__.k.register(_c2, "GroupRequestCard");
__turbopack_context__.k.register(_c3, "SectionHeader");
__turbopack_context__.k.register(_c4, "ExploreClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-compiler-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    var ReactSharedInternals = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function(size) {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher.useMemoCache(size);
    };
}();
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    callServer: null,
    createServerReference: null,
    findSourceMapURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    callServer: function() {
        return _appcallserver.callServer;
    },
    createServerReference: function() {
        return _client.createServerReference;
    },
    findSourceMapURL: function() {
        return _appfindsourcemapurl.findSourceMapURL;
    }
});
const _appcallserver = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)");
const _appfindsourcemapurl = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)");
const _client = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)"); //# sourceMappingURL=action-client-wrapper.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=OneDrive_Dokumen_Hacktiv8_phase%203_FINAL_PROJECT_client_my-app_8274e21f._.js.map