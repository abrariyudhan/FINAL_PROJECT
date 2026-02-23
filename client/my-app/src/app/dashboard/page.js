import { startOfDay } from "date-fns";
import Link from "next/link";
import SubCard from "@/components/SubCard";
import SubTable from "@/components/SubTable";
import { getCurrentUser } from "@/actions/auth";
import LogoutButton from "@/components/LogoutButton";
import Subscription from "@/server/models/Subscription";

export default async function DashboardPage() {

  const user = await getCurrentUser()
  const subscriptions = user.userId ? await Subscription.getByUser(user.userId) : []

  const totalMonthly = subscriptions.reduce((acc, curr) => acc + curr.pricePaid, 0);
  const today = startOfDay(new Date())

  const statsConfig = [
    { 
      label: "Monthly Spend", 
      value: `Rp ${totalMonthly.toLocaleString("id-ID")}`, 
      textColor: "text-slate-900", 
      bgColor: "bg-white",
      accent: "bg-sky-500"
    },
    { 
      label: "Active Subs", 
      value: subscriptions.length, 
      textColor: "text-slate-900", 
      bgColor: "bg-white",
      accent: "bg-emerald-400"
    },
    { 
      label: "Next Renewal", 
      value: subscriptions[0]?.serviceName || "-", 
      textColor: "text-slate-900", 
      bgColor: "bg-white",
      accent: "bg-violet-400"
    },
    { 
      label: "Savings", 
      value: "Rp 0", 
      textColor: "text-slate-900", 
      bgColor: "bg-white",
      accent: "bg-orange-400"
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              My <span className="text-sky-500">Subscriptions.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">
              Managing {subscriptions.length} Active Services
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm font-bold text-slate-500 hidden md:block">
                Hi, {user.fullname || user.username}
              </span>
            )}
            <Link href="/dashboard/add-subscription" className="hidden md:flex bg-slate-900 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 items-center gap-3 active:scale-95">
              <span className="text-lg leading-none">+</span> Add Subscription
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {statsConfig.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group transition-all hover:shadow-lg`}>

              <div className={`absolute top-0 left-0 w-1.5 h-full ${stat.accent} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
              
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mb-3">{stat.label}</p>
              <h2 className={`text-lg md:text-xl font-black ${stat.textColor} tracking-tighter`}>{stat.value}</h2>
            </div>
          ))}
        </div>

        <div className="mb-10 md:hidden space-y-3">
            <Link href="/dashboard/explore" className="bg-white text-slate-900 px-6 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 flex items-center gap-3 w-full justify-center active:scale-95 transition-all border border-slate-100">
                <span className="text-lg">🔍</span> Explore Groups
            </Link>
            <Link href="/dashboard/add-subscription" className="bg-slate-900 text-white px-6 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-300 flex items-center gap-3 w-full justify-center active:scale-95 transition-all">
                <span className="text-lg">+</span> Add Subscription
            </Link>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Subscription List</h2>
            <div className="h-px flex-1 bg-slate-100 mx-6 hidden md:block"></div>
            <Link href="/dashboard/explore" className="hidden md:flex bg-white hover:bg-sky-50 text-slate-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-slate-200 items-center gap-3 active:scale-95 border border-slate-100">
              <span className="text-lg leading-none">🔍</span> Explore Groups
            </Link>
          </div>
 
          <div className="hidden md:block">
            <SubTable subscriptions={subscriptions} today={today} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:hidden">
            {subscriptions.map((sub) => (
              <SubCard key={sub._id.toString()} sub={sub} />
            ))}
          </div>
        </div>
        
        {subscriptions.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100">
             <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-12">
               <span className="text-3xl text-slate-200 font-black">?</span>
             </div>
             <h3 className="text-slate-900 font-black text-lg mb-1">No Data Found</h3>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Your dashboard is looking a bit empty.</p>
          </div>
        )}

      </div>
    </div>
  )
}