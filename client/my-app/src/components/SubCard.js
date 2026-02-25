import { differenceInDays, format, startOfDay } from "date-fns";
import Link from "next/link";
import { FiBell, FiBellOff } from "react-icons/fi";

export default function SubCard({ sub }) {
  const today = startOfDay(new Date())
  const billDate = startOfDay(new Date(sub.billingDate))
  const cycle = Number(sub.billingCycle) || 1
  const diffDays = differenceInDays(billDate, today)

  const getCycleLabel = (c) => {
    const labels = { 1: "MONTH", 3: "QUARTER", 6: "SEMI-ANNUAL", 12: "YEAR" }
    return labels[c] || `${c}M`
  }

  const renderStatus = () => {
    if (diffDays === 0) {
      return (
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 border-b-2 border-orange-200 pb-0.5">
          Due Today
        </span>
      )
    }
    if (diffDays > 0) {
      return (
        <span className={`text-[10px] font-black uppercase tracking-widest pb-0.5 border-b-2 ${
          diffDays <= 3 ? "text-rose-600 border-rose-200" : "text-emerald-600 border-emerald-200"
        }`}>
          {diffDays} Days Left
        </span>
      )
    }
    return (
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">
        Overdue
      </span>
    )
  }

  return (
    <Link href={`/dashboard/${sub._id.toString()}`} className="block h-full">
      <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-all group relative flex flex-col justify-between h-full shadow-sm">
        
        {/* Reminder Icon - Minimalist */}
        <div className="absolute top-6 right-6">
          {sub.isReminderActive ? (
            <FiBell size={14} className="text-[#0099FF]" />
          ) : (
            <FiBellOff size={14} className="text-slate-200" />
          )}
        </div>

        <div className="space-y-6">
          {/* Header Card */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded border flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105 ${
              !sub.logo ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'
            }`}>
              {sub.logo ? (
                <img src={sub.logo} alt={sub.serviceName} className="w-full h-full object-contain p-2" />
              ) : (
                <span className="font-black text-sm uppercase">{sub.serviceName.charAt(0)}</span>
              )}
            </div>
            
            <div className="min-w-0">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight truncate group-hover:text-[#0099FF] transition-colors">
                {sub.serviceName}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{sub.category}</span>
                <span className="text-[10px] text-[#0099FF] font-black uppercase tracking-widest">• {sub.type || "Personal"}</span>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="pt-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Amount</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                Rp {sub.pricePaid?.toLocaleString("id-ID") || 0}
              </span>
              <span className="text-[10px] font-black text-slate-300 uppercase">
                / {getCycleLabel(cycle)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Card */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
              {diffDays < 0 ? "Expired" : "Renewal"}
            </span>
            <span className={`text-xs font-black uppercase ${diffDays < 0 ? 'text-rose-500' : 'text-slate-900'}`}>
              {format(billDate, 'dd MMM yyyy')}
            </span>
          </div>

          <div className="mb-0.5">
            {renderStatus()}
          </div>
        </div>

        {/* Highlight Stripe on Hover */}
        <div className="absolute top-0 left-0 w-1 h-0 bg-slate-900 group-hover:h-full transition-all duration-300 rounded-l-lg"></div>
      </div>
    </Link>
  )
}