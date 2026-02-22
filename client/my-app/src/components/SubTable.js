import Link from "next/link";
import { differenceInDays, startOfDay, format } from "date-fns";

export default function SubTable({ subscriptions, today }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">Service Details</th>
              <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Cycle</th>
              <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Payment Status</th>
              <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] text-right">Amount</th>
              <th className="px-10 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscriptions.map((sub) => {
              const billDate = startOfDay(new Date(sub.billingDate))
              const diffDays = differenceInDays(billDate, today)

              return (
                <tr key={sub._id.toString()} className="hover:bg-slate-50/30 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 duration-300 ${
                        !sub.logo ? (diffDays < 0 ? 'bg-rose-50 text-rose-400 border border-rose-100' : 'bg-slate-900 text-white shadow-lg shadow-slate-200') : 'bg-white border border-slate-100'
                      }`}>
                        {sub.logo ? (
                          <img 
                            src={sub.logo} 
                            alt={sub.serviceName} 
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <span className="font-black text-base uppercase">
                            {sub.serviceName.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-black text-slate-800 text-sm group-hover:text-sky-500 transition-colors truncate">
                          {sub.serviceName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider italic">
                            {sub.category}
                          </span>
                          <span className="text-[9px] text-sky-400 font-black uppercase tracking-widest leading-none">
                            • {sub.type || 'Individual'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6 text-center">
                    <span className="inline-block text-[10px] font-black text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-xl uppercase tracking-tight border border-slate-100">
                      {sub.billingCycle === 1 ? 'Monthly' : `${sub.billingCycle} Months`}
                    </span>
                  </td>

                  <td className="px-6 py-6 text-center">
                    {diffDays === 0 ? (
                      <span className="bg-orange-50 text-orange-500 border border-orange-100 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">
                        Due Today
                      </span>
                    ) : diffDays > 0 ? (
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                        diffDays <= 3
                          ? "bg-rose-50 text-rose-500 border-rose-100 animate-pulse"
                          : "bg-emerald-50 text-emerald-500 border-emerald-100"
                      }`}>
                        {diffDays} Days Left
                      </span>
                    ) : (
                      <span className="bg-slate-50 text-slate-300 border border-slate-100 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic">
                        Overdue
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-6 text-right">
                    <p className="text-sm font-black text-slate-900 tracking-tight">
                      Rp {sub.pricePaid?.toLocaleString("id-ID") || 0}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">
                      {diffDays < 0 ? 'Expired' : 'Next bill'}: {format(billDate, 'dd MMM')}
                    </p>
                  </td>

                  <td className="px-10 py-6 text-right">
                    <Link href={`/dashboard/${sub._id.toString()}`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}