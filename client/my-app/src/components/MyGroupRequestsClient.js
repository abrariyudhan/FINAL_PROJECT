"use client"

import Link from "next/link"
import { FiArrowLeft, FiPlus, FiSearch, FiSettings, FiCheckCircle, FiUser, FiBox } from "react-icons/fi"

// Status Badge untuk Group Status
function GroupStatusBadge({ status }) {
  const config = {
    open: { label: "OPEN", color: "text-emerald-500" },
    full: { label: "FULL", color: "text-amber-500" },
    closed: { label: "CLOSED", color: "text-slate-400" },
  }
  const c = config[status] || config.closed
  return (
    <span className={`text-[10px] font-black tracking-widest ${c.color} border border-current px-2 py-0.5 rounded`}>
      {c.label}
    </span>
  )
}

// Section header
function SectionHeader({ title, subtitle, active }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className={`w-1 h-8 ${active ? "bg-slate-900" : "bg-slate-200"} rounded-full`} />
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">{title}</h2>
        {subtitle && (
          <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 uppercase">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

// Card untuk GroupRequest yang dimiliki owner
function OwnerGroupCard({ groupRequest }) {
  const logo = groupRequest.service?.logo || null
  const serviceName = groupRequest.service?.serviceName || "Unknown Service"
  const isInactive = groupRequest.status !== "open"

  return (
    <div className={`bg-white border ${isInactive ? "border-slate-100 opacity-70" : "border-slate-200 hover:border-slate-900"} rounded-lg transition-all flex flex-col shadow-sm group`}>
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 border border-slate-100 rounded bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            {logo ? (
              <img src={logo} className="w-8 h-8 object-contain" alt={serviceName} />
            ) : (
              <FiBox className="text-slate-300 text-xl" />
            )}
          </div>
          <GroupStatusBadge status={groupRequest.status} />
        </div>

        <div className="space-y-1 mb-8">
          <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight line-clamp-1">{groupRequest.title}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{serviceName}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-50">
          <div className="text-center border-r border-slate-50">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Slots</span>
            <p className="text-sm font-black text-slate-900">{groupRequest.availableSlot}<span className="text-slate-300">/{groupRequest.maxSlot}</span></p>
          </div>
          <div className="text-center border-r border-slate-50">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active</span>
            <p className="text-sm font-black text-emerald-500">{groupRequest.approvedCount}</p>
          </div>
          <div className="text-center">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue</span>
            <p className="text-sm font-black text-amber-500">{groupRequest.pendingCount}</p>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 mt-auto">
        <Link
          href={`/dashboard/group-requests/${groupRequest._id}`}
          className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-sm"
        >
          <FiSettings size={12} /> Manage Group
        </Link>
      </div>
    </div>
  )
}

// Card untuk GroupRequest yang sudah di-join sebagai member
function JoinedGroupCard({ groupRequest }) {
  const logo = groupRequest.service?.logo || null
  const serviceName = groupRequest.service?.serviceName || "Unknown Service"
  const ownerName = groupRequest.owner?.fullname || groupRequest.owner?.username || "Admin"

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm group hover:border-emerald-500 transition-all">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 border border-slate-100 rounded bg-white flex items-center justify-center shadow-sm">
            {logo ? (
              <img src={logo} className="w-8 h-8 object-contain" alt={serviceName} />
            ) : (
              <FiBox className="text-slate-300 text-xl" />
            )}
          </div>
          <span className="text-[9px] font-black tracking-[0.2em] px-2 py-1 bg-emerald-50 text-emerald-600 rounded border border-emerald-100 uppercase flex items-center gap-1">
            <FiCheckCircle size={10} strokeWidth={3} /> Joined
          </span>
        </div>

        <div className="space-y-1 mb-8">
          <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight line-clamp-1">{groupRequest.title}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{serviceName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 mb-6">
          <div>
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
              <FiUser size={10} /> Host
            </span>
            <p className="text-xs font-black text-slate-700 truncate uppercase tracking-tight">{ownerName}</p>
          </div>
          <div>
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Capacity</span>
            <p className="text-xs font-black text-slate-700">
              {groupRequest.availableSlot} <span className="text-slate-300">/ {groupRequest.maxSlot}</span>
            </p>
          </div>
        </div>

        {groupRequest.description && (
          <div className="bg-slate-50 p-4 rounded border border-slate-100">
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic line-clamp-2 uppercase tracking-tight">
              "{groupRequest.description}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Empty state
function EmptyState({ message }) {
  return (
    <div className="text-center py-24 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
        <FiBox className="text-slate-300 text-2xl" />
      </div>
      <h3 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-2">No Records Found</h3>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">{message}</p>
    </div>
  )
}

export default function MyGroupRequestsClient({ myGroupRequests, joinedGroups }) {
  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:px-12 md:py-12 font-sans text-slate-900 antialiased">
      <div className="max-w-7xl mx-auto">

        {/* --- Header --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-16 px-4 gap-8">
          <div className="space-y-4">
            <Link 
              href="/dashboard" 
              className="group flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest"
            >
              <FiArrowLeft strokeWidth={3} /> Dashboard
            </Link>
            <h1 className="text-4xl font-black tracking-tighter uppercase">My <span className="text-slate-400">Groups</span></h1>
            
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-widest">{myGroupRequests.length} Owned</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{joinedGroups.length} Joined</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard/explore"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-900 rounded text-[10px] font-black uppercase tracking-widest hover:border-slate-900 transition-all shadow-sm"
            >
              <FiSearch size={14} /> Explore Groups
            </Link>
            <Link
              href="/dashboard/group-requests/create"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <FiPlus size={16} strokeWidth={3} /> New Group
            </Link>
          </div>
        </header>

        {/* --- Section 1: Owned --- */}
        <section className="mb-24">
          <SectionHeader
            title="Managed Groups"
            subtitle="Groups currently under your administration"
            active={true}
          />
          {myGroupRequests.length === 0 ? (
            <EmptyState message="You haven't initiated any sharing groups. Create your first group subscription to start." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myGroupRequests.map((gr) => (
                <OwnerGroupCard key={gr._id.toString()} groupRequest={gr} />
              ))}
            </div>
          )}
        </section>

        {/* --- Section 2: Joined --- */}
        <section className="pb-12">
          <SectionHeader
            title="Active Memberships"
            subtitle="Third-party groups where you are a registered member"
            active={false}
          />
          {joinedGroups.length === 0 ? (
            <EmptyState message="No active memberships detected. Browse the hub to find groups to join." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {joinedGroups.map((gr) => (
                <JoinedGroupCard key={gr._id.toString()} groupRequest={gr} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}