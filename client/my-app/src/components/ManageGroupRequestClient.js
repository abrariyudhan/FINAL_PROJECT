"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiEdit3, FiLock, FiTrash2, FiUser, FiCheck, FiX, FiMinus, FiPlus } from "react-icons/fi";
import {
  updateGroupRequest,
  closeGroupRequest,
  deleteGroupRequest,
  approveMemberRequest,
  rejectMemberRequest,
  removeApprovedMember,
} from "@/actions/groupRequest";

// ─── Status Badge ────────────────────────────────────────────
function GroupStatusBadge({ status }) {
  const config = {
    open: { label: "OPEN", color: "text-emerald-500", border: "border-emerald-200" },
    full: { label: "FULL", color: "text-amber-500", border: "border-amber-200" },
    closed: { label: "CLOSED", color: "text-slate-400", border: "border-slate-200" },
  };
  const c = config[status] || config.closed;
  return (
    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${c.color} ${c.border}`}>
      {c.label}
    </span>
  );
}

// ─── Avatar ──────────────────────────────────────────────────
function Avatar({ name, color = "slate" }) {
  const initial = (name || "?")[0].toUpperCase();
  const colors = {
    sky: "bg-slate-900 text-white border-slate-900",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    slate: "bg-slate-50 text-slate-400 border-slate-100",
  };
  return (
    <div className={`w-10 h-10 rounded border flex items-center justify-center font-black text-xs flex-shrink-0 transition-all ${colors[color]}`}>
      {initial}
    </div>
  );
}

// ─── Member Row ──────────────────────────────────────────────
function MemberRow({ req, onAction, loading, isClosed, type }) {
  const name = req.userData?.fullname || req.userData?.username || "Unknown User";
  const email = req.userData?.email || "—";
  const avatarColor = type === "approved" ? "emerald" : type === "pending" ? "sky" : "slate";

  return (
    <div className="flex items-center justify-between gap-4 p-5 rounded-lg bg-white border border-slate-100 hover:border-slate-200 transition-all group">
      <div className="flex items-center gap-4 min-w-0">
        <Avatar name={name} color={avatarColor} />
        <div className="min-w-0">
          <p className={`text-xs font-black uppercase tracking-tight truncate ${type === "rejected" ? "text-slate-400" : "text-slate-900"}`}>
            {name}
          </p>
          <p className="text-[10px] text-slate-400 font-bold truncate tracking-wide">{email}</p>
        </div>
      </div>

      {type === "pending" && (
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onAction("approve", req._id)}
            disabled={!!loading}
            className="flex items-center gap-1.5 text-[9px] font-black px-3 py-2 rounded bg-slate-900 hover:bg-emerald-500 text-white transition-all uppercase tracking-widest disabled:opacity-40 active:scale-95"
          >
            <FiCheck size={12} strokeWidth={3} /> {loading === req._id + "_approve" ? "..." : "Approve"}
          </button>
          <button
            onClick={() => onAction("reject", req._id)}
            disabled={!!loading}
            className="flex items-center gap-1.5 text-[9px] font-black px-3 py-2 rounded border border-slate-200 hover:border-rose-500 hover:text-rose-500 text-slate-400 transition-all uppercase tracking-widest disabled:opacity-40"
          >
            <FiX size={12} strokeWidth={3} /> {loading === req._id + "_reject" ? "..." : "Reject"}
          </button>
        </div>
      )}

      {type === "approved" && !isClosed && (
        <button
          onClick={() => onAction("remove", req._id)}
          disabled={!!loading}
          className="text-[9px] font-black px-3 py-2 rounded border border-slate-200 hover:border-rose-200 hover:text-rose-500 text-slate-400 transition-all uppercase tracking-widest disabled:opacity-40 flex-shrink-0"
        >
          {loading === req._id + "_remove" ? "..." : "Remove"}
        </button>
      )}
    </div>
  );
}

// ─── Section Block ───────────────────────────────────────────
function Section({ title, count, children, emptyMessage }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-slate-900 rounded-full" />
          <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{title}</h2>
        </div>
        <span className="text-[10px] font-black px-2 py-0.5 bg-slate-50 text-slate-400 border border-slate-100 rounded">
          {count}
        </span>
      </div>
      {count === 0 ? (
        <div className="text-center py-10">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-loose">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-2">{children}</div>
      )}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────
export default function ManageGroupRequestClient({ groupRequest, memberRequests, services }) {
  const router = useRouter();
  const [loading, setLoading] = useState(null);
  const [toast, setToast] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    serviceName: groupRequest.serviceName || "",
    title: groupRequest.title || "",
    description: groupRequest.description || "",
    maxSlot: groupRequest.maxSlot || 1,
  });

  const isFull = groupRequest.status === "full";
  const isClosed = groupRequest.status === "closed";
  const isOpen = groupRequest.status === "open";

  const pendingRequests = memberRequests.filter((r) => r.status === "pending");
  const approvedRequests = memberRequests.filter((r) => r.status === "approved");
  const rejectedRequests = memberRequests.filter((r) => r.status === "rejected");

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded outline-none focus:bg-white focus:border-slate-900 text-xs font-black text-slate-700 transition-all placeholder:text-slate-300 uppercase tracking-tight";
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest ml-1";

  function showToast(type, msg) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleAction(type, memberRequestId) {
    setLoading(memberRequestId + "_" + type);
    let res;
    if (type === "approve") res = await approveMemberRequest(memberRequestId);
    else if (type === "reject") res = await rejectMemberRequest(memberRequestId);
    else if (type === "remove") {
      if (!confirm("Remove this member? Their slot will be returned.")) { setLoading(null); return; }
      res = await removeApprovedMember(memberRequestId, groupRequest._id);
    }
    setLoading(null);
    if (res?.error) showToast("error", res.error);
    else showToast("success", type === "approve" ? "Member approved!" : type === "reject" ? "Request rejected." : "Member removed.");
  }

  async function handleClose() {
    if (!confirm("Close this group? It will stop accepting new requests.")) return;
    setLoading("close");
    const res = await closeGroupRequest(groupRequest._id);
    setLoading(null);
    if (res?.error) showToast("error", res.error);
    else showToast("success", "Group closed.");
  }

  async function handleDelete() {
    setLoading("delete");
    const res = await deleteGroupRequest(groupRequest._id);
    setLoading(null);
    if (res?.error) { showToast("error", res.error); setShowDeleteConfirm(false); }
    else router.push("/dashboard/group-requests");
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    setLoading("edit");
    const formData = new FormData();
    formData.set("serviceName", editForm.serviceName);
    formData.set("title", editForm.title);
    formData.set("description", editForm.description);
    formData.set("maxSlot", editForm.maxSlot);
    const res = await updateGroupRequest(groupRequest._id, formData);
    setLoading(null);
    if (res?.error) showToast("error", res.error);
    else { showToast("success", "Group updated!"); setShowEditModal(false); }
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:p-12 font-sans text-slate-900 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Toast */}
        {toast && (
          <div className={`fixed top-8 right-8 z-[100] px-6 py-3 rounded border shadow-2xl text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4
            ${toast.type === "error" ? "bg-white text-rose-500 border-rose-200" : "bg-white text-emerald-500 border-emerald-200"}`}>
            {toast.msg}
          </div>
        )}

        {/* Back Link */}
        <Link href="/dashboard/group-requests"
          className="group inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.3em]">
          <FiArrowLeft strokeWidth={3} /> My Groups
        </Link>

        {/* Header Dashboard */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className={`h-1.5 w-full ${isClosed ? "bg-slate-200" : isFull ? "bg-amber-400" : "bg-slate-900"}`} />
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white rounded border border-slate-100 flex items-center justify-center shadow-sm flex-shrink-0">
                  {groupRequest.logo ? (
                    <img src={groupRequest.logo} alt={groupRequest.serviceName} className="w-12 h-12 object-contain" />
                  ) : (
                    <span className="text-slate-900 text-3xl font-black uppercase">{groupRequest.serviceName?.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-4 flex-wrap mb-2">
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{groupRequest.title}</h1>
                    <GroupStatusBadge status={groupRequest.status} />
                  </div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{groupRequest.serviceName}</p>
                  {groupRequest.description && (
                    <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-lg italic">"{groupRequest.description}"</p>
                  )}
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-center md:text-right min-w-[140px]">
                <p className="text-4xl font-black text-slate-900 leading-none tracking-tighter">
                  {groupRequest.availableSlot}
                  <span className="text-lg text-slate-300 ml-1">/ {groupRequest.maxSlot}</span>
                </p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Available Slots</p>
              </div>
            </div>

            {!isClosed && (
              <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-slate-100">
                {isFull && (
                  <Link href={`/dashboard/group-requests/${groupRequest._id}/setup-subscription`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black px-8 py-4 rounded transition-all uppercase tracking-widest shadow-lg shadow-slate-100 active:scale-95">
                    Setup Subscription <FiArrowLeft className="rotate-180" strokeWidth={3} />
                  </Link>
                )}
                <button onClick={() => setShowEditModal(true)}
                  className="flex items-center gap-2 text-[10px] font-black px-6 py-4 rounded border border-slate-200 hover:border-slate-900 text-slate-900 transition-all uppercase tracking-widest bg-white">
                  <FiEdit3 size={14} /> Edit
                </button>
                {isOpen && (
                  <button onClick={handleClose} disabled={loading === "close"}
                    className="flex items-center gap-2 text-[10px] font-black px-6 py-4 rounded border border-amber-200 text-amber-600 hover:bg-amber-50 transition-all uppercase tracking-widest disabled:opacity-40">
                    <FiLock size={14} /> {loading === "close" ? "Closing..." : "Close Group"}
                  </button>
                )}
                <button onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 text-[10px] font-black px-6 py-4 rounded border border-rose-100 text-rose-500 hover:bg-rose-50 transition-all uppercase tracking-widest">
                  <FiTrash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Member Management Sections */}
        <div className="grid grid-cols-1 gap-8">
          <Section title="Pending Requests" count={pendingRequests.length} emptyMessage="No requests awaiting approval">
            {pendingRequests.map((req) => (
              <MemberRow key={req._id} req={req} onAction={handleAction} loading={loading} type="pending" />
            ))}
          </Section>

          <Section title="Approved Members" count={approvedRequests.length} emptyMessage="No active members in this group">
            {approvedRequests.map((req) => (
              <MemberRow key={req._id} req={req} onAction={handleAction} loading={loading} isClosed={isClosed} type="approved" />
            ))}
          </Section>

          {rejectedRequests.length > 0 && (
            <Section title="Rejected" count={rejectedRequests.length} emptyMessage="">
              {rejectedRequests.map((req) => (
                <MemberRow key={req._id} req={req} onAction={handleAction} loading={loading} type="rejected" />
              ))}
            </Section>
          )}
        </div>

      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100">
               <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em]">Modify Request</h2>
            </div>
            <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
              <div>
                <label className={labelStyles}>Service Provider</label>
                {services?.length > 0 ? (
                  <select value={editForm.serviceName}
                    onChange={(e) => setEditForm({ ...editForm, serviceName: e.target.value })}
                    className={inputStyles} required>
                    <option value="">Select Service...</option>
                    {services.map((s) => (
                      <option key={s._id} value={s.serviceName}>{s.serviceName.toUpperCase()}</option>
                    ))}
                  </select>
                ) : (
                  <input type="text" value={editForm.serviceName}
                    onChange={(e) => setEditForm({ ...editForm, serviceName: e.target.value })}
                    className={inputStyles} required />
                )}
              </div>
              <div>
                <label className={labelStyles}>Request Title</label>
                <input type="text" value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className={inputStyles} required />
              </div>
              <div>
                <label className={labelStyles}>Notes <span className="normal-case font-medium text-slate-300 ml-1">(Optional)</span></label>
                <textarea value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3} className={inputStyles + " resize-none normal-case"} />
              </div>
              <div>
                <label className={labelStyles}>Maximum Capacity</label>
                <div className="flex items-center gap-6 bg-slate-50 p-2 rounded border border-slate-100">
                  <button type="button" onClick={() => setEditForm(f => ({ ...f, maxSlot: Math.max(1, Number(f.maxSlot) - 1) }))}
                    className="w-10 h-10 rounded bg-white border border-slate-200 text-slate-900 hover:border-slate-900 transition flex items-center justify-center"><FiMinus size={14} strokeWidth={3} /></button>
                  <span className="flex-1 text-center text-xl font-black text-slate-900">{editForm.maxSlot}</span>
                  <button type="button" onClick={() => setEditForm(f => ({ ...f, maxSlot: Math.min(20, Number(f.maxSlot) + 1) }))}
                    className="w-10 h-10 rounded bg-white border border-slate-200 text-slate-900 hover:border-slate-900 transition flex items-center justify-center"><FiPlus size={14} strokeWidth={3} /></button>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowEditModal(false)}
                  className="flex-1 py-4 rounded border border-slate-200 text-[10px] font-black text-slate-400 hover:text-slate-900 transition uppercase tracking-widest">
                  Cancel
                </button>
                <button type="submit" disabled={loading === "edit"}
                  className="flex-1 py-4 rounded bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black transition-all uppercase tracking-widest disabled:opacity-40 active:scale-95">
                  {loading === "edit" ? "Processing..." : "Update Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-rose-50 rounded border border-rose-100 flex items-center justify-center mx-auto mb-6">
              <FiTrash2 className="text-rose-500 text-2xl" />
            </div>
            <h2 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-[0.2em]">Delete Group?</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide mb-8 leading-relaxed">
              This action is permanent. All associated requests and data will be erased.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-4 rounded border border-slate-200 text-[10px] font-black text-slate-400 hover:text-slate-900 transition uppercase tracking-widest">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={loading === "delete"}
                className="flex-1 py-4 rounded bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black transition-all uppercase tracking-widest disabled:opacity-40 active:scale-95">
                {loading === "delete" ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}