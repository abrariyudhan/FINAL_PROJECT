import { differenceInDays, format, startOfDay } from "date-fns";
import Link from "next/link";

export default function SubCard({ sub }) {
  const today = startOfDay(new Date())
  const billDate = startOfDay(new Date(sub.billingDate))
  const cycle = Number(sub.billingCycle) || 1

  const diffDays = differenceInDays(billDate, today)

  const getCycleLabel = (c) => {
    const labels = { 1: "Mo", 3: "Qt", 6: "Sa", 12: "Yr" }
    return labels[c] || `${c}M`
  }

  const renderStatusBadge = () => {
    if (diffDays === 0) {
      return (
        <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border border-orange-100">
          Due Today
        </span>
      )
    }
    if (diffDays > 0) {
      return (
        <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border ${
          diffDays <= 3 
            ? "bg-rose-50 text-rose-500 border-rose-100 animate-pulse" 
            : "bg-emerald-50 text-emerald-500 border-emerald-100" 
        }`}>
          {diffDays} Days Left
        </span>
      )
    }
    return (
      <span className="bg-slate-50 text-slate-400 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border border-slate-100">
        Overdue
      </span>
    )
  }

  return (
    <Link href={`/dashboard/${sub._id.toString()}`}>
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-7 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all group relative overflow-hidden h-full flex flex-col justify-between">
        
        <div className="absolute top-7 right-7">
          {sub.isReminderActive ? (
            <div className="text-sky-400 bg-sky-50 p-2 rounded-xl shadow-sm border border-sky-100/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
          ) : (
            <div className="text-slate-200 p-2 opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            
            <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center overflow-hidden transition-all group-hover:rotate-6 duration-300 ${
              !sub.logo 
                ? (diffDays < 0 ? 'bg-rose-50 text-rose-400 border border-rose-100' : 'bg-slate-900 text-white shadow-lg shadow-slate-200')
                : 'bg-white border border-slate-100'
            }`}>
              {sub.logo ? (
                <img 
                  src={sub.logo} 
                  alt={sub.serviceName} 
                  className="w-full h-full object-contain p-2.5" 
                />
              ) : (
                <span className="font-black text-xl uppercase">
                  {sub.serviceName.charAt(0)}
                </span>
              )}
            </div>
            
            <div className="min-w-0 pr-8">
              <h3 className="font-black text-slate-800 text-lg leading-none truncate group-hover:text-sky-500 transition-colors">
                {sub.serviceName}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                  {sub.category}
                </span>
                <span className="text-[9px] text-sky-400 font-black uppercase tracking-[0.15em]">
                  • {sub.type || "Personal"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-1">Total Payment</label>
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

        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">
              {diffDays < 0 ? "Expired" : "Next Bill"}
            </span>
            <span className={`text-xs font-black ${diffDays < 0 ? 'text-rose-500' : 'text-slate-800'}`}>
              {format(billDate, 'dd MMM yyyy')}
            </span>
          </div>

          <div className="flex-shrink-0">
            {renderStatusBadge()}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </div>
    </Link>
  )
}