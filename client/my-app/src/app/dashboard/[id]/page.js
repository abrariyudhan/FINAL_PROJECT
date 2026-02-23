import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import { format } from "date-fns";
import Link from "next/link";
import { getCurrentUser } from "@/actions/auth";

export default async function SubscriptionDetailPage({ params }) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user.userId) {
    redirect("/")
  }
  
  try {
    const sub = await Subscription.getByUserAndId(user.userId, id)
    const members = await Member.getBySubscriptionId(id)

    // LOGIKA PERHITUNGAN
    const cycle = Number(sub.billingCycle) || 1
    const totalPeople = 1 + members.length
    const pricePerPerson = Math.round(sub.pricePaid / totalPeople)
    const pricePerMonth = Math.round(pricePerPerson / cycle)

    return (
      <div className="min-h-screen bg-[#FBFCFE] p-6 md:p-10 font-sans text-slate-800">
        <div className="max-w-4xl mx-auto">

          <div className="flex justify-between items-center mb-10">
            <Link href="/dashboard" className="group flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors">
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Back</span>
            </Link>
            <Link
              href={`/dashboard/${id}/edit`}
              className="bg-white border border-slate-100 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 hover:border-sky-100 transition-all shadow-sm"
            >
              Edit Details
            </Link>
          </div>

          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-50 overflow-hidden mb-10">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                <div className="space-y-8 flex-1 w-full">
                  <div className="flex items-center gap-6">

                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center overflow-hidden shadow-sm border border-slate-100">
                      {sub.logo ? (
                        <img 
                          src={sub.logo} 
                          alt={sub.serviceName} 
                          className="w-full h-full object-contain p-4" 
                        />
                      ) : (
                        <span className="text-sky-500 text-4xl font-black uppercase">
                          {sub.serviceName.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-black tracking-tight text-slate-800">{sub.serviceName}</h1>
                        {sub.isReminderActive && (
                          <div className="text-violet-400 bg-violet-50 p-2 rounded-full" title="Reminder Active">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">
                          {sub.category}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-sky-50 text-sky-600 rounded-lg border border-sky-100">
                          {sub.type || "Individual"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50/50 rounded-[1.5rem] border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">Next Billing</p>
                      <p className="text-sm font-bold text-slate-700">{format(new Date(sub.billingDate), 'dd MMMM yyyy')}</p>
                    </div>
                    <div className="p-5 bg-slate-50/50 rounded-[1.5rem] border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">Reminder Date</p>
                      <p className="text-sm font-bold text-slate-700">
                        {sub.isReminderActive ? format(new Date(sub.reminderDate), 'dd MMMM yyyy') : "Disabled"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <div className="p-8 bg-white rounded-[2.5rem] border border-sky-50 w-full md:min-w-[340px] shadow-xl shadow-sky-500/5 relative overflow-hidden">
                    
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-50 rounded-full blur-3xl opacity-60"></div>

                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Financial Summary</p>

                    <div className="space-y-8">
                      <div>
                        <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-2">
                          {sub.type === "Family" ? "Your Share" : "Total Bill"}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-slate-800 tracking-tighter">
                            Rp {sub.type === "Family" ? pricePerPerson.toLocaleString("id-ID") : sub.pricePaid.toLocaleString("id-ID")}
                          </span>
                          {sub.type === "Family" && <span className="text-slate-400 text-xs font-bold uppercase">/pax</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-50">
                        <div>
                          <p className="text-slate-400 text-[9px] font-bold uppercase mb-1">Monthly Eq.</p>
                          <p className="text-base font-black text-sky-500">
                            Rp {pricePerMonth.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-[9px] font-bold uppercase mb-1">Cycle</p>
                          <p className="text-base font-black text-slate-700">
                            {cycle === 12 ? 'Annual' : `${cycle} Months`}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                        <p className="text-slate-500 text-[10px] font-medium leading-relaxed italic">
                          {sub.type === "Family"
                            ? `Total bill Rp ${sub.pricePaid.toLocaleString("id-ID")} split with ${members.length} others.`
                            : "Personal subscription billed to your account."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {sub.type === "Family" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-6">
                <h2 className="text-xl font-black tracking-tight text-slate-800">Group Members</h2>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white border border-slate-100 px-4 py-1.5 rounded-full shadow-sm">
                  {members.length} Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.length === 0 ? (
                  <div className="col-span-full py-16 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-100">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No members added yet.</p>
                  </div>
                ) : (
                  members.map((m) => (
                    <div key={m._id.toString()} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-50 hover:border-sky-100 hover:shadow-lg hover:shadow-sky-500/5 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors">
                          {m.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-700 text-sm truncate">{m.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium truncate uppercase tracking-tight">{m.email || m.phone || "No Contact"}</p>
                        </div>
                      </div>
                      <div className="text-right border-l border-slate-50 pl-5">
                        <p className="text-xs font-black text-slate-800 leading-none">Rp {pricePerPerson.toLocaleString("id-ID")}</p>
                        <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-1.5">Owes You</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 bg-[#FBFCFE]">
        <div className="text-center">
          <h1 className="text-8xl font-black text-slate-100 mb-4">!</h1>
          <p className="text-slate-500 mb-8 font-bold uppercase tracking-widest text-xs">Data not found or deleted.</p>
          <Link href="/dashboard" className="bg-sky-400 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-sky-100 transition hover:bg-sky-500">
            Return Home
          </Link>
        </div>
      </div>
    )
  }
}