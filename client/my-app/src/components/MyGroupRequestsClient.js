"use client"

import Link from "next/link"

// Badge status GroupRequest
function GroupStatusBadge({ status }) {
  const config = {
    open: { label: "Open", bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100" },
    full: { label: "Full", bg: "bg-amber-50", text: "text-amber-500", border: "border-amber-100" },
    closed: { label: "Closed", bg: "bg-slate-100", text: "text-slate-400", border: "border-slate-200" },
  }
  const c = config[status] || config.closed
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border flex-shrink-0 ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  )
}

// Section header
function SectionHeader({ title, subtitle, accent }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-2 h-8 rounded-full ${accent}`} />
      <div>
        <h2 className="text-lg font-black text-slate-800">{title}</h2>
        {subtitle && (
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{subtitle}</p>
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
    <div className={`bg-white rounded-[2.5rem] border shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-lg transition-all overflow-hidden ${isInactive ? "border-slate-100 opacity-70" : "border-slate-50 hover:border-sky-50"}`}>
      
      {/* Top accent bar */}
      <div className={`h-1 w-full ${groupRequest.status === "open" ? "bg-sky-400" : groupRequest.status === "full" ? "bg-amber-300" : "bg-slate-200"}`} />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center border border-slate-100 flex-shrink-0">
            {logo ? (
              <img src={logo} className="w-7 h-7 object-contain" alt={serviceName} />
            ) : (
              <span className="text-sky-400 text-lg font-black uppercase">
                {serviceName.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-black text-slate-800 text-sm leading-tight">{groupRequest.title}</h3>
              <GroupStatusBadge status={groupRequest.status} />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{serviceName}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Slots</p>
            <p className="text-base font-black text-slate-800">
              {groupRequest.availableSlot}
              <span className="text-slate-300 text-xs font-bold">/{groupRequest.maxSlot}</span>
            </p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <p className="text-[8px] font-black text-emerald-400 uppercase tracking-wider mb-1">Members</p>
            <p className="text-base font-black text-emerald-600">{groupRequest.approvedCount}</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-center">
            <p className="text-[8px] font-black text-amber-400 uppercase tracking-wider mb-1">Pending</p>
            <p className="text-base font-black text-amber-600">{groupRequest.pendingCount}</p>
          </div>
        </div>

        {/* Manage button */}
        <Link
          href={`/dashboard/group-requests/${groupRequest._id}`}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-sky-300 hover:text-sky-500 transition-all"
        >
          Manage →
        </Link>
      </div>
    </div>
  )
}

// Card untuk GroupRequest yang sudah di-join sebagai member
function JoinedGroupCard({ groupRequest }) {
  const logo = groupRequest.service?.logo || null
  const serviceName = groupRequest.service?.serviceName || "Unknown Service"
  const ownerName = groupRequest.owner?.fullname || groupRequest.owner?.username || "Unknown"

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-lg hover:border-emerald-50 transition-all overflow-hidden">

      {/* Top accent bar */}
      <div className="h-1 w-full bg-emerald-400" />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center border border-slate-100 flex-shrink-0">
            {logo ? (
              <img src={logo} className="w-7 h-7 object-contain" alt={serviceName} />
            ) : (
              <span className="text-emerald-400 text-lg font-black uppercase">
                {serviceName.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-black text-slate-800 text-sm leading-tight mb-1">{groupRequest.title}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{serviceName}</p>
          </div>

          <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border flex-shrink-0 bg-emerald-50 text-emerald-500 border-emerald-100">
            Joined
          </span>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Owner</p>
            <p className="text-xs font-black text-slate-700 truncate">{ownerName}</p>
          </div>
          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Slots Left</p>
            <p className="text-xs font-black text-slate-700">
              {groupRequest.availableSlot}
              <span className="text-slate-300 font-bold"> / {groupRequest.maxSlot}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        {groupRequest.description && (
          <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
            {groupRequest.description}
          </p>
        )}
      </div>
    </div>
  )
}

// Empty state
function EmptyState({ message }) {
  return (
    <div className="text-center py-16 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
      <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 transform rotate-12">
        <span className="text-2xl text-slate-200 font-black">?</span>
      </div>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">{message}</p>
    </div>
  )
}

export default function MyGroupRequestsClient({ myGroupRequests, joinedGroups }) {
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
              My <span className="text-sky-500">Groups.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">
              {myGroupRequests.length} owned · {joinedGroups.length} joined
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard/explore"
              className="bg-white border border-slate-100 hover:border-sky-200 text-slate-600 hover:text-sky-500 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-sm flex items-center gap-2 w-fit"
            >
              Explore Groups
            </Link>
            <Link
              href="/dashboard/group-requests/create"
              className="bg-slate-900 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center gap-3 active:scale-95 w-fit"
            >
              <span className="text-lg leading-none">+</span> New Group Open Sharing
            </Link>
          </div>
        </div>

        {/* Section 1: My Groups (Owner) */}
        <div className="mb-14">
          <SectionHeader
            title="Groups I Own"
            subtitle={`${myGroupRequests.length} group request${myGroupRequests.length !== 1 ? "s" : ""} created`}
            accent="bg-sky-400"
          />
          {myGroupRequests.length === 0 ? (
            <EmptyState message="You haven't opened any groups yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGroupRequests.map((gr) => (
                <OwnerGroupCard key={gr._id.toString()} groupRequest={gr} />
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Groups I Joined */}
        <div>
          <SectionHeader
            title="Groups I Joined"
            subtitle={`${joinedGroups.length} group${joinedGroups.length !== 1 ? "s" : ""} joined`}
            accent="bg-emerald-400"
          />
          {joinedGroups.length === 0 ? (
            <EmptyState message="You haven't joined any groups yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedGroups.map((gr) => (
                <JoinedGroupCard key={gr._id.toString()} groupRequest={gr} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}