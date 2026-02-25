"use client";
import { useState, useEffect, useRef } from "react";
import { createFullSubscription } from "@/actions/subscription";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiTarget, FiCalendar, FiUsers, FiCreditCard, FiPlus, FiX, FiCheck } from "react-icons/fi";

export default function AddSubscriptionForm({ masterServices }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const [isManualInput, setIsManualInput] = useState(false)
  
  const [selectedServiceName, setSelectedServiceName] = useState("")
  const [category, setCategory] = useState("Entertainment")
  const [currentLogo, setCurrentLogo] = useState("")
  const [selectedServiceId, setSelectedServiceId] = useState("") // ✅ Tambah serviceId
  
  const [subType, setSubType] = useState("Individual")
  const [members, setMembers] = useState([])
  const [price, setPrice] = useState(0)
  const [billingDate, setBillingDate] = useState("")
  const [cycle, setCycle] = useState(1)

  const dropdownRef = useRef(null)
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectService = (svc) => {
    setIsManualInput(false)
    setSelectedServiceName(svc.serviceName)
    setCategory(svc.category || "Entertainment")
    setCurrentLogo(svc.logo || "")
    setSelectedServiceId(svc._id) // ✅ Simpan serviceId
    setIsOpen(false)
  }

  const handleManualOption = () => {
    setIsManualInput(true)
    setSelectedServiceName("")
    setCategory("Other")
    setCurrentLogo("")
    setSelectedServiceId("") // ✅ Reset serviceId
    setIsOpen(false)
  }

  const addMemberField = () => setMembers([...members, { id: Date.now() }])
  const removeMemberField = (id) => setMembers(members.filter((m) => m.id !== id))
  
  const totalOrang = 1 + members.length
  const pricePerPerson = price > 0 ? Math.round(price / totalOrang) : 0
  const monthlyEquivalent = Math.round(pricePerPerson / cycle)

  const inputStyles = "w-full p-4 bg-white border border-slate-200 rounded-md outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-sm font-bold text-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1"
  const cardStyles = "bg-white p-8 rounded-lg border border-slate-200 shadow-sm"

  // ✅ Handle form submit manually
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // ✅ Tambahkan data dari state yang tidak ada di form
    formData.set("serviceName", selectedServiceName);
    formData.set("category", category);
    formData.set("logo", currentLogo);
    if (selectedServiceId) {
      formData.set("serviceId", selectedServiceId);
    }

    console.log("=== FORM SUBMIT DEBUG ===");
    console.log("ServiceName:", formData.get("serviceName"));
    console.log("Category:", formData.get("category"));
    console.log("Logo:", formData.get("logo"));
    console.log("ServiceId:", formData.get("serviceId"));

    const result = await createFullSubscription(formData);
    
    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:px-12 md:py-12 font-sans text-slate-900 antialiased">
      <div className="max-w-3xl mx-auto">
        
        {/* --- Header --- */}
        <header className="mb-12 space-y-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase text-[10px] font-black tracking-[0.2em]">
            <FiArrowLeft strokeWidth={3} /> Cancel and Exit
          </Link>
          
          <div className="border-b border-slate-200 pb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              Add <span className="text-slate-400">Subscription</span>
            </h1>
            <p className="mt-4 text-xs text-slate-400 font-medium tracking-wide uppercase">Setup a new recurring service</p>
          </div>
        </header>

        {/* ✅ Change: action -> onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          
          {/* Section 1: Service Details */}
          <div className={cardStyles}>
            <div className="flex items-center gap-3 mb-8">
              <FiTarget className="text-slate-400" size={16} />
              <h2 className="text-[11px] font-black uppercase tracking-widest">Service Details</h2>
            </div>

            <div className="relative" ref={dropdownRef}>
              <label className={labelStyles}>Service Provider</label>
              
              {isManualInput ? (
                <div className="flex gap-2">
                  {/* ✅ Tidak perlu name attribute karena pakai state */}
                  <input 
                    value={selectedServiceName} 
                    onChange={(e) => setSelectedServiceName(e.target.value)} 
                    placeholder="ENTER SERVICE NAME..." 
                    className={inputStyles} 
                    required 
                    autoFocus 
                  />
                  <button type="button" onClick={() => setIsManualInput(false)} className="px-4 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-600 transition-all">
                    ↺
                  </button>
                </div>
              ) : (
                <div onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-md cursor-pointer hover:border-slate-900 transition-all bg-slate-50/50">
                  <div className="w-12 h-12 rounded border border-slate-200 bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    {currentLogo ? <img src={currentLogo} className="w-8 h-8 object-contain" alt="logo" /> : <span className="font-black text-slate-200">?</span>}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-black uppercase tracking-tight ${selectedServiceName ? 'text-slate-900' : 'text-slate-400'}`}>
                      {selectedServiceName || "Select from our library"}
                    </span>
                  </div>
                </div>
              )}

              {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-xl border border-slate-200 overflow-hidden">
                  <div className="max-h-80 overflow-y-auto">
                    {masterServices.map((svc) => (
                      <div key={svc._id} onClick={() => handleSelectService(svc)} className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer transition-all border-b border-slate-50 last:border-0">
                        <div className="w-10 h-10 border border-slate-100 rounded flex items-center justify-center bg-white shadow-sm">
                          <img src={svc.logo} className="w-6 h-6 object-contain" alt={svc.serviceName} />
                        </div>
                        <span className="font-black text-xs text-slate-700 uppercase tracking-tight">{svc.serviceName}</span>
                      </div>
                    ))}
                    <div onClick={handleManualOption} className="p-4 bg-slate-900 text-white cursor-pointer text-center text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800">
                      + Add Manual Service
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <label className={labelStyles}>Category</label>
                {/* ✅ Tidak perlu name karena pakai state */}
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className={inputStyles} 
                  disabled={!isManualInput}
                >
                  <option value="Entertainment">Entertainment</option>
                  <option value="Music">Music</option>
                  <option value="Work">Productivity</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelStyles}>Billing Cycle</label>
                <select name="billingCycle" value={cycle} onChange={(e) => setCycle(Number(e.target.value))} className={inputStyles}>
                  <option value="1">Monthly</option>
                  <option value="3">Quarterly</option>
                  <option value="6">Semi-Annual</option>
                  <option value="12">Annual</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Financials (Modern Dark Card) */}
          <div className="bg-slate-900 p-8 rounded-lg text-white shadow-xl space-y-8">
            <div className="flex items-center gap-3">
              <FiCreditCard className="text-blue-500" size={16} />
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Financial Summary</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-1">Total Price (IDR)</label>
                <div className="flex items-baseline gap-2 border-b border-slate-800 pb-2">
                  <input name="pricePaid" type="number" placeholder="0" onChange={(e) => setPrice(Number(e.target.value))} className="bg-transparent text-4xl font-black text-white outline-none w-full tracking-tighter" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-md">
                  <span className="block text-[9px] font-black text-slate-500 uppercase mb-1">Cost per Head</span>
                  <span className="text-lg font-black tracking-tight">Rp {pricePerPerson.toLocaleString('id-ID')}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-md">
                  <span className="block text-[9px] font-black text-slate-500 uppercase mb-1">Monthly Burn</span>
                  <span className="text-lg font-black text-blue-400 tracking-tight">Rp {monthlyEquivalent.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Billing Schedule */}
          <div className={cardStyles}>
            <div className="flex items-center gap-3 mb-8">
              <FiCalendar className="text-slate-400" size={16} />
              <h2 className="text-[11px] font-black uppercase tracking-widest">Billing Schedule</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyles}>Next Billing Date</label>
                <input name="billingDate" type="date" min={today} onChange={(e) => setBillingDate(e.target.value)} className={inputStyles} required />
              </div>
              <div>
                <label className={labelStyles}>Reminder Alert</label>
                <input name="reminderDate" type="date" min={today} max={billingDate} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* Section 4: Membership */}
          <div className={cardStyles}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FiUsers className="text-slate-400" size={16} />
                <h2 className="text-[11px] font-black uppercase tracking-widest">Plan Members</h2>
              </div>
              <div className="flex gap-2 bg-slate-100 p-1 rounded-md">
                {["Individual", "Family"].map((t) => (
                  <button key={t} type="button" onClick={() => { setSubType(t); if(t === "Individual") setMembers([]); }}
                    className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${subType === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <input type="hidden" name="type" value={subType} />

            {subType === "Family" && (
              <div className="space-y-4">
                {members.map((m) => (
                  <div key={m.id} className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50/50 rounded-md">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <input name="memberName[]" placeholder="MEMBER NAME" className="bg-transparent font-bold text-sm outline-none" required />
                      <input name="memberEmail[]" type="email" placeholder="EMAIL (OPTIONAL)" className="bg-transparent text-xs text-slate-500 outline-none" />
                    </div>
                    <button type="button" onClick={() => removeMemberField(m.id)} className="text-slate-300 hover:text-red-500">
                      <FiX size={18} strokeWidth={3} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addMemberField} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-md text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-all">
                  + Add Member to Group
                </button>
              </div>
            )}
          </div>

          {/* Final Actions */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-lg">
              <input type="checkbox" name="isReminderActive" id="isReminderActive" defaultChecked className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer" />
              <label htmlFor="isReminderActive" className="flex flex-col cursor-pointer">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Enable Notifications</span>
                <span className="text-[10px] text-slate-400 font-medium">Get alerted before your card is charged</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-md font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
              Save Subscription
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}