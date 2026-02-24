"use client"

import Link from "next/link"

// Badge status GroupRequest
function GroupStatusBadge({ status }) {
  const config = {
    open: { label: "✓ Open", bg: "bg-gradient-to-br from-emerald-50 to-teal-50", text: "text-emerald-600", border: "border-emerald-200" },
    full: { label: "🔒 Full", bg: "bg-gradient-to-br from-amber-50 to-orange-50", text: "text-amber-600", border: "border-amber-200" },
    closed: { label: "⊘ Closed", bg: "bg-gradient-to-br from-slate-50 to-slate-100", text: "text-slate-500", border: "border-slate-200" },
  }
  const c = config[status] || config.closed
  return (
    <span className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border shadow-sm ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  )
}

// Section header
function SectionHeader({ title, subtitle, accent }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`w-3 h-12 rounded-full ${accent} shadow-lg`} />
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
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
    <div className={`bg-white rounded-3xl border shadow-xl hover:shadow-2xl transition-all overflow-hidden group relative ${isInactive ? "border-slate-200 opacity-70" : "border-slate-100 hover:border-blue-200 hover:-translate-y-1"}`}>
      
      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top accent bar */}
      <div className={`h-2 w-full ${groupRequest.status === "open" ? "bg-gradient-to-r from-blue-500 to-cyan-400" : groupRequest.status === "full" ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-slate-200 to-slate-300"}`} />

      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-5 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
            {logo ? (
              <img src={logo} className="w-10 h-10 object-contain" alt={serviceName} />
            ) : (
              <span className="text-blue-500 text-2xl font-black uppercase">
                {serviceName.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-black text-slate-800 text-lg leading-tight">{groupRequest.title}</h3>
              <GroupStatusBadge status={groupRequest.status} />
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span>📦</span>
              {serviceName}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
              <span>👥</span>
              <span>Slots</span>
            </p>
            <p className="text-2xl font-black text-slate-800">
              {groupRequest.availableSlot}
              <span className="text-slate-400 text-base font-bold">/{groupRequest.maxSlot}</span>
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
              <span>✓</span>
              <span>Active</span>
            </p>
            <p className="text-2xl font-black text-emerald-600">{groupRequest.approvedCount}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
              <span>⏳</span>
              <span>Wait</span>
            </p>
            <p className="text-2xl font-black text-amber-600">{groupRequest.pendingCount}</p>
          </div>
        </div>

        {/* Manage button */}
        <Link
          href={`/dashboard/group-requests/${groupRequest._id}`}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-blue-200 text-blue-500 text-xs font-bold uppercase tracking-wider hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
        >
          <span>⚙️</span>
          <span>Manage Group</span>
          <span>→</span>
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
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl hover:border-emerald-200 transition-all overflow-hidden group relative hover:-translate-y-1">

      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top accent bar */}
      <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />

      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-5 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
            {logo ? (
              <img src={logo} className="w-10 h-10 object-contain" alt={serviceName} />
            ) : (
              <span className="text-emerald-500 text-2xl font-black uppercase">
                {serviceName.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-black text-slate-800 text-lg leading-tight">{groupRequest.title}</h3>
              <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                ✓ Joined
              </span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span>📦</span>
              {serviceName}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>👤</span>
              <span>Owner</span>
            </p>
            <p className="text-sm font-black text-slate-700 truncate">{ownerName}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>📊</span>
              <span>Slots</span>
            </p>
            <p className="text-sm font-black text-slate-700">
              {groupRequest.availableSlot}
              <span className="text-slate-400 font-bold"> / {groupRequest.maxSlot}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        {groupRequest.description && (
          <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
              💬 {groupRequest.description}
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
    <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-blue-200 shadow-xl shadow-blue-100/50">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-12">
        <span className="text-5xl">📭</span>
      </div>
      <h3 className="text-slate-900 font-black text-2xl mb-3">No Groups Yet</h3>
      <p className="text-slate-500 text-sm font-medium">{message}</p>
    </div>
  )
}

export default function MyGroupRequestsClient({ myGroupRequests, joinedGroups }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                <span className="text-xs font-bold uppercase tracking-wider">Back to Dashboard</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                My <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Groups</span>
              </h1>
              <p className="text-sm text-slate-500 flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></span>
                  <span className="font-bold text-slate-900">{myGroupRequests.length}</span> owned
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-pulse"></span>
                  <span className="font-bold text-slate-900">{joinedGroups.length}</span> joined
                </span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Link
                href="/dashboard/explore"
                className="bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <span>🔍</span>
                <span>Explore Groups</span>
              </Link>
              <Link
                href="/dashboard/group-requests/create"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95"
              >
                <span className="text-xl leading-none">+</span>
                <span>Create Group</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Section 1: My Groups (Owner) */}
        <div className="mb-16">
          <SectionHeader
            title="Groups I Own"
            subtitle={`${myGroupRequests.length} group request${myGroupRequests.length !== 1 ? "s" : ""} created`}
            accent="bg-gradient-to-b from-blue-500 to-cyan-400"
          />
          {myGroupRequests.length === 0 ? (
            <EmptyState message="You haven't created any groups yet. Start sharing subscriptions!" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            subtitle={`${joinedGroups.length} group${joinedGroups.length !== 1 ? "s" : ""} joined as member`}
            accent="bg-gradient-to-b from-emerald-500 to-teal-400"
          />
          {joinedGroups.length === 0 ? (
            <EmptyState message="You haven't joined any groups yet. Explore available groups to save costs!" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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