import { startOfDay } from "date-fns";
import Link from "next/link";
import SubCard from "@/components/SubCard";
import SubTable from "@/components/SubTable";
import { getCurrentUser } from "@/actions/auth";
import LogoutButton from "@/components/LogoutButton";
import Subscription from "@/server/models/Subscription";

export default async function DashboardPage() {

  const user = await getCurrentUser()

  // Subscription milik sendiri (sebagai owner)
  const ownedSubscriptions = user.userId ? await Subscription.getByUser(user.userId) : []

  // Subscription yang diikuti sebagai member (join group sharing)
  const { getDb } = await import("@/server/config/mongodb")
  const { ObjectId } = await import("mongodb")
  const db = await getDb()

  const memberDocs = await db.collection("members")
    .find({ userId: user.userId })
    .toArray()

  const joinedSubscriptions = await Promise.all(
    memberDocs
      .filter((m) => m.subscriptionId)
      .map(async (m) => {
        try {
          const sub = await db.collection("subscriptions").findOne({
            _id: new ObjectId(m.subscriptionId.toString())
          })
          return sub ? { ...sub, _isJoined: true } : null
        } catch { return null }
      })
  )

  // Gabungkan, hindari duplikat
  const joinedFiltered = joinedSubscriptions.filter(Boolean)
  const subscriptions = [
    ...ownedSubscriptions,
    ...joinedFiltered.filter(
      (j) => !ownedSubscriptions.find(
        (o) => o._id.toString() === j._id.toString()
      )
    )
  ]

  const totalMonthly = subscriptions.reduce((acc, curr) => acc + curr.pricePaid, 0);
  const today = startOfDay(new Date())

  const statsConfig = [
    {
      label: "Monthly Spend",
      value: `Rp ${totalMonthly.toLocaleString("id-ID")}`,
      textColor: "text-slate-900",
      bgGradient: "from-blue-50 to-cyan-50",
      icon: "💰",
      accentColor: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      label: "Active Subs",
      value: subscriptions.length,
      textColor: "text-slate-900",
      bgGradient: "from-purple-50 to-pink-50",
      icon: "📊",
      accentColor: "bg-gradient-to-r from-purple-500 to-pink-400"
    },
    {
      label: "Next Renewal",
      value: subscriptions[0]?.serviceName || "-",
      textColor: "text-slate-900",
      bgGradient: "from-emerald-50 to-teal-50",
      icon: "🔔",
      accentColor: "bg-gradient-to-r from-emerald-500 to-teal-400"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50 border border-blue-100">
          <div className="space-y-2">
            <img
              src="https://i.ibb.co.com/1tJPNJP7/Sub-Track8-cropped-removebg.png"
              alt="SubTrack8 Logo"
              className="w-48 md:w-56 lg:w-64 h-auto"
            />
            <p className="text-xs text-slate-500 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></span>
              Managing {subscriptions.length} Active Services
            </p>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden md:block bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-3 rounded-2xl border border-blue-100">
                <p className="text-xs text-slate-500 font-medium">Welcome back,</p>
                <p className="text-sm font-bold text-slate-900">{user.fullname || user.username}</p>
              </div>
            )}
            <Link 
              href="/dashboard/add-subscription" 
              className="hidden md:flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-200 items-center gap-2 active:scale-95"
            >
              <span className="text-xl leading-none">+</span> 
              <span>Add Subscription</span>
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statsConfig.map((stat, i) => (
            <div 
              key={i} 
              className={`bg-gradient-to-br ${stat.bgGradient} p-8 rounded-3xl border border-white/50 shadow-xl shadow-slate-200/50 relative overflow-hidden group transition-all hover:scale-105 hover:shadow-2xl`}
            >
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.accentColor}`}></div>

              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Content */}
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <h2 className={`text-3xl font-black ${stat.textColor} tracking-tight`}>
                {stat.value}
              </h2>

              {/* Hover Effect Bar */}
              <div className={`absolute top-0 right-0 w-1 h-0 ${stat.accentColor} group-hover:h-full transition-all duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Mobile Action Buttons */}
        <div className="mb-10 md:hidden space-y-3">
          <Link 
            href="/dashboard/explore" 
            className="bg-white hover:bg-blue-50 text-slate-900 px-6 py-5 rounded-2xl font-bold text-sm shadow-lg shadow-slate-200 flex items-center gap-3 w-full justify-center active:scale-95 transition-all border border-slate-200"
          >
            <span className="text-2xl">🔍</span> 
            <span>Explore Groups</span>
          </Link>
          <Link 
            href="/dashboard/add-subscription" 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 flex items-center gap-3 w-full justify-center active:scale-95 transition-all"
          >
            <span className="text-2xl">+</span> 
            <span>Add Subscription</span>
          </Link>
        </div>

        {/* Subscription List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                📋
              </div>
              <h2 className="text-lg font-black text-slate-800">Your Subscriptions</h2>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-6 hidden md:block"></div>
            <Link 
              href="/dashboard/explore" 
              className="hidden md:flex bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 text-slate-900 px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-slate-200 items-center gap-3 active:scale-95 border border-slate-200"
            >
              <span className="text-xl leading-none">🔍</span> 
              <span>Explore Groups</span>
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <SubTable subscriptions={JSON.parse(JSON.stringify(subscriptions))} today={today} />
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {subscriptions.map((sub) => (
              <SubCard key={sub._id.toString()} sub={sub} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {subscriptions.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-blue-200 shadow-xl shadow-blue-100/50">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-5xl">📭</span>
            </div>
            <h3 className="text-slate-900 font-black text-2xl mb-3">No Subscriptions Yet</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              Start adding your subscriptions to track your expenses and never miss a payment!
            </p>
            <Link 
              href="/dashboard/add-subscription"
              className="inline-flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 items-center gap-2 transition-all active:scale-95"
            >
              <span className="text-xl">+</span>
              <span>Add Your First Subscription</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}