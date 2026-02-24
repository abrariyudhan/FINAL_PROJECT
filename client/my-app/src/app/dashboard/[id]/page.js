import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import { format } from "date-fns";
import Link from "next/link";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function SubscriptionDetailPage({ params }) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user.userId) {
    redirect("/dashboard")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900">
        <div className="max-w-6xl mx-auto">

          {/* Header Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <Link href="/dashboard" className="group flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors">
              <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider">Back to Dashboard</span>
                <span className="block text-[10px] text-slate-400">View all subscriptions</span>
              </div>
            </Link>
            <Link
              href={`/dashboard/${id}/edit`}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center gap-2"
            >
              <span className="text-lg">✏️</span>
              <span>Edit Details</span>
            </Link>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-10">
            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12">

                {/* Left Section - Service Info */}
                <div className="space-y-8 flex-1 w-full">
                  <div className="flex items-start gap-6">
                    {/* Logo */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border-2 border-blue-100 flex-shrink-0 relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:to-cyan-400/10 transition-all"></div>
                      {sub.logo ? (
                        <img 
                          src={sub.logo} 
                          alt={sub.serviceName} 
                          className="w-16 h-16 object-contain relative z-10" 
                        />
                      ) : (
                        <span className="text-blue-500 text-5xl font-black uppercase relative z-10">
                          {sub.serviceName.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Service Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-4">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 break-words">
                          {sub.serviceName}
                        </h1>
                        {sub.isReminderActive && (
                          <div className="mt-2 flex-shrink-0 bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-2xl border border-purple-100 shadow-lg" title="Reminder Active">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 rounded-xl border border-slate-200 shadow-sm">
                          📁 {sub.category}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 rounded-xl border border-blue-200 shadow-sm">
                          {sub.type === "Family" ? "👨‍👩‍👧‍👦 Family Plan" : "👤 Individual"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">📅</span>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Next Billing</p>
                        </div>
                        <p className="text-lg font-black text-slate-800">
                          {format(new Date(sub.billingDate), 'dd MMMM yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-100 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🔔</span>
                          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Reminder Date</p>
                        </div>
                        <p className="text-lg font-black text-slate-800">
                          {sub.isReminderActive ? format(new Date(sub.reminderDate), 'dd MMMM yyyy') : "Disabled"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Financial Summary */}
                <div className="w-full lg:w-auto lg:min-w-[380px]">
                  <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white shadow-2xl border border-slate-700 relative overflow-hidden">
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 space-y-8">
                      <div className="flex items-center gap-3 pb-6 border-b border-slate-700">
                        <span className="text-3xl">💰</span>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Financial Summary</p>
                      </div>

                      {/* Main Price */}
                      <div>
                        <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                          {sub.type === "Family" ? "Your Share" : "Total Bill"}
                        </p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-2xl font-black text-slate-500">IDR</span>
                          <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                            {sub.type === "Family" ? pricePerPerson.toLocaleString("id-ID") : sub.pricePaid.toLocaleString("id-ID")}
                          </span>
                          {sub.type === "Family" && <span className="text-slate-400 text-sm font-bold uppercase">/pax</span>}
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-700">
                        <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                          <p className="text-emerald-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                            <span>📊</span>
                            <span>Monthly Eq.</span>
                          </p>
                          <p className="text-2xl font-black text-emerald-400">
                            {pricePerMonth.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                          <p className="text-cyan-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                            <span>🔄</span>
                            <span>Cycle</span>
                          </p>
                          <p className="text-2xl font-black text-cyan-400">
                            {cycle === 12 ? 'Annual' : `${cycle}mo`}
                          </p>
                        </div>
                      </div>

                      {/* Info Box */}
                      <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                        <p className="text-blue-300 text-xs leading-relaxed">
                          {sub.type === "Family"
                            ? `💡 Total bill Rp ${sub.pricePaid.toLocaleString("id-ID")} split with ${members.length} others.`
                            : "💡 Personal subscription billed to your account."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Members Section (Family Plan Only) */}
          {sub.type === "Family" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                    👥
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-800">Group Members</h2>
                    <p className="text-xs text-slate-500">Shared subscription members</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 px-6 py-3 rounded-2xl shadow-lg">
                  {members.length} Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {members.length === 0 ? (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-xl shadow-slate-200/50">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-4xl">👥</span>
                    </div>
                    <h3 className="text-slate-900 font-black text-xl mb-2">No Members Yet</h3>
                    <p className="text-slate-400 text-sm">Add family members to split costs</p>
                  </div>
                ) : (
                  members.map((m, index) => (
                    <div 
                      key={m._id.toString()} 
                      className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all group relative overflow-hidden"
                    >
                      {/* Decorative element */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="flex items-center gap-4 relative z-10 flex-1 min-w-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center text-xl font-black text-blue-500 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all shadow-md border border-blue-100">
                          {m.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-700 text-base truncate">{m.name}</p>
                          <p className="text-xs text-slate-500 font-medium truncate flex items-center gap-2">
                            {m.email ? (
                              <>
                                <span>📧</span>
                                <span>{m.email}</span>
                              </>
                            ) : m.phone ? (
                              <>
                                <span>📱</span>
                                <span>{m.phone}</span>
                              </>
                            ) : (
                              <span className="text-slate-400">No Contact</span>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right border-l border-slate-100 pl-6 ml-4 relative z-10">
                        <p className="text-lg font-black text-slate-800 leading-none">
                          Rp {pricePerPerson.toLocaleString("id-ID")}
                        </p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-2 bg-emerald-50 px-3 py-1 rounded-lg inline-block">
                          Owes You
                        </p>
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
      <div className="min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white p-16 rounded-[3rem] shadow-2xl border border-slate-100 max-w-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-6xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-4">Subscription Not Found</h1>
          <p className="text-slate-500 mb-8 font-medium text-sm">
            This subscription may have been deleted or doesn't exist.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-xl shadow-blue-200 transition-all active:scale-95"
          >
            <span className="text-xl">←</span>
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    )
  }
}