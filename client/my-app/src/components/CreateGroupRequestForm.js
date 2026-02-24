"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createGroupRequest } from "@/actions/groupRequest"

export default function CreateGroupRequestForm({ masterServices }) {
  const router = useRouter()

  const [selectedService, setSelectedService] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [maxSlot, setMaxSlot] = useState(1)
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] ml-1"

  const filteredServices = masterServices.filter((s) =>
    s.serviceName?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectService = (svc) => {
    setSelectedService(svc)
    setTitle(`Share ${svc.serviceName} Subscription`)
    setSearch("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedService) return setError("Please select a service first")

    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("serviceName", selectedService.serviceName)
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard/group-requests"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">My Groups</span>
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Open <span className="text-sky-500">Sharing.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium italic mt-1">
            Open a group slot so others can join and split the cost with you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1 — Pilih Service */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-6">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Step 1 — Choose Service
              </h2>

              {/* Search */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search service..."
                className={inputStyles}
              />

              {/* Selected service display */}
              {selectedService && (
                <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-2xl border-2 border-sky-200">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-sky-100 flex-shrink-0">
                    {selectedService.logo ? (
                      <img src={selectedService.logo} className="w-6 h-6 object-contain" alt={selectedService.serviceName} />
                    ) : (
                      <span className="text-sky-400 font-black text-sm uppercase">{selectedService.serviceName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sky-700 text-sm">{selectedService.serviceName}</p>
                    <p className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">{selectedService.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="text-sky-300 hover:text-sky-500 font-black text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Service list */}
              {(search || !selectedService) && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredServices.map((svc) => {
                    const isSelected = selectedService?._id === svc._id
                    return (
                      <div
                        key={svc._id}
                        onClick={() => handleSelectService(svc)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-sky-400 bg-sky-50/50"
                            : "border-slate-100 hover:border-sky-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 flex-shrink-0">
                          {svc.logo ? (
                            <img src={svc.logo} className="w-6 h-6 object-contain" alt={svc.serviceName} />
                          ) : (
                            <span className="text-sky-400 font-black text-sm uppercase">{svc.serviceName.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-800 text-sm truncate">{svc.serviceName}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{svc.category}</p>
                        </div>
                        {isSelected && <span className="text-sky-400 font-black">✓</span>}
                      </div>
                    )
                  })}
                  {filteredServices.length === 0 && (
                    <p className="text-center text-slate-300 text-sm font-bold py-6 uppercase tracking-widest">No services found</p>
                  )}
                </div>
              )}
            </div>

            {/* Step 2 — Detail */}
            <div className={`bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-8 transition-all ${!selectedService ? "opacity-40 pointer-events-none" : ""}`}>
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
                <label className={labelStyles}>Available Slots</label>
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
                    <span className="text-slate-400 text-sm font-bold ml-2">{maxSlot === 1 ? "person" : "people"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMaxSlot((v) => Math.min(20, v + 1))}
                    className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 font-black text-xl hover:bg-slate-200 transition flex-shrink-0 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center mt-3">Max 20 slots</p>
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
                  {selectedService ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Service</p>
                        <p className="text-lg font-black text-white">{selectedService.serviceName}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Slots Opening</p>
                        <p className="text-2xl font-black text-white">{maxSlot} <span className="text-slate-400 text-sm font-bold">people</span></p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-600 text-sm font-bold italic">Select a service to see summary.</p>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !selectedService || !title}
                  className="w-full bg-sky-500 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-sky-400 transition-all shadow-xl shadow-sky-900/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Opening..." : "Open Group →"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}