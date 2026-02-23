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

  // Get today's date in YYYY-MM-DD format
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

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] ml-1"

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link href="/dashboard" className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4">
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard</span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">New <span className="text-sky-500">Service.</span></h1>
            <p className="text-sm text-slate-500 font-medium italic mt-1">Track your subscription expenses easily.</p>
          </div>

          <div className="bg-white px-6 py-3 rounded-[1.5rem] border border-slate-100 shadow-sm text-right">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Split Cost</span>
            <span className="text-lg font-black text-sky-500">Rp {pricePerPerson.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <form action={createFullSubscription} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="md:col-span-2 group relative" ref={dropdownRef}>
                  <label className={labelStyles}>Service Name</label>
                  
                  {isManualInput ? (
                    <div className="relative flex items-center gap-2">
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
                        className="p-4 bg-slate-100 rounded-2xl text-xs font-bold text-slate-400 hover:text-sky-500 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <>
                      <input type="hidden" name="serviceName" value={selectedServiceName} required />
                      <div 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center gap-4 border-b-2 border-slate-100 pb-4 cursor-pointer hover:border-sky-400 transition-all"
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm border border-slate-50 shadow-sm ${currentLogo ? 'bg-white' : 'bg-slate-50 text-slate-300'}`}>
                          {currentLogo ? <img src={currentLogo} className="w-8 h-8 object-contain" alt="logo" /> : "?"}
                        </div>
                        <div className="flex-1">
                          <span className={`text-2xl font-black block ${selectedServiceName ? 'text-slate-900' : 'text-slate-200'}`}>
                            {selectedServiceName || "Select service..."}
                          </span>
                        </div>
                        <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180 text-sky-500' : 'text-slate-300'}`}>▼</span>
                      </div>
                    </>
                  )}

                  {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
                      <div className="max-h-[280px] overflow-y-auto p-2">
                        {masterServices.map((svc) => (
                          <div 
                            key={svc._id}
                            onClick={() => handleSelectService(svc)}
                            className="flex items-center gap-4 p-4 hover:bg-sky-50 rounded-2xl cursor-pointer transition-colors group"
                          >
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                              <img src={svc.logo} className="w-6 h-6 object-contain" alt={svc.serviceName} />
                            </div>
                            <span className="font-bold text-slate-700 group-hover:text-sky-600">{svc.serviceName}</span>
                          </div>
                        ))}

                        <div 
                          onClick={handleManualOption}
                          className="flex items-center gap-4 p-4 mt-2 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer transition-colors text-slate-500 italic"
                        >
                          <div className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-xl">+</div>
                          <span className="font-bold">Other / Manual Service...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className={labelStyles}>Category</label>
                  <input type="hidden" name="category" value={category} />
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={inputStyles}
                    disabled={!isManualInput}
                  >
                    <option value="Entertainment">Entertainment</option>
                    <option value="Music">Music</option>
                    <option value="Work">Work</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                  {!isManualInput && <p className="text-[9px] text-slate-400 mt-2 ml-1 italic">* Predefined by master data</p>}
                </div>

                <div>
                  <label className={labelStyles}>Billing Cycle</label>
                  <select name="billingCycle" value={cycle} onChange={(e) => setCycle(Number(e.target.value))} className={inputStyles}>
                    <option value="1">Monthly</option>
                    <option value="3">Quarterly (3 Mo)</option>
                    <option value="6">Semi-Annually (6 Mo)</option>
                    <option value="12">Annually (1 Year)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
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

              <div className="pt-4 border-t border-slate-50">
                <label className={labelStyles}>Subscription Type</label>
                <div className="flex gap-4 p-2 bg-slate-50/50 rounded-2xl border border-slate-100 mb-8">
                  {["Individual", "Family"].map((t) => (
                    <button 
                      key={t} type="button" 
                      onClick={() => { setSubType(t); if(t === "Individual") setMembers([]); }}
                      className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${subType === t ? 'bg-white text-sky-500 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {t === "Family" ? "Family / Sharing" : t}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="type" value={subType} />

                {subType === "Family" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Circle Members</h3>
                      <button type="button" onClick={addMemberField} className="px-4 py-2 bg-sky-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-sky-600 transition shadow-lg shadow-sky-100">+ Add Member</button>
                    </div>

                    <div className="space-y-3">
                      {members.map((m) => (
                        <div key={m.id} className="grid grid-cols-1 md:grid-cols-10 gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 items-center">
                          <div className="md:col-span-3">
                            <input name="memberName[]" placeholder="Name" className={inputStyles + " !bg-white !p-2.5"} required />
                          </div>
                          <div className="md:col-span-3">
                            <input name="memberEmail[]" type="email" placeholder="Email" className={inputStyles + " !bg-white !p-2.5"} />
                          </div>
                          <div className="md:col-span-3">
                            <input name="memberPhone[]" placeholder="Phone" className={inputStyles + " !bg-white !p-2.5"} />
                          </div>
                          <div className="md:col-span-1 flex justify-center">
                            <button type="button" onClick={() => removeMemberField(m.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-10 space-y-6">
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-sky-500/30 transition-colors duration-700"></div>
              
              <div className="relative z-10 space-y-8">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Financial Summary</label>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Total Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-500 tracking-tighter uppercase">IDR</span>
                      <input 
                        name="pricePaid" 
                        type="number" 
                        min="0"
                        placeholder="0"
                        onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} 
                        className="bg-transparent text-4xl font-black text-white outline-none w-full tracking-tighter placeholder:text-slate-800" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Your Share:</span>
                    <span className="text-xl font-black text-emerald-400">Rp {pricePerPerson.toLocaleString('id-ID')}</span>
                  </div>
                  {cycle > 1 && (
                    <div className="flex justify-between items-center opacity-60">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Monthly:</span>
                      <span className="text-sm font-black italic text-emerald-400">Rp {monthlyEquivalent.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl border border-white/5">
                    <input type="checkbox" name="isReminderActive" id="rem" defaultChecked className="w-5 h-5 text-sky-500 rounded bg-transparent border-slate-700 focus:ring-0" />
                    <label htmlFor="rem" className="text-[9px] font-black text-slate-300 uppercase tracking-widest cursor-pointer select-none">Smart Reminder</label>
                  </div>

                  <button type="submit" className="w-full bg-sky-500 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-sky-400 transition-all shadow-xl shadow-sky-900/20 active:scale-95">
                    Save Tracker
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              This will be added to your <br/> dashboard for tracking.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}