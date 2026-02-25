"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiArrowLeft, FiSearch, FiLayers, FiInfo, FiPlus, FiMinus } from "react-icons/fi"
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

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded outline-none focus:bg-white focus:border-slate-900 text-xs font-black text-slate-700 transition-all placeholder:text-slate-300 uppercase tracking-tight disabled:opacity-50"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-[0.2em] ml-1"

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
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:p-12 font-sans text-slate-900 antialiased">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Header Section */}
        <div className="space-y-6">
          <Link href="/dashboard/group-requests"
            className="group inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.3em]">
            <FiArrowLeft strokeWidth={3} /> My Groups
          </Link>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
              Open <span className="text-slate-400">Sharing.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
              Initiate a new sharing group and find members to split the subscription cost.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Service Selection */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
              <FiLayers className="text-slate-400" size={18} />
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Step 1 — Choose Service</h2>
            </div>

            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="SEARCH SERVICE (E.G. NETFLIX, SPOTIFY...)"
                className={inputStyles + " pl-11"}
              />
            </div>

            {selectedService && (
              <div className="flex items-center gap-4 p-4 bg-slate-900 rounded border border-slate-900 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                  {selectedService.logo ? (
                    <img src={selectedService.logo} className="w-6 h-6 object-contain" alt={selectedService.serviceName} />
                  ) : (
                    <span className="text-slate-900 font-black text-sm uppercase">{selectedService.serviceName.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-black text-white text-[11px] uppercase tracking-tight">{selectedService.serviceName}</p>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{selectedService.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest"
                >
                  Change
                </button>
              </div>
            )}

            {(search || !selectedService) && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                {filteredServices.map((svc) => (
                  <div
                    key={svc._id}
                    onClick={() => handleSelectService(svc)}
                    className="flex items-center gap-4 p-4 rounded border border-slate-100 hover:border-slate-900 hover:bg-slate-50 cursor-pointer transition-all group"
                  >
                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center border border-slate-100 group-hover:bg-white flex-shrink-0">
                      <span className="text-slate-400 font-black text-[10px] uppercase group-hover:text-slate-900">{svc.serviceName.charAt(0)}</span>
                    </div>
                    <p className="font-black text-slate-700 text-[10px] uppercase tracking-tight flex-1">{svc.serviceName}</p>
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{svc.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Group Details */}
          <div className={`bg-white border border-slate-200 rounded-lg p-8 shadow-sm space-y-8 transition-all ${!selectedService ? "opacity-30 pointer-events-none grayscale" : ""}`}>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
              <FiInfo className="text-slate-400" size={18} />
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Step 2 — Group Info</h2>
            </div>

            <div>
              <label className={labelStyles}>Public Group Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.G. PREMIUM FAMILY SHARING"
                className={inputStyles}
                required
              />
            </div>

            <div>
              <label className={labelStyles}>Description <span className="normal-case font-medium text-slate-300 lowercase italic">(optional)</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="WRITE DETAILS ABOUT THE PLAN, TERMS, OR RULES..."
                rows={3}
                className={inputStyles + " resize-none normal-case font-medium"}
              />
            </div>

            <div className="pt-4 border-t border-slate-50">
              <label className={labelStyles + " text-center mb-6"}>Number of Available Slots</label>
              <div className="flex items-center justify-center gap-8">
                <button
                  type="button"
                  onClick={() => setMaxSlot((v) => Math.max(1, v - 1))}
                  className="w-12 h-12 rounded bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all active:scale-90"
                >
                  <FiMinus strokeWidth={3} />
                </button>
                <div className="text-center min-w-[80px]">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">{maxSlot}</span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Participants</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMaxSlot((v) => Math.min(20, v + 1))}
                  className="w-12 h-12 rounded bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all active:scale-90"
                >
                  <FiPlus strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="bg-slate-900 rounded-lg p-10 text-white shadow-xl shadow-slate-200">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Status</p>
                <p className="text-xs font-black uppercase tracking-tight">Ready to Publish</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Target</p>
                <p className="text-xs font-black uppercase tracking-tight italic">{selectedService?.serviceName || '—'}</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded text-rose-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !selectedService || !title}
              className="w-full bg-white text-slate-900 py-5 rounded font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? "Broadcasting..." : "Create Sharing Group →"}
            </button>
            <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] text-center mt-6">
              By clicking, you agree to become the host of this group.
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}