import Link from "next/link";
import { differenceInDays, startOfDay, format } from "date-fns";
import { FiChevronRight } from "react-icons/fi";

export default function SubTable({ subscriptions, today }) {
  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Details</th>
              <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Cycle</th>
              <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
              <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Amount</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subscriptions.map((sub) => {
              const billDate = startOfDay(new Date(sub.billingDate));
              const diffDays = differenceInDays(billDate, today);

              return (
                <tr key={sub._id.toString()} className="hover:bg-slate-50/50 transition-colors group">
                  {/* Service Details */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded border flex items-center justify-center overflow-hidden flex-shrink-0 ${
                        !sub.logo ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'
                      }`}>
                        {sub.logo ? (
                          <img 
                            src={sub.logo} 
                            alt={sub.serviceName} 
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <span className="font-black text-xs uppercase">
                            {sub.serviceName.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-black text-slate-900 text-sm tracking-tight truncate uppercase">
                          {sub.serviceName}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {sub.category}
                          </span>
                          <span className="text-[10px] text-[#0099FF] font-black uppercase tracking-widest">
                            • {sub.type || 'Individual'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Cycle */}
                  <td className="px-6 py-6 text-center">
                    <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-sm uppercase tracking-tighter border border-slate-200">
                      {sub.billingCycle === 1 ? 'Monthly' : `${sub.billingCycle} Months`}
                    </span>
                  </td>

                  {/* Status: Structured with Underlines instead of Bulky Pills */}
                  <td className="px-6 py-6 text-center">
                    {diffDays === 0 && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 border-b-2 border-orange-200 pb-0.5">
                        Due Today
                      </span>
                    )}
                    {diffDays > 0 && (
                      <span className={`text-[10px] font-black uppercase tracking-widest pb-0.5 border-b-2 ${
                        diffDays <= 3 ? "text-rose-600 border-rose-200" : "text-emerald-600 border-emerald-200"
                      }`}>
                        {diffDays} Days Left
                      </span>
                    )}
                    {diffDays < 0 && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">
                        Overdue
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-6 text-right">
                    <p className="text-sm font-black text-slate-900 tracking-tight">
                      Rp {sub.pricePaid?.toLocaleString("id-ID") || 0}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                      {diffDays < 0 ? 'Expired' : 'Next bill'}: {format(billDate, 'dd MMM')}
                    </p>
                  </td>

                  {/* Action Link: Sharp Industrial Style */}
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/dashboard/${sub._id.toString()}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded border border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all bg-white shadow-sm"
                    >
                      <FiChevronRight strokeWidth={3} size={14} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}