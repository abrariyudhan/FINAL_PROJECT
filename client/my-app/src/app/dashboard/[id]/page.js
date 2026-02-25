import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import { format } from "date-fns";
import Link from "next/link";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { FiArrowLeft, FiEdit3, FiCalendar, FiBell, FiLayers, FiUsers, FiDollarSign } from "react-icons/fi";

export default async function SubscriptionDetailPage({ params }) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user.userId) redirect("/dashboard")
  
  try {
    const { getDb } = await import("@/server/config/mongodb")
    const db = await getDb()

    let sub = null
    let isOwner = true
    try {
      sub = await Subscription.getByUserAndId(user.userId, id)
    } catch {
      isOwner = false
      const memberDoc = await db.collection("members").findOne({
        subscriptionId: id,
        userId: user.userId
      })
      if (!memberDoc) redirect("/dashboard")
      sub = await Subscription.getById(id)
    }

    const members = await Member.getBySubscriptionId(id)

    // CALCULATION LOGIC
    const cycle = Number(sub.billingCycle) || 1
    const totalPeople = 1 + members.length
    const pricePerPerson = Math.round(sub.pricePaid / totalPeople)
    const pricePerMonth = Math.round(pricePerPerson / cycle)

    return (
      <div className="min-h-screen bg-[#FBFBFB] p-6 md:px-12 md:py-12 font-sans text-slate-900 antialiased">
        <div className="max-w-7xl mx-auto">

          {/* --- Header Navigation: Clean & Professional --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="space-y-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase text-[10px] font-black tracking-[0.2em]">
                <FiArrowLeft strokeWidth={3} /> Back to Dashboard
              </Link>
              <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                Subscription <span className="text-slate-400">Details</span>
              </h1>
            </div>

            {isOwner && (
              <Link
                href={`/dashboard/${id}/edit`}
                className="bg-slate-900 hover:bg-slate-800 px-8 py-4 rounded-md text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-lg active:scale-95 flex items-center gap-3"
              >
                <FiEdit3 size={14} />
                <span>Edit Settings</span>
              </Link>
            )}
          </div>

          {/* --- Main Content Layout --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Information Sections */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Profile Card */}
              <div className="bg-white p-8 md:p-10 border border-slate-200 rounded-lg shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  {/* Logo Container */}
                  <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    {sub.logo ? (
                      <img src={sub.logo} alt={sub.serviceName} className="w-16 h-16 object-contain" />
                    ) : (
                      <span className="text-slate-200 text-5xl font-black">{sub.serviceName.charAt(0)}</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-900">{sub.serviceName}</h2>
                        {sub.isReminderActive && (
                          <div className="bg-slate-900 p-2 rounded text-white" title="Reminders Active">
                            <FiBell size={16} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-100 text-slate-500 rounded border border-slate-200">
                          {sub.category}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded border ${sub.type === "Family" ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-900 border-slate-200'}`}>
                          {sub.type === "Family" ? "Family Plan" : "Individual"}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded">
                        <FiCalendar className="text-slate-400" />
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Next Billing Date</p>
                          <p className="text-sm font-bold text-slate-900">{format(new Date(sub.billingDate), 'dd MMMM yyyy')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded">
                        <FiBell className={sub.isReminderActive ? "text-blue-500" : "text-slate-300"} />
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reminder Set For</p>
                          <p className="text-sm font-bold text-slate-900">
                            {sub.isReminderActive ? format(new Date(sub.reminderDate), 'dd MMMM yyyy') : "DISABLED"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Members Section */}
              {sub.type === "Family" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-2">
                    <FiUsers className="text-slate-900" strokeWidth={3} />
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Plan Members ({members.length})</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.length === 0 ? (
                      <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No other members added yet</p>
                      </div>
                    ) : (
                      members.map((m) => (
                        <div key={m._id.toString()} className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-lg hover:border-slate-900 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-black text-xs">
                              {m.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase tracking-tight text-slate-900">{m.name}</p>
                              <p className="text-[10px] font-medium text-slate-400">{m.email || m.phone || "Personal Member"}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-black text-slate-900">Rp {pricePerPerson.toLocaleString("id-ID")}</p>
                            <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Due from them</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Financial Summary */}
            <div className="lg:sticky lg:top-12 h-fit">
              <div className="bg-slate-900 rounded-lg p-8 text-white shadow-2xl space-y-10 relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                    <FiDollarSign className="text-blue-500" strokeWidth={3} />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Payment Breakdown</p>
                  </div>

                  {/* Pricing Info */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4">
                      {sub.type === "Family" ? "Your Share" : "Total Cost"}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-black text-slate-600 uppercase">Rp</span>
                      <span className="text-5xl font-black tracking-tighter">
                        {sub.type === "Family" ? pricePerPerson.toLocaleString("id-ID") : sub.pricePaid.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Secondary Financial Data */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Monthly Eq.</p>
                      <p className="text-lg font-black text-white">Rp {pricePerMonth.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Cycle</p>
                      <p className="text-lg font-black text-white">{cycle === 12 ? 'ANNUAL' : `${cycle} MONTHS`}</p>
                    </div>
                  </div>

                  {/* Summary Note */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded">
                    <p className="text-[10px] font-medium text-blue-300 leading-relaxed uppercase tracking-tight">
                      {sub.type === "Family"
                        ? `Total bill of Rp ${sub.pricePaid.toLocaleString("id-ID")} split among ${totalPeople} people.`
                        : "Individual plan. No split applied."}
                    </p>
                  </div>
                </div>

                {/* Decorative Icon */}
                <div className="absolute -bottom-10 -right-10 opacity-10">
                   <FiLayers size={200} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 bg-[#FBFBFB]">
        <div className="text-center bg-white p-12 border border-slate-200 rounded-lg max-w-lg shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
             <span className="text-2xl font-black">!</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Error Loading Data</h1>
          <p className="text-slate-400 mb-8 font-medium text-xs tracking-wide">
            We couldn't retrieve the subscription information. Please try again later.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-flex bg-slate-900 text-white px-8 py-4 rounded font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }
}