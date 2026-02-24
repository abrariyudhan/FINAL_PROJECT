"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    open: { label: "Open", bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100" },
    full: { label: "Full", bg: "bg-amber-50", text: "text-amber-500", border: "border-amber-100" },
    closed: { label: "Closed", bg: "bg-slate-100", text: "text-slate-400", border: "border-slate-200" },
  };
  const c = config[status] || config.closed;
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border flex-shrink-0 ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  );
}

// ─── Avatar ──────────────────────────────────────────────────
function Avatar({ name, color = "sky" }) {
  const initial = (name || "?")[0].toUpperCase();
  const colors = {
    sky: "bg-sky-50 text-sky-500 border-sky-100",
    emerald: "bg-emerald-50 text-emerald-500 border-emerald-100",
    slate: "bg-slate-100 text-slate-400 border-slate-200",
  };
  return (
    <div className={`w-10 h-10 rounded-[0.75rem] border flex items-center justify-center font-black text-sm flex-shrink-0 ${colors[color]}`}>
      {initial}
    </div>
  );
}

// ─── Member Row ──────────────────────────────────────────────
function MemberRow({ req, onAction, loading, isClosed, type }) {
  const name = req.userData?.fullname || req.userData?.username || "Unknown User";
  const email = req.userData?.email || "—";
  const avatarColor = type === "approved" ? "emerald" : type === "rejected" ? "slate" : "sky";

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar name={name} color={avatarColor} />
        <div className="min-w-0">
          <p className={`text-sm font-black truncate ${type === "rejected" ? "text-slate-400" : "text-slate-800"}`}>
            {name}
          </p>
          <p className="text-[10px] text-slate-400 font-bold truncate">{email}</p>
        </div>
      </div>

      {type === "pending" && (
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onAction("approve", req._id)}
            disabled={!!loading}
            className="text-[10px] font-black px-4 py-2 rounded-xl bg-slate-900 hover:bg-sky-500 text-white transition-all uppercase tracking-wider disabled:opacity-40 active:scale-95"
          >
            {loading === req._id + "_approve" ? "..." : "Approve"}
          </button>
          <button
            onClick={() => onAction("reject", req._id)}
            disabled={!!loading}
            className="text-[10px] font-black px-4 py-2 rounded-xl border-2 border-slate-200 hover:border-rose-200 hover:text-rose-500 text-slate-400 transition-all uppercase tracking-wider disabled:opacity-40"
          >
            {loading === req._id + "_reject" ? "..." : "Reject"}
          </button>
        </div>
      )}

      {type === "approved" && !isClosed && (
        <button
          onClick={() => onAction("remove", req._id)}
          disabled={!!loading}
          className="text-[10px] font-black px-4 py-2 rounded-xl border-2 border-slate-200 hover:border-rose-200 hover:text-rose-500 text-slate-400 transition-all uppercase tracking-wider disabled:opacity-40 flex-shrink-0"
        >
          {loading === req._id + "_remove" ? "..." : "Remove"}
        </button>
      )}
    </div>
  );
}

