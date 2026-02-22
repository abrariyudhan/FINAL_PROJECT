"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { sendMemberRequest } from "@/actions/groupRequest"
import { useRouter } from "next/navigation"

// Badge status untuk request yang sudah dikirim user
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

// Card untuk satu GroupRequest
function GroupRequestCard({ groupRequest, requestStatus, currentUserId }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const isOwner = groupRequest.owner?._id?.toString() === currentUserId || 
                  groupRequest.ownerId?.toString() === currentUserId

  const isFull = groupRequest.status === "full"
  const hasRequested = !!requestStatus
  const isApproved = requestStatus === "approved"

  const handleRequest = () => {
    setError("")
    startTransition(async () => {
      const result = await sendMemberRequest(groupRequest._id.toString())
      if (result?.error) {
        setError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  const logo = groupRequest.service?.logo || null
  const serviceName = groupRequest.service?.serviceName || "Unknown Service"

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-lg hover:border-sky-50 transition-all overflow-hidden group">
      
      {/* Top accent bar */}
      <div className={`h-1 w-full ${isFull ? "bg-slate-200" : "bg-sky-400"}`} />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-5 mb-6">
          <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 shadow-sm flex-shrink-0">
            {logo ? (
              <img src={logo} className="w-8 h-8 object-contain" alt={serviceName} />
            ) : (
              <span className="text-sky-400 text-xl font-black uppercase">
                {serviceName.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-black text-slate-800 text-base leading-tight">{groupRequest.title}</h3>
              {isFull && (
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-400 rounded-lg flex-shrink-0">
                  Full
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{serviceName}</p>
          </div>
        </div>

        {/* Description */}
        {groupRequest.description && (
          <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed line-clamp-2">
            {groupRequest.description}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Slots Left</p>
            <p className="text-xl font-black text-slate-800">
              {groupRequest.availableSlot}
              <span className="text-slate-300 text-sm font-bold"> / {groupRequest.maxSlot}</span>
            </p>
          </div>
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Owner</p>
            <p className="text-sm font-black text-slate-700 truncate">
              {isOwner ? "You" : (groupRequest.owner?.fullname || groupRequest.owner?.username || "—")}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider mb-4 px-1">{error}</p>
        )}

        {/* Action Button */}
        {isOwner ? (
          <Link
            href={`/dashboard/group-requests/${groupRequest._id}`}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-sky-300 hover:text-sky-500 transition-all"
          >
            Manage →
          </Link>
        ) : hasRequested ? (
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Your Request</span>
            <StatusBadge status={requestStatus} />
          </div>
        ) : (
          <button
            onClick={handleRequest}
            disabled={isPending || isFull}
            className="w-full bg-slate-900 hover:bg-sky-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isPending ? "Sending..." : isFull ? "No Slots Available" : "Request to Join →"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function ExploreClient({ groupRequests, myRequests, currentUserId }) {
  const [search, setSearch] = useState("")

  // Buat map dari groupRequestId → status untuk cek request user
  const requestStatusMap = myRequests.reduce((acc, req) => {
    acc[req.groupRequestId?.toString()] = req.status
    return acc
  }, {})

  // Filter berdasarkan search
  const filtered = groupRequests.filter((gr) => {
    const q = search.toLowerCase()
    return (
      gr.title?.toLowerCase().includes(q) ||
      gr.service?.serviceName?.toLowerCase().includes(q) ||
      gr.description?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard</span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Explore <span className="text-sky-500">Groups.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">
              {groupRequests.length} Open Sharing Available
            </p>
          </div>

          <Link
            href="/dashboard/group-requests/create"
            className="bg-slate-900 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center gap-3 active:scale-95 w-fit"
          >
            <span className="text-lg leading-none">+</span> Open My Group
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by service or title..."
            className="w-full max-w-md p-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 shadow-sm placeholder:text-slate-300 transition-all"
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-12">
              <span className="text-3xl text-slate-200 font-black">?</span>
            </div>
            <h3 className="text-slate-900 font-black text-lg mb-1">No Groups Found</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">
              {search ? "Try a different search term." : "No open sharing groups yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((gr) => (
              <GroupRequestCard
                key={gr._id.toString()}
                groupRequest={gr}
                requestStatus={requestStatusMap[gr._id.toString()]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}