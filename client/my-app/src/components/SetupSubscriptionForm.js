"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { setupSubscriptionFromGroup } from "@/actions/subscription"

export default function SetupSubscriptionForm({ groupRequest, members, groupRequestId }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [price, setPrice] = useState(0)
  const [billingDate, setBillingDate] = useState("")
  const [reminderDate, setReminderDate] = useState("")
  const [billingCycle, setBillingCycle] = useState(1)
  const [isReminderActive, setIsReminderActive] = useState(true)

  // State untuk edit member data
  const [memberData, setMemberData] = useState(
    members.map((m) => ({
      memberId: m._id.toString(),
      name: m.name || "",
      email: m.email || "",
      phone: m.phone || "",
    }))
  )

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300 shadow-sm"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] ml-1"

  const totalPeople = memberData.length + 1 // +1 owner
  const pricePerPerson = price > 0 ? Math.round(price / totalPeople) : 0
  const monthlyEquivalent = billingCycle > 1 ? Math.round(pricePerPerson / billingCycle) : 0

  const updateMember = (index, field, value) => {
    setMemberData((prev) => prev.map((m, i) => i === index ? { ...m, [field]: value } : m))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("groupRequestId", groupRequestId)
    formData.append("serviceName", groupRequest.serviceName)
    formData.append("billingDate", billingDate)
    formData.append("reminderDate", reminderDate)
    formData.append("billingCycle", billingCycle)
    formData.append("pricePaid", price)
    formData.append("isReminderActive", isReminderActive ? "on" : "off")
    formData.append("membersData", JSON.stringify(memberData))

    const result = await setupSubscriptionFromGroup(formData)

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <Link
            href={`/dashboard/group-requests/${groupRequestId}`}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Group</span>
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Setup <span className="text-sky-500">Subscription.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium italic mt-1">
            Your group is full! Now set up the subscription details for all members.
          </p>
        </div>

        {/* Group Info Banner */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-emerald-100 flex-shrink-0">
            {groupRequest.logo ? (
              <img src={groupRequest.logo} className="w-7 h-7 object-contain" alt={groupRequest.serviceName} />
            ) : (
              <span className="text-emerald-400 font-black text-lg uppercase">{groupRequest.serviceName?.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="font-black text-emerald-700 text-sm">{groupRequest.title}</p>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
              {groupRequest.serviceName} · {members.length} members joined
            </p>
          </div>
          <span className="ml-auto text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-emerald-100 text-emerald-600 border border-emerald-200">
            Full
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">

            {/* Billing Details */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-8">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Billing Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>Billing Cycle</label>
                  <select
                    value={billingCycle}
                    onChange={(e) => setBillingCycle(Number(e.target.value))}
                    className={inputStyles}
                  >
                    <option value="1">Monthly</option>
                    <option value="3">Quarterly (3 Mo)</option>
                    <option value="6">Semi-Annually (6 Mo)</option>
                    <option value="12">Annually (1 Year)</option>
                  </select>
                </div>

                <div>
                  <label className={labelStyles}>Total Price Paid</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="0"
                    className={inputStyles}
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className={labelStyles}>Next Billing Date</label>
                  <input
                    type="date"
                    value={billingDate}
                    onChange={(e) => setBillingDate(e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyles}>Reminder Date</label>
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    max={billingDate}
                    className={inputStyles}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <input
                  type="checkbox"
                  id="isReminderActive"
                  checked={isReminderActive}
                  onChange={(e) => setIsReminderActive(e.target.checked)}
                  className="w-5 h-5 text-sky-500 rounded cursor-pointer"
                />
                <label htmlFor="isReminderActive" className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer">
                  Enable Smart Reminder
                </label>
              </div>
            </div>

            {/* Member List */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Members</h2>
                <span className="text-[10px] font-black text-sky-500 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  {memberData.length} people
                </span>
              </div>

              <div className="space-y-4">
                {memberData.map((m, index) => (
                  <div key={m.memberId} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Member {index + 1}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        value={m.name}
                        onChange={(e) => updateMember(index, "name", e.target.value)}
                        placeholder="Name"
                        className={inputStyles + " p-3"}
                        required
                      />
                      <input
                        value={m.email}
                        onChange={(e) => updateMember(index, "email", e.target.value)}
                        placeholder="Email"
                        type="email"
                        className={inputStyles + " p-3"}
                      />
                      <input
                        value={m.phone}
                        onChange={(e) => updateMember(index, "phone", e.target.value)}
                        placeholder="Phone"
                        className={inputStyles + " p-3"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:sticky lg:top-10">
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

              <div className="relative z-10 space-y-8">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Summary</label>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Service</p>
                      <p className="text-lg font-black text-white">{groupRequest.serviceName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Bill</p>
                      <p className="text-2xl font-black text-white tracking-tighter">
                        Rp {price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>

                {price > 0 && (
                  <div className="pt-6 border-t border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Total People</span>
                      <span className="text-sm font-black text-white">{totalPeople} (incl. you)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Per Person</span>
                      <span className="text-xl font-black text-emerald-400">
                        Rp {pricePerPerson.toLocaleString("id-ID")}
                      </span>
                    </div>
                    {billingCycle > 1 && (
                      <div className="flex justify-between items-center opacity-60">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Monthly Eq.</span>
                        <span className="text-sm font-black italic text-emerald-400">
                          Rp {monthlyEquivalent.toLocaleString("id-ID")}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !billingDate || !reminderDate || price <= 0}
                  className="w-full bg-sky-500 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-sky-400 transition-all shadow-xl shadow-sky-900/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Setting up..." : "Activate Subscription →"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}