// ─── Section Block ───────────────────────────────────────────
function Section({ title, count, accentColor, children, emptyMessage }) {
  const accents = { amber: "bg-amber-400", emerald: "bg-emerald-400", slate: "bg-slate-300" };
  const badges = {
    amber: "bg-amber-50 text-amber-500 border-amber-100",
    emerald: "bg-emerald-50 text-emerald-500 border-emerald-100",
    slate: "bg-slate-100 text-slate-400 border-slate-200",
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-1.5 h-7 rounded-full ${accents[accentColor]}`} />
        <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">{title}</h2>
        <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border ml-auto ${badges[accentColor]}`}>
          {count}
        </span>
      </div>
      {count === 0 ? (
        <div className="text-center py-8">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3">{children}</div>
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

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300 shadow-sm";
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-[0.2em] ml-1";

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
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Toast */}
        {toast && (
          <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-[10px] font-black uppercase tracking-wider border
            ${toast.type === "error" ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-emerald-50 text-emerald-500 border-emerald-100"}`}>
            {toast.msg}
          </div>
        )}

        {/* Back */}
        <Link href="/dashboard/group-requests"
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">My Groups</span>
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className={`h-1.5 w-full ${isClosed ? "bg-slate-200" : isFull ? "bg-amber-300" : "bg-sky-400"}`} />
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 flex-shrink-0">
                  {groupRequest.logo ? (
                    <img src={groupRequest.logo} alt={groupRequest.serviceName} className="w-9 h-9 object-contain" />
                  ) : (
                    <span className="text-sky-400 text-2xl font-black uppercase">{groupRequest.serviceName?.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h1 className="text-xl font-black text-slate-900">{groupRequest.title}</h1>
                    <GroupStatusBadge status={groupRequest.status} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{groupRequest.serviceName}</p>
                  {groupRequest.description && (
                    <p className="text-sm text-slate-500 font-medium mt-1">{groupRequest.description}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-slate-900 leading-none">
                  {groupRequest.availableSlot}
                  <span className="text-xl text-slate-300 font-bold">/{groupRequest.maxSlot}</span>
                </p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Slots Left</p>
              </div>
            </div>

            {!isClosed && (
              <div className="flex flex-wrap gap-3 mt-7 pt-7 border-t border-slate-100">
                {isFull && (
                  <a href={`/dashboard/group-requests/${groupRequest._id}/setup-subscription`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-sky-500 text-white text-[10px] font-black px-6 py-3.5 rounded-2xl transition-all uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95">
                    Setup Subscription →
                  </a>
                )}
                <button onClick={() => setShowEditModal(true)}
                  className="text-[10px] font-black px-5 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-sky-300 hover:text-sky-500 text-slate-400 transition-all uppercase tracking-wider">
                  ✏ Edit
                </button>
                {isOpen && (
                  <button onClick={handleClose} disabled={loading === "close"}
                    className="text-[10px] font-black px-5 py-3.5 rounded-2xl border-2 border-amber-100 hover:bg-amber-50 text-amber-500 transition-all uppercase tracking-wider disabled:opacity-40">
                    {loading === "close" ? "Closing..." : "🔒 Close"}
                  </button>
                )}
                <button onClick={() => setShowDeleteConfirm(true)}
                  className="text-[10px] font-black px-5 py-3.5 rounded-2xl border-2 border-rose-100 hover:bg-rose-50 text-rose-400 transition-all uppercase tracking-wider">
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <Section title="Pending Requests" count={pendingRequests.length} accentColor="amber" emptyMessage="No pending requests">
          {pendingRequests.map((req) => (
            <MemberRow key={req._id} req={req} onAction={handleAction} loading={loading} type="pending" />
          ))}
        </Section>

        <Section title="Approved Members" count={approvedRequests.length} accentColor="emerald" emptyMessage="No approved members yet">
          {approvedRequests.map((req) => (
            <MemberRow key={req._id} req={req} onAction={handleAction} loading={loading} isClosed={isClosed} type="approved" />
          ))}
        </Section>

        {rejectedRequests.length > 0 && (
          <Section title="Rejected" count={rejectedRequests.length} accentColor="slate" emptyMessage="">
            {rejectedRequests.map((req) => (
              <MemberRow key={req._id} req={req} onAction={handleAction} loading={loading} type="rejected" />
            ))}
          </Section>
        )}

      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Edit Group Request</h2>
            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div>
                <label className={labelStyles}>Service Name</label>
                {services?.length > 0 ? (
                  <select value={editForm.serviceName}
                    onChange={(e) => setEditForm({ ...editForm, serviceName: e.target.value })}
                    className={inputStyles} required>
                    <option value="">Select service...</option>
                    {services.map((s) => (
                      <option key={s._id} value={s.serviceName}>{s.serviceName}</option>
                    ))}
                  </select>
                ) : (
                  <input type="text" value={editForm.serviceName}
                    onChange={(e) => setEditForm({ ...editForm, serviceName: e.target.value })}
                    className={inputStyles} required />
                )}
              </div>
              <div>
                <label className={labelStyles}>Title</label>
                <input type="text" value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className={inputStyles} required />
              </div>
              <div>
                <label className={labelStyles}>Description <span className="normal-case font-medium text-slate-300">(optional)</span></label>
                <textarea value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3} className={inputStyles + " resize-none"} />
              </div>
              <div>
                <label className={labelStyles}>Available Slots</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setEditForm(f => ({ ...f, maxSlot: Math.max(1, Number(f.maxSlot) - 1) }))}
                    className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 font-black text-xl hover:bg-slate-200 transition flex items-center justify-center">−</button>
                  <span className="flex-1 text-center text-3xl font-black text-slate-800">{editForm.maxSlot}</span>
                  <button type="button" onClick={() => setEditForm(f => ({ ...f, maxSlot: Math.min(20, Number(f.maxSlot) + 1) }))}
                    className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 font-black text-xl hover:bg-slate-200 transition flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)}
                  className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-[10px] font-black text-slate-400 hover:bg-slate-50 transition uppercase tracking-wider">
                  Cancel
                </button>
                <button type="submit" disabled={loading === "edit"}
                  className="flex-1 py-4 rounded-2xl bg-slate-900 hover:bg-sky-500 text-white text-[10px] font-black transition-all uppercase tracking-wider disabled:opacity-40 shadow-xl shadow-slate-200 active:scale-95">
                  {loading === "edit" ? "Saving..." : "Save Changes →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-16 h-16 bg-rose-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-5 border border-rose-100">
              <span className="text-2xl">🗑</span>
            </div>
            <h2 className="text-base font-black text-slate-900 mb-2 uppercase tracking-[0.1em]">Delete Group?</h2>
            <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
              This will permanently delete the group and all member requests. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-[10px] font-black text-slate-400 hover:bg-slate-50 transition uppercase tracking-wider">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={loading === "delete"}
                className="flex-1 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black transition-all uppercase tracking-wider disabled:opacity-40 active:scale-95">
                {loading === "delete" ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}