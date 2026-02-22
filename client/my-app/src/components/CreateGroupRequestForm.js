"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createGroupRequest } from "@/actions/groupRequest"

export default function CreateGroupRequestForm({ subscriptions, masterServices }) {
  const router = useRouter()

  const [selectedSub, setSelectedSub] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [maxSlot, setMaxSlot] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] ml-1"

  // Cari logo service dari master data berdasarkan nama
  const getServiceLogo = (serviceName) => {
    const svc = masterServices.find(
      (s) => s.serviceName?.toLowerCase() === serviceName?.toLowerCase()
    )
    return svc?.logo || null
  }

  const handleSelectSub = (sub) => {
    setSelectedSub(sub)
    // Auto-fill title dari nama service
    setTitle(`Share ${sub.serviceName} Subscription`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedSub) return setError("Please select a subscription first")

    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("serviceId", selectedSub.serviceId || selectedSub._id)
    formData.append("subscriptionId", selectedSub._id)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("maxSlot", maxSlot)

    const result = await createGroupRequest(formData)

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/dashboard/group-requests")
    }
  }

  // Hitung harga per slot berdasarkan maxSlot
  const pricePerSlot = selectedSub
    ? Math.round(selectedSub.pricePaid / (maxSlot + 1)) // +1 karena owner juga dihitung
    : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard</span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Open <span className="text-sky-500">Sharing.</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium italic mt-1">
              Let others join your subscription and split the cost.
            </p>
          </div>

          {selectedSub && (
            <div className="bg-white px-6 py-3 rounded-[1.5rem] border border-slate-100 shadow-sm text-right">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">
                Est. Per Person
              </span>
              <span className="text-lg font-black text-sky-500">
                Rp {pricePerSlot.toLocaleString("id-ID")}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1 — Pilih Subscription */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-6">
              <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                  Step 1 — Choose Subscription
                </h2>

                {subscriptions.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 rounded-[2rem] border border-dashed border-slate-100">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                      No Family subscriptions found.
                    </p>
                    <Link
                      href="/dashboard/add-subscription"
                      className="text-sky-500 text-[10px] font-black uppercase tracking-widest hover:underline"
                    >
                      + Add a Family Subscription first
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {subscriptions.map((sub) => {
                      const logo = getServiceLogo(sub.serviceName)
                      const isSelected = selectedSub?._id === sub._id

                      return (
                        <div
                          key={sub._id}
                          onClick={() => handleSelectSub(sub)}
                          className={`flex items-center gap-5 p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-sky-400 bg-sky-50/50 shadow-md shadow-sky-500/5"
                              : "border-slate-100 hover:border-sky-200 hover:bg-slate-50/50"
                          }`}
                        >
                          {/* Logo */}
                          <div className="w-12 h-12 bg-white rounded-[1.25rem] flex items-center justify-center border border-slate-100 shadow-sm flex-shrink-0">
                            {logo ? (
                              <img src={logo} className="w-7 h-7 object-contain" alt={sub.serviceName} />
                            ) : (
                              <span className="text-sky-400 text-lg font-black uppercase">
                                {sub.serviceName?.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-slate-800 text-sm truncate">{sub.serviceName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              {sub.category} · Rp {sub.pricePaid?.toLocaleString("id-ID")}
                            </p>
                          </div>

                          {/* Check indicator */}
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              isSelected ? "border-sky-400 bg-sky-400" : "border-slate-200"
                            }`}
                          >
                            {isSelected && (
                              <span className="text-white text-xs font-black">✓</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Step 2 — Detail GroupRequest */}
            <div className={`bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-8 transition-all ${!selectedSub ? "opacity-40 pointer-events-none" : ""}`}>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Step 2 — Group Details
              </h2>

              <div>
                <label className={labelStyles}>Group Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Share Netflix Premium"
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className={labelStyles}>Description <span className="normal-case font-medium text-slate-300">(optional)</span></label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell others what they'll get by joining..."
                  rows={3}
                  className={inputStyles + " resize-none"}
                />
              </div>

              <div>
                <label className={labelStyles}>Available Slots (how many people can join)</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setMaxSlot((v) => Math.max(1, v - 1))}
                    className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 font-black text-xl hover:bg-slate-200 transition flex-shrink-0 flex items-center justify-center"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-4xl font-black text-slate-800">{maxSlot}</span>
                    <span className="text-slate-400 text-sm font-bold ml-2">
                      {maxSlot === 1 ? "person" : "people"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMaxSlot((v) => Math.min(20, v + 1))}
                    className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 font-black text-xl hover:bg-slate-200 transition flex-shrink-0 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center mt-3">
                  Max 20 slots
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:sticky lg:top-10 space-y-6">
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-sky-500/30 transition-colors duration-700"></div>

              <div className="relative z-10 space-y-8">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                    Group Summary
                  </label>

                  {selectedSub ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Service</p>
                        <p className="text-lg font-black text-white">{selectedSub.serviceName}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Bill</p>
                        <p className="text-2xl font-black text-white tracking-tighter">
                          Rp {selectedSub.pricePaid?.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-600 text-sm font-bold italic">
                      Select a subscription to see summary.
                    </p>
                  )}
                </div>

                {selectedSub && (
                  <div className="pt-6 border-t border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Total People</span>
                      <span className="text-sm font-black text-white">{maxSlot + 1} (incl. you)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Per Person</span>
                      <span className="text-xl font-black text-emerald-400">
                        Rp {pricePerSlot.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !selectedSub || !title}
                  className="w-full bg-sky-500 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-sky-400 transition-all shadow-xl shadow-sky-900/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isLoading ? "Opening..." : "Open Group"}
                </button>
              </div>
            </div>

            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              Others can browse and request <br /> to join your group.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}