import { startOfDay } from "date-fns";
import Link from "next/link";
import SubCard from "@/components/SubCard";
import SubTable from "@/components/SubTable";
import { getCurrentUser } from "@/actions/auth";
import LogoutButton from "@/components/LogoutButton";
import Subscription from "@/server/models/Subscription";

// Icons: Feather Icons
import { FiPlus, FiActivity, FiArrowUpRight, FiClock, FiLayers, FiMessageSquare } from "react-icons/fi";
import Navbar from "@/components/Navbar";

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // --- LOGIC TETAP (TIDAK DIUBAH) ---
  const ownedSubscriptions = user.userId ? await Subscription.getByUser(user.userId) : []
  const { getDb } = await import("@/server/config/mongodb")
  const { ObjectId } = await import("mongodb")
  const db = await getDb()

  const memberDocs = await db.collection("members").find({ userId: user.userId }).toArray()
  const joinedSubscriptions = await Promise.all(
    memberDocs.filter((m) => m.subscriptionId).map(async (m) => {
      try {
        const sub = await db.collection("subscriptions").findOne({
          _id: new ObjectId(m.subscriptionId.toString())
        })
        return sub ? { ...sub, _isJoined: true } : null
      } catch { return null }
    })
  )
  const joinedFiltered = joinedSubscriptions.filter(Boolean)
  const subscriptions = [
    ...ownedSubscriptions,
    ...joinedFiltered.filter((j) => !ownedSubscriptions.find((o) => o._id.toString() === j._id.toString()))
  ]

  const totalMonthly = subscriptions.reduce((acc, curr) => acc + curr.pricePaid, 0);
  const today = startOfDay(new Date())

  const statsConfig = [
    {
      label: "MONTHLY SPEND",
      value: `Rp ${totalMonthly.toLocaleString("id-ID")}`,
      icon: <FiActivity size={18} />,
    },
    {
      label: "TOTAL SERVICES",
      value: subscriptions.length,
      icon: <FiLayers size={18} />,
    },
    {
      label: "NEXT RENEWAL",
      value: subscriptions[0]?.serviceName || "-",
      icon: <FiClock size={18} />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:px-12 md:py-12 font-sans text-slate-900 antialiased">
      <div className="max-w-7xl mx-auto">

        {/* --- Header: Clean & Structured --- */}
        

        {/* --- Stats: Structured Boxes with Subtle Borders --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-8 border border-slate-200 bg-white rounded-lg shadow-sm overflow-hidden">
          {statsConfig.map((stat, i) => (
            <div 
              key={i} 
              className={`p-10 flex flex-col gap-4 ${i !== statsConfig.length - 1 ? "md:border-r border-slate-200" : ""} border-b md:border-b-0 border-slate-200`}
            >
              <div className="flex items-center gap-3 text-slate-400">
                {stat.icon}
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* --- Main Content Section --- */}
        <div className="space-y-6">
          
          {/* Action Hub & Navigation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-slate-200 p-6 rounded-lg gap-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-slate-900 rounded-full"></div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest">Service Registry</h2>
                <p className="text-xs text-slate-400 font-medium tracking-wide">Active management of current subscriptions</p>
              </div>
            </div>

            <div className="flex items-center gap-8 pr-4">
              <Link 
                href="/dashboard/add-subscription" 
                className="flex items-center gap-2 text-xs font-black text-slate-900 hover:text-[#0099FF] transition-all uppercase tracking-widest"
              >
                <FiPlus strokeWidth={3} /> Add Service
              </Link>

              <Link 
                href="/chat" 
                className="flex items-center gap-2 text-xs font-black text-slate-900 hover:text-[#0099FF] transition-all uppercase tracking-widest"
              >
                <FiMessageSquare /> Chat
              </Link>
              
              <Link 
                href="/dashboard/explore" 
                className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-900 transition-all uppercase tracking-widest"
              >
                Explore <FiArrowUpRight />
              </Link>
            </div>
          </div>

          {/* Table Area (Sharp & Structured) */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="hidden md:block">
              <SubTable subscriptions={JSON.parse(JSON.stringify(subscriptions))} today={today} />
            </div>
            {/* Mobile View */}
            <div className="md:hidden divide-y divide-slate-200">
              {subscriptions.map((sub) => (
                <SubCard key={sub._id.toString()} sub={sub} />
              ))}
            </div>
          </div>
        </div>

        {/* --- Empty State --- */}
        {subscriptions.length === 0 && (
          <div className="mt-8 text-center py-24 bg-white border border-slate-200 rounded-lg">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mb-6">System Registry Empty</p>
            <Link 
              href="/dashboard/add-subscription"
              className="inline-block bg-slate-900 text-white px-10 py-4 rounded-md font-bold text-xs tracking-[0.2em] transition-all uppercase hover:bg-slate-800"
            >
              Initialize First Subscription
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}