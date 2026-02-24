"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { approveMemberRequest, rejectMemberRequest, closeGroupRequest } from "@/actions/groupRequest"
import { useRouter } from "next/navigation"

// Badge untuk status MemberRequest
function RequestStatusBadge({ status }) {
  const config = {
    pending: { label: "⏳ Pending", bg: "bg-gradient-to-br from-amber-50 to-orange-50", text: "text-amber-600", border: "border-amber-200" },
    approved: { label: "✓ Approved", bg: "bg-gradient-to-br from-emerald-50 to-teal-50", text: "text-emerald-600", border: "border-emerald-200" },
    rejected: { label: "✕ Rejected", bg: "bg-gradient-to-br from-rose-50 to-red-50", text: "text-rose-600", border: "border-rose-200" },
  }
  const c = config[status] || config.pending
  return (
    <span className={`text-xs font-bold px-4 py-2 rounded-xl border shadow-sm ${c.bg} ${c.text} ${c.border} uppercase tracking-wider`}>
      {c.label}
    </span>
  )
}

// Badge untuk status GroupRequest
function GroupStatusBadge({ status }) {
  const config = {
    open: { label: "✓ Open", bg: "bg-gradient-to-br from-emerald-50 to-teal-50", text: "text-emerald-600", border: "border-emerald-200" },
    full: { label: "🔒 Full", bg: "bg-gradient-to-br from-amber-50 to-orange-50", text: "text-amber-600", border: "border-amber-200" },
    closed: { label: "⊘ Closed", bg: "bg-gradient-to-br from-slate-50 to-slate-100", text: "text-slate-500", border: "border-slate-200" },
  }
  const c = config[status] || config.open
  return (
    <span className={`text-sm font-bold px-6 py-3 rounded-2xl border shadow-md ${c.bg} ${c.text} ${c.border} uppercase tracking-wider`}>
      {c.label}
    </span>
  )
}

