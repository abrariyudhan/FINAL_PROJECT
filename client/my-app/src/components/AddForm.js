"use client";
import { useState, useEffect, useRef } from "react";
import { createFullSubscription } from "@/actions/subscription";
import Link from "next/link";

export default function AddSubscriptionForm({ masterServices }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isManualInput, setIsManualInput] = useState(false)
  
  // State Data
  const [selectedServiceName, setSelectedServiceName] = useState("")
  const [category, setCategory] = useState("Entertainment")
  const [currentLogo, setCurrentLogo] = useState("")
  
  // State Form lainnya
  const [subType, setSubType] = useState("Individual")
  const [members, setMembers] = useState([])
  const [price, setPrice] = useState(0)
  const [billingDate, setBillingDate] = useState("")
  const [cycle, setCycle] = useState(1)

  const dropdownRef = useRef(null)

  // Tanggal hari ini untuk validasi input date
  const today = new Date().toISOString().split('T')[0]

  // Close dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle Pilih dari Master Data
  const handleSelectService = (svc) => {
    setIsManualInput(false)
    setSelectedServiceName(svc.serviceName)
    setCategory(svc.category || "Entertainment")
    setCurrentLogo(svc.logo || "")
    setIsOpen(false)
  }

  // Handle Opsi Manual
  const handleManualOption = () => {
    setIsManualInput(true)
    setSelectedServiceName("")
    setCategory("Other")
    setCurrentLogo("")
    setIsOpen(false)
  }

  const addMemberField = () => setMembers([...members, { id: Date.now() }])
  const removeMemberField = (id) => setMembers(members.filter((m) => m.id !== id))
  
  const totalOrang = 1 + members.length
  const pricePerPerson = price > 0 ? Math.round(price / totalOrang) : 0
  const monthlyEquivalent = Math.round(pricePerPerson / cycle)

  const inputStyles = "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
  const labelStyles = "block text-xs font-bold text-slate-600 mb-2 ml-1"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <Link href="/dashboard" className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                <span className="text-xs font-bold uppercase tracking-wider">Back to Dashboard</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Add New <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Subscription</span>
              </h1>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></span>
                Track your subscription expenses easily
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 px-8 py-5 rounded-3xl border border-blue-100 shadow-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Your Share</span>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Rp {pricePerPerson.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        <form action={createFullSubscription} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Service Selection Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                  🎯
                </div>
                <h2 className="text-xl font-black text-slate-800">Service Details</h2>
              </div>

              <div className="group relative" ref={dropdownRef}>
                <label className={labelStyles}>Service Name</label>
                
                {isManualInput ? (
                  <div className="relative flex items-center gap-3">
                    <input 
                      name="serviceName"
                      value={selectedServiceName}
                      onChange={(e) => setSelectedServiceName(e.target.value)}
                      placeholder="Type service name..."
                      className={inputStyles}
                      required
                      autoFocus
                    />
                    <button 
                      type="button"
                      onClick={() => setIsManualInput(false)}
                      className="px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl text-sm font-bold text-slate-600 transition-all shadow-sm"
                    >
                      ↺
                    </button>
                  </div>
                ) : (
                  <>
                    <input type="hidden" name="serviceName" value={selectedServiceName} required />
                    <div 
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex items-center gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all group"
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black shadow-md ${currentLogo ? 'bg-white' : 'bg-white/50'}`}>
                        {currentLogo ? <img src={currentLogo} className="w-10 h-10 object-contain" alt="logo" /> : <span className="text-2xl text-slate-300">?</span>}
                      </div>
                      <div className="flex-1">
                        <span className={`text-xl font-bold block ${selectedServiceName ? 'text-slate-900' : 'text-slate-400'}`}>
                          {selectedServiceName || "Select a service..."}
                        </span>
                        <span className="text-xs text-slate-500">Click to choose from library</span>
                      </div>
                      <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`}>▼</span>
                    </div>
                  </>
                )}

                {isOpen && (
                  <div className="absolute z-50 w-full mt-3 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-96 overflow-y-auto p-3">
                      {masterServices.map((svc) => (
                        <div 
                          key={svc._id}
                          onClick={() => handleSelectService(svc)}
                          className="flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-2xl cursor-pointer transition-all group border border-transparent hover:border-blue-100"
                        >
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <img src={svc.logo} className="w-8 h-8 object-contain" alt={svc.serviceName} />
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{svc.serviceName}</span>
                            <span className="block text-xs text-slate-400">{svc.category}</span>
                          </div>
                        </div>
                      ))}

                      <div 
                        onClick={handleManualOption}
                        className="flex items-center gap-4 p-4 mt-2 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-2xl cursor-pointer transition-all border-2 border-dashed border-slate-300"
                      >
                        <div className="w-12 h-12 flex items-center justify-center border-2 border-dashed border-slate-400 rounded-xl font-black text-slate-400 text-xl">+</div>
                        <div>
                          <span className="font-bold text-slate-600">Manual Entry</span>
                          <span className="block text-xs text-slate-400">Add custom service</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>Category</label>
                  <input type="hidden" name="category" value={category} />
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={inputStyles}
                    disabled={!isManualInput}
                  >
                    <option value="Entertainment">🎬 Entertainment</option>
                    <option value="Music">🎵 Music</option>
                    <option value="Work">💼 Work</option>
                    <option value="Education">📚 Education</option>
                    <option value="Other">📦 Other</option>
                  </select>
                  {!isManualInput && <p className="text-xs text-slate-400 mt-2 ml-1 italic">Auto-filled from database</p>}
                </div>

                <div>
                  <label className={labelStyles}>Billing Cycle</label>
                  <select name="billingCycle" value={cycle} onChange={(e) => setCycle(Number(e.target.value))} className={inputStyles}>
                    <option value="1">📅 Monthly</option>
                    <option value="3">📅 Quarterly (3 Months)</option>
                    <option value="6">📅 Semi-Annual (6 Months)</option>
                    <option value="12">📅 Annual (12 Months)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dates Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                  📆
                </div>
                <h2 className="text-xl font-black text-slate-800">Important Dates</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>Next Billing Date</label>
                  <input 
                    name="billingDate" 
                    type="date" 
                    min={today}
                    onChange={(e) => setBillingDate(e.target.value)} 
                    className={inputStyles} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelStyles}>Reminder Date</label>
                  <input 
                    name="reminderDate" 
                    type="date" 
                    min={today}
                    max={billingDate} 
                    className={inputStyles} 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Subscription Type Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                  👥
                </div>
                <h2 className="text-xl font-black text-slate-800">Subscription Type</h2>
              </div>

              <div className="flex gap-4 p-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl mb-8 border border-blue-100">
                {["Individual", "Family"].map((t) => (
                  <button 
                    key={t} type="button" 
                    onClick={() => { setSubType(t); if(t === "Individual") setMembers([]); }}
                    className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${subType === t ? 'bg-white text-blue-600 shadow-lg border border-blue-100' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {t === "Family" ? "👨‍👩‍👧‍👦 Family Sharing" : "👤 " + t}
                  </button>
                ))}
              </div>
              <input type="hidden" name="type" value={subType} />

              {subType === "Family" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-700">Family Members</h3>
                    <button 
                      type="button" 
                      onClick={addMemberField} 
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-200 active:scale-95"
                    >
                      + Add Member
                    </button>
                  </div>

                  <div className="space-y-4">
                    {members.map((m) => (
                      <div key={m.id} className="grid grid-cols-1 md:grid-cols-10 gap-3 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 items-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="md:col-span-3">
                          <input name="memberName[]" placeholder="👤 Name" className={inputStyles + " !bg-white"} required />
                        </div>
                        <div className="md:col-span-3">
                          <input name="memberEmail[]" type="email" placeholder="📧 Email" className={inputStyles + " !bg-white"} />
                        </div>
                        <div className="md:col-span-3">
                          <input name="memberPhone[]" placeholder="📱 Phone" className={inputStyles + " !bg-white"} />
                        </div>
                        <div className="md:col-span-1 flex justify-center">
                          <button 
                            type="button" 
                            onClick={() => removeMemberField(m.id)} 
                            className="w-10 h-10 flex items-center justify-center bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-slate-200 hover:border-red-300"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:sticky lg:top-6 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl border border-slate-700 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 space-y-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">💰 Payment Details</label>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Total Amount</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg font-black text-slate-500">IDR</span>
                      <input 
                        name="pricePaid" 
                        type="number" 
                        min="0"
                        placeholder="0"
                        onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} 
                        className="bg-transparent text-5xl font-black text-white outline-none w-full tracking-tight placeholder:text-slate-700" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700 space-y-4">
                  <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Split Between:</span>
                      <span className="text-lg font-black text-cyan-400">{totalOrang} {totalOrang > 1 ? 'People' : 'Person'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase">Your Share:</span>
                      <span className="text-2xl font-black text-emerald-400">Rp {pricePerPerson.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  
                  {cycle > 1 && (
                    <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-300 uppercase">Monthly Equivalent:</span>
                        <span className="text-lg font-black text-blue-400">Rp {monthlyEquivalent.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all group">
                    <input 
                      type="checkbox" 
                      name="isReminderActive" 
                      defaultChecked 
                      className="w-5 h-5 text-blue-500 rounded-lg bg-slate-700 border-slate-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Smart Reminder</span>
                      <span className="block text-xs text-slate-400">Get notified before due date</span>
                    </div>
                    <span className="text-xl">🔔</span>
                  </label>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-blue-500/20 active:scale-95 hover:shadow-2xl"
                  >
                    💾 Save Subscription
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 text-center">
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                ✨ This subscription will be added to your dashboard for easy tracking
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}