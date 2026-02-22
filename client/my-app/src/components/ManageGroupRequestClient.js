"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { approveMemberRequest, rejectMemberRequest, closeGroupRequest } from "@/actions/groupRequest"

function StatusBadge({ status }) {
  const config = {
    pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-500", border: "border-amber-100" },
    approved: { label: "Approved", bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100" },
    rejected: { label: "Rejected", bg: "bg-rose-50", text: "text-rose-400", border: "border-rose-100" },
  }
  const c = config[status] || config.pending
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  )
}

function MemberRequestCard({ memberRequest, onApprove, onReject }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const user = memberRequest.user
  const isProcessed = memberRequest.status !== "pending"

  const handleApprove = () => {
    setError("")
    startTransition(async () => {
      const result = await onApprove(memberRequest._id.toString())
      if (result?.error) setError(result.error)
    })
  }

  const handleReject = () => {
    setError("")
    startTransition(async () => {
      const result = await onReject(memberRequest._id.toString())
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className={`bg-white rounded-[2rem] border transition-all ${
      memberRequest.status === "approved" ? "border-emerald-100" :
      memberRequest.status === "rejected" ? "border-rose-100 opacity-60" :
      "border-slate-100 hover:border-sky-100 hover:shadow-md hover:shadow-sky-500/5"
    }`}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-sm font-black text-slate-400 flex-shrink-0">
            {user?.fullname?.charAt(0) || user?.username?.charAt(0) || "?"}
          </div>

          {/* Info user */}
          <div className="flex-1 min-w-0">
            <p className="font-black text-slate-800 text-sm truncate">
              {user?.fullname || user?.username || "Unknown User"}
            </p>
            <p className="text-[10px] text-slate-400 font-bold truncate">{user?.email || "—"}</p>
          </div>

          <StatusBadge status={memberRequest.status} />
        </div>

        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mb-4">
          Requested {new Date(memberRequest.createdAt).toLocaleDateString("id-ID", {
            day: "numeric", month: "short", year: "numeric"
          })}
        </p>

        {error && (
          <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider mb-3">{error}</p>
        )}

        {/* Action buttons — hanya tampil kalau masih pending */}
        {!isProcessed && (
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              disabled={isPending}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-40 shadow-lg shadow-emerald-500/10"
            >
              {isPending ? "..." : "✓ Approve"}
            </button>
            <button
              onClick={handleReject}
              disabled={isPending}
              className="flex-1 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-400 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-40"
            >
              {isPending ? "..." : "✕ Reject"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ManageGroupRequestClient({ groupRequest, memberRequests, service }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const pendingCount = memberRequests.filter(r => r.status === "pending").length
  const approvedCount = memberRequests.filter(r => r.status === "approved").length

  const handleApprove = async (memberRequestId) => {
    const result = await approveMemberRequest(memberRequestId)
    if (!result?.error) router.refresh()
    return result
  }

  const handleReject = async (memberRequestId) => {
    const result = await rejectMemberRequest(memberRequestId)
    if (!result?.error) router.refresh()
    return result
  }

  const handleClose = () => {
    startTransition(async () => {
      const result = await closeGroupRequest(groupRequest._id.toString())
      if (result?.error) setError(result.error)
      else router.push("/dashboard/explore")
    })
  }

  const statusConfig = {
    open: { label: "Open", bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100" },
    full: { label: "Full", bg: "bg-amber-50", text: "text-amber-500", border: "border-amber-100" },
    closed: { label: "Closed", bg: "bg-slate-100", text: "text-slate-400", border: "border-slate-200" },
  }
  const sc = statusConfig[groupRequest.status] || statusConfig.open

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link
              href="/dashboard/explore"
              className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Explore</span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Manage <span className="text-sky-500">Requests.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">
              {pendingCount} Pending · {approvedCount} Approved
            </p>
          </div>

          {/* Tombol close group — hanya tampil kalau masih open */}
          {groupRequest.status === "open" && (
            <button
              onClick={handleClose}
              disabled={isPending}
              className="bg-white border border-slate-100 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-400 hover:border-rose-100 transition-all shadow-sm disabled:opacity-40"
            >
              Close Group
            </button>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm p-8 mb-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 flex-shrink-0">
              {service?.logo ? (
                <img src={service.logo} className="w-9 h-9 object-contain" alt={service.serviceName} />
              ) : (
                <span className="text-sky-400 text-2xl font-black uppercase">
                  {groupRequest.title?.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-800">{groupRequest.title}</h2>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${sc.bg} ${sc.text} ${sc.border}`}>
                  {sc.label}
                </span>
              </div>
              {groupRequest.description && (
                <p className="text-sm text-slate-400 font-medium">{groupRequest.description}</p>
              )}
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Slots</p>
              <p className="text-2xl font-black text-slate-800">
                {groupRequest.availableSlot}
                <span className="text-slate-300 text-sm font-bold"> / {groupRequest.maxSlot}</span>
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-rose-50 rounded-2xl border border-rose-100">
              <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider">{error}</p>
            </div>
          )}
        </div>

        {/* Member Requests */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Incoming Requests
            </h2>
            <div className="h-px flex-1 bg-slate-100 mx-6 hidden md:block"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              {memberRequests.length} Total
            </span>
          </div>

          {memberRequests.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-slate-200 font-black">?</span>
              </div>
              <h3 className="text-slate-900 font-black mb-1">No Requests Yet</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                Share your group link so others can find it.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memberRequests.map((req) => (
                <MemberRequestCard
                  key={req._id.toString()}
                  memberRequest={req}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}