export default function ManageGroupRequestClient({ groupRequest, memberRequests, service }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleApprove = (requestId) => {
    startTransition(async () => {
      await approveMemberRequest(requestId)
      router.refresh()
    })
  }

  const handleReject = (requestId) => {
    startTransition(async () => {
      await rejectMemberRequest(requestId)
      router.refresh()
    })
  }

  const handleClose = () => {
    if (confirm("Are you sure you want to close this group? This action cannot be undone.")) {
      startTransition(async () => {
        await closeGroupRequest(groupRequest._id.toString())
        router.refresh()
      })
    }
  }

  const pendingRequests = memberRequests.filter((r) => r.status === "pending")
  const approvedRequests = memberRequests.filter((r) => r.status === "approved")
  const rejectedRequests = memberRequests.filter((r) => r.status === "rejected")

  const isClosed = groupRequest.status === "closed"
  const serviceName = service?.serviceName || "Unknown Service"
  const logo = service?.logo || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <Link
                href="/dashboard/group-requests"
                className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                <span className="text-xs font-bold uppercase tracking-wider">Back to My Groups</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Manage <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Group</span>
              </h1>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></span>
                {pendingRequests.length} pending request{pendingRequests.length !== 1 ? "s" : ""}
              </p>
            </div>

            {!isClosed && (
              <button
                onClick={handleClose}
                disabled={isPending}
                className="bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-700 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-rose-200 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">🔒</span>
                <span>{isPending ? "Closing..." : "Close Group"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Group Info Card */}
        <div className="mb-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Top accent bar */}
          <div className={`h-2 w-full ${groupRequest.status === "open" ? "bg-gradient-to-r from-blue-500 to-cyan-400" : groupRequest.status === "full" ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-slate-200 to-slate-300"}`} />

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left section */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-6">
                  {/* Logo */}
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl flex items-center justify-center border border-blue-100 shadow-lg flex-shrink-0">
                    {logo ? (
                      <img src={logo} className="w-16 h-16 object-contain" alt={serviceName} />
                    ) : (
                      <span className="text-blue-500 text-4xl font-black uppercase">
                        {serviceName.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="text-3xl font-black text-slate-800 leading-tight">{groupRequest.title}</h2>
                      <GroupStatusBadge status={groupRequest.status} />
                    </div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2 mb-4">
                      <span>📦</span>
                      {serviceName}
                    </p>
                    {groupRequest.description && (
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        {groupRequest.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 lg:min-w-[280px]">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 shadow-sm">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span>📊</span>
                    <span>Slots</span>
                  </p>
                  <p className="text-2xl font-black text-slate-800">
                    {groupRequest.availableSlot}
                    <span className="text-slate-400 text-base font-bold">/{groupRequest.maxSlot}</span>
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 shadow-sm">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span>✓</span>
                    <span>Active</span>
                  </p>
                  <p className="text-2xl font-black text-emerald-600">{approvedRequests.length}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 shadow-sm">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span>⏳</span>
                    <span>Pending</span>
                  </p>
                  <p className="text-2xl font-black text-amber-600">{pendingRequests.length}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl border border-rose-100 shadow-sm">
                  <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span>✕</span>
                    <span>Reject</span>
                  </p>
                  <p className="text-2xl font-black text-rose-600">{rejectedRequests.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Sections */}
        <div className="space-y-12">
          
          {/* Pending Requests */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-12 rounded-full bg-gradient-to-b from-amber-500 to-orange-400 shadow-lg" />
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Pending Requests</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  {pendingRequests.length} waiting for approval
                </p>
              </div>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-amber-200 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-4xl">⏳</span>
                </div>
                <p className="text-slate-500 text-sm font-bold">No pending requests at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingRequests.map((req) => (
                  <div
                    key={req._id.toString()}
                    className="bg-white rounded-3xl border border-amber-100 shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                  >
                    <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-400" />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center border border-amber-100 shadow-md">
                          <span className="text-amber-500 text-2xl font-black uppercase">
                            {req.user?.fullname?.charAt(0) || req.user?.username?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-800 text-lg truncate">
                            {req.user?.fullname || req.user?.username || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-400 font-medium truncate">
                            {req.user?.email || "No email"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(req._id.toString())}
                          disabled={isPending || isClosed}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <span>✓</span>
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(req._id.toString())}
                          disabled={isPending || isClosed}
                          className="flex-1 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-700 hover:to-red-600 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <span>✕</span>
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Approved Members */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-12 rounded-full bg-gradient-to-b from-emerald-500 to-teal-400 shadow-lg" />
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Approved Members</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  {approvedRequests.length} active member{approvedRequests.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {approvedRequests.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-emerald-200 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-4xl">👥</span>
                </div>
                <p className="text-slate-500 text-sm font-bold">No approved members yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedRequests.map((req) => (
                  <div
                    key={req._id.toString()}
                    className="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                  >
                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-md">
                          <span className="text-emerald-500 text-2xl font-black uppercase">
                            {req.user?.fullname?.charAt(0) || req.user?.username?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-800 text-base truncate">
                            {req.user?.fullname || req.user?.username || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-400 font-medium truncate">
                            {req.user?.email || "No email"}
                          </p>
                          <RequestStatusBadge status="approved" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rejected Requests */}
          {rejectedRequests.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-12 rounded-full bg-gradient-to-b from-slate-200 to-slate-300 shadow-lg" />
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Rejected Requests</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                    {rejectedRequests.length} declined request{rejectedRequests.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedRequests.map((req) => (
                  <div
                    key={req._id.toString()}
                    className="bg-white rounded-3xl border border-rose-100 shadow-lg opacity-70 overflow-hidden"
                  >
                    <div className="h-2 bg-gradient-to-r from-rose-400 to-red-400" />
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl flex items-center justify-center border border-rose-100 shadow-md">
                          <span className="text-rose-500 text-2xl font-black uppercase">
                            {req.user?.fullname?.charAt(0) || req.user?.username?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-600 text-base truncate">
                            {req.user?.fullname || req.user?.username || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-400 font-medium truncate">
                            {req.user?.email || "No email"}
                          </p>
                          <RequestStatusBadge status="rejected" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}