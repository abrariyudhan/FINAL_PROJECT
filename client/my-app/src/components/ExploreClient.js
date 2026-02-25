"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { sendMemberRequest } from "@/actions/groupRequest"
import { useRouter } from "next/navigation"
import { FiArrowLeft, FiSearch, FiLayers, FiUsers, FiLock, FiPlus, FiArrowUpRight } from "react-icons/fi"

function SectionHeader({ title, count, active }) {
  return (
    <div className="flex items-center gap-4 mb-8 px-4">
      <h2 className="text-2xl font-black uppercase tracking-tight">
        {title}
      </h2>
      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
        active 
          ? "bg-emerald-50 text-emerald-600" 
          : "bg-slate-100 text-slate-400"
      }`}>
        {count} {count === 1 ? "Group" : "Groups"}
      </span>
    </div>
  )
}

// Status Badge untuk request user
function StatusBadge({ status }) {
  const config = {
    pending: { label: "PENDING", color: "text-amber-500" },
    approved: { label: "APPROVED", color: "text-emerald-500" },
    rejected: { label: "REJECTED", color: "text-rose-500" },
  }
  const c = config[status] || config.pending
  return (
    <span className={`text-[10px] font-black tracking-widest ${c.color}`}>
      {c.label}
    </span>
  )
}

// Group Status (Full/Closed)
function GroupStatusBadge({ status }) {
  if (status === "open") return null
  const label = status === "full" ? "FULL" : "CLOSED"
  return (
    <span className="text-[9px] font-black tracking-[0.2em] px-2 py-1 bg-slate-100 text-slate-400 rounded border border-slate-200 uppercase">
      {label}
    </span>
  )
}

// Card untuk satu GroupRequest
function GroupRequestCard({ groupRequest, requestStatus, currentUserId, inactive, pendingCount }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const isOwner = groupRequest.owner?._id?.toString() === currentUserId ||
    groupRequest.ownerId?.toString() === currentUserId

  const isFull = groupRequest.status === "full"
  const isClosed = groupRequest.status === "closed"
  const isInactive = isFull || isClosed
  const hasRequested = !!requestStatus

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

  const logo = groupRequest.service?.logo || groupRequest.logo || null
  const serviceName = groupRequest.service?.serviceName || groupRequest.serviceName || "Unknown Service"
  const category = groupRequest.service?.category || groupRequest.category || "Other"

  return (
    <div className={`bg-white border ${isInactive ? "border-slate-100 opacity-60" : "border-slate-200 hover:border-slate-900"} rounded-lg transition-all overflow-hidden flex flex-col shadow-sm group`}>
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 border border-slate-100 rounded bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            {logo ? (
              <img src={logo} className="w-8 h-8 object-contain" alt={serviceName} />
            ) : (
              <span className="font-black text-slate-300 uppercase text-lg">{serviceName.charAt(0)}</span>
            )}
          </div>
          <GroupStatusBadge status={groupRequest.status} />
        </div>

        <div className="space-y-1 mb-6">
          <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-tight line-clamp-1">
            {groupRequest.title}
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            {serviceName} • {category}
          </p>
        </div>

        {groupRequest.description && (
          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mb-8 italic">
            "{groupRequest.description}"
          </p>
        )}

        {/* ✅ Grid dengan 3 kolom jika ada pending requests */}
        <div className={`grid ${pendingCount > 0 ? 'grid-cols-3' : 'grid-cols-2'} gap-4 pt-6 border-t border-slate-50`}>
          <div>
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Slots Left</span>
            <p className="text-sm font-black">
              {groupRequest.availableSlot} <span className="text-slate-300">/ {groupRequest.maxSlot}</span>
            </p>
          </div>
          <div>
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Owner</span>
            <p className="text-sm font-black truncate uppercase">
              {isOwner ? "You" : (groupRequest.owner?.username || "Admin")}
            </p>
          </div>
          
          {/* ✅ Tampilkan Request Queue jika ada */}
          {pendingCount > 0 && (
            <div>
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue</span>
              <p className="text-sm font-black text-amber-500">
                {pendingCount} <span className="text-slate-300 text-xs">waiting</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 pb-8">
        {error && <p className="text-[10px] font-bold text-rose-500 mb-4 uppercase tracking-wider">{error}</p>}
        
        {isOwner ? (
          <Link
            href={`/dashboard/group-requests/${groupRequest._id}`}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-sm shadow-slate-200"
          >
            Manage Group
          </Link>
        ) : isInactive ? (
          <div className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-400 rounded text-[10px] font-black uppercase tracking-[0.2em] cursor-not-allowed border border-slate-100">
             Unavailable
          </div>
        ) : hasRequested ? (
          <div className="w-full flex flex-col items-center justify-center gap-1 py-4 bg-white border border-slate-200 rounded">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Your Request</span>
            <StatusBadge status={requestStatus} />
          </div>
        ) : (
          <button
            onClick={handleRequest}
            disabled={isPending}
            className="w-full bg-white border-2 border-slate-900 text-slate-900 py-4 rounded text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30"
          >
            {isPending ? "Sending..." : "Request to Join"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function ExploreClient({ groupRequests, myRequests, currentUserId, pendingCounts }) {
  const [search, setSearch] = useState("")

  const requestStatusMap = myRequests.reduce((acc, req) => {
    acc[req.groupRequestId?.toString()] = req.status
    return acc
  }, {})

  const filtered = groupRequests.filter((gr) => {
    const q = search.toLowerCase()
    return (
      gr.title?.toLowerCase().includes(q) ||
      gr.service?.serviceName?.toLowerCase().includes(q) ||
      gr.serviceName?.toLowerCase().includes(q) ||
      gr.description?.toLowerCase().includes(q)
    )
  })

  const activeGroups = filtered.filter((gr) => gr.status === "open")
  const inactiveGroups = filtered.filter((gr) => gr.status !== "open")

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:px-12 md:py-12 font-sans text-slate-900 antialiased">
      <div className="max-w-7xl mx-auto">

        {/* --- Header --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-4 gap-8">
          <div className="space-y-4">
            <Link 
              href="/dashboard" 
              className="group flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest"
            >
              <FiArrowLeft strokeWidth={3} /> Dashboard
            </Link>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Explore <span className="text-slate-400">Hub</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/group-requests" 
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-sm"
            >
              <FiLayers strokeWidth={3} size={16} /> My Groups
            </Link>
            
            <Link
              href="/dashboard/group-requests/create"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <FiPlus strokeWidth={3} size={16} />
              New Group
            </Link>
          </div>
        </header>

        {/* --- Search Bar --- */}
        <div className="bg-white border border-slate-200 p-2 rounded-lg mb-12 shadow-sm flex items-center">
          <div className="px-4 text-slate-400">
            <FiSearch size={20} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH GROUP SUBSCRIPTION BY SERVICE OR KEYWORD..."
            className="w-full py-4 px-2 outline-none text-xs font-bold uppercase tracking-widest placeholder:text-slate-300"
          />
        </div>

        {/* --- Main Content --- */}
        {filtered.length === 0 ? (
          <div className="mt-8 text-center py-24 bg-white border border-slate-200 rounded-lg">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">No groups matching your search</p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Section: Active */}
            {activeGroups.length > 0 && (
              <div>
                <SectionHeader title="Available Groups to Join" count={activeGroups.length} active={true} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeGroups.map((gr) => (
                    <GroupRequestCard
                      key={gr._id.toString()}
                      groupRequest={gr}
                      requestStatus={requestStatusMap[gr._id.toString()]}
                      currentUserId={currentUserId}
                      pendingCount={pendingCounts[gr._id.toString()] || 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section: Inactive */}
            {inactiveGroups.length > 0 && (
              <div className="opacity-80">
                <SectionHeader title="Closed Group Subscription" count={inactiveGroups.length} active={false} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {inactiveGroups.map((gr) => (
                    <GroupRequestCard
                      key={gr._id.toString()}
                      groupRequest={gr}
                      requestStatus={requestStatusMap[gr._id.toString()]}
                      currentUserId={currentUserId}
                      inactive={true}
                      pendingCount={pendingCounts[gr._id.toString()] || 0}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}