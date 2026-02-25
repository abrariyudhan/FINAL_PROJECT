"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiArrowLeft, FiCheckCircle, FiUsers, FiCreditCard, FiBell } from "react-icons/fi"
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

  const [memberData, setMemberData] = useState(
    members.map((m) => ({
      memberId: m._id.toString(),
      name: m.name || "",
      email: m.email || "",
      phone: m.phone || "",
    }))
  )

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded outline-none focus:bg-white focus:border-slate-900 text-xs font-black text-slate-700 transition-all placeholder:text-slate-300 uppercase tracking-tight"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-[0.2em] ml-1"

  const totalPeople = memberData.length + 1
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
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:p-12 font-sans text-slate-900 antialiased">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Navigation & Header */}
        <div className="space-y-6">
          <Link href={`/dashboard/group-requests/${groupRequestId}`}
            className="group inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.3em]">
            <FiArrowLeft strokeWidth={3} /> Back to Group
          </Link>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
              Finalize <span className="text-slate-400">Subscription.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
              The group is full. Please define the billing parameters to activate the shared subscription.
            </p>
          </div>
        </div>

        {/* Group Status Banner */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-900 rounded border border-slate-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xl uppercase">{groupRequest.serviceName?.charAt(0)}</span>
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{groupRequest.title}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                {groupRequest.serviceName} • {members.length} Members
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100">
             <FiCheckCircle size={14} strokeWidth={3} />
             <span className="text-[9px] font-black uppercase tracking-widest">Ready</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Billing Configuration */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
              <FiCreditCard className="text-slate-400" size={18} />
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Billing Configuration</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelStyles}>Subscription Plan / Cycle</label>
                <select value={billingCycle} onChange={(e) => setBillingCycle(Number(e.target.value))} className={inputStyles}>
                  <option value="1">Monthly Payment</option>
                  <option value="3">Quarterly (Every 3 Months)</option>
                  <option value="6">Semi-Annually (Every 6 Months)</option>
                  <option value="12">Annually (Every 12 Months)</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>Total Amount Paid (Rp)</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="0" className={inputStyles} required min="0" />
              </div>

              <div>
                <label className={labelStyles}>Due Date</label>
                <input type="date" value={billingDate} onChange={(e) => setBillingDate(e.target.value)}
                  className={inputStyles} required />
              </div>

              <div className="md:col-span-2 bg-slate-50 p-6 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FiBell className={isReminderActive ? "text-slate-900" : "text-slate-300"} />
                    <label htmlFor="isReminderActive" className="text-[10px] font-black text-slate-900 uppercase tracking-widest cursor-pointer">
                      Enable Notification
                    </label>
                  </div>
                  <input type="checkbox" id="isReminderActive" checked={isReminderActive}
                    onChange={(e) => setIsReminderActive(e.target.checked)}
                    className="w-5 h-5 accent-slate-900 cursor-pointer" />
                </div>
                {isReminderActive && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <label className={labelStyles}>Reminder Date</label>
                    <input type="date" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)}
                      max={billingDate} className={inputStyles + " bg-white"} required />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Member Directory */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <FiUsers className="text-slate-400" size={18} />
                <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Member Directory</h2>
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                {memberData.length} Recipients
              </span>
            </div>

            <div className="space-y-6">
              {memberData.map((m, index) => (
                <div key={m.memberId} className="group relative pt-6 border-t border-slate-50 first:border-t-0 first:pt-0">
                  <span className="absolute -left-2 top-7 text-[8px] font-black text-slate-200 uppercase -rotate-90">M-{index + 1}</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input value={m.name} onChange={(e) => updateMember(index, "name", e.target.value)}
                      placeholder="FULL NAME" className={inputStyles} required />
                    <input value={m.email} onChange={(e) => updateMember(index, "email", e.target.value)}
                      placeholder="EMAIL ADDRESS" type="email" className={inputStyles} />
                    <input value={m.phone} onChange={(e) => updateMember(index, "phone", e.target.value)}
                      placeholder="PHONE NUMBER" className={inputStyles} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Financial Summary & Submission */}
          <div className="bg-slate-900 rounded-lg p-10 text-white shadow-xl shadow-slate-200">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 border-b border-slate-800 pb-4">
              Calculation Summary
            </h3>
            
            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shared Total ({totalPeople} pax)</p>
                <p className="text-2xl font-black tracking-tighter italic">Rp {price.toLocaleString("id-ID")}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cost Per Member</p>
                <p className="text-3xl font-black text-emerald-400 tracking-tighter">Rp {pricePerPerson.toLocaleString("id-ID")}</p>
              </div>
              {billingCycle > 1 && (
                <div className="flex justify-between items-center pt-2 opacity-50 border-t border-slate-800">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Monthly Equivalent</p>
                  <p className="text-sm font-black italic">Rp {monthlyEquivalent.toLocaleString("id-ID")}</p>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded text-rose-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            <button type="submit" disabled={isLoading || !billingDate || price <= 0}
              className="w-full bg-white text-slate-900 py-5 rounded font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed">
              {isLoading ? "Synchronizing..." : "Activate Shared Subscription →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}