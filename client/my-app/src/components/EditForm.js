"use client";

import { useState } from "react";
import { updateFullSubscription, deleteSubscription } from "@/actions/subscription";
import { deleteMember } from "@/actions/member";

export default function EditForm({ initialSub, initialMembers, isMaster }) {
  const [newMembers, setNewMembers] = useState([])
  const [price, setPrice] = useState(initialSub.pricePaid || 0)
  const [billingDate, setBillingDate] = useState(initialSub.billingDate || "")
  const [cycle, setCycle] = useState(initialSub.billingCycle || 1)

  const addNewMemberRow = () => setNewMembers([...newMembers, { id: Date.now() }])
  const removeNewMemberRow = (id) => setNewMembers(newMembers.filter((m) => m.id !== id))

  const totalOrang = 1 + initialMembers.length + newMembers.length
  const pricePerPerson = Math.round(price / totalOrang)
  const monthlyEquivalent = Math.round(pricePerPerson / cycle)

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-200 shadow-sm"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] ml-1"

  return (
    <form action={updateFullSubscription} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <input type="hidden" name="id" value={initialSub._id} />
      <input type="hidden" name="type" value={initialSub.type} />
      
      {isMaster && (
        <>
          <input type="hidden" name="serviceName" value={initialSub.serviceName} />
          <input type="hidden" name="category" value={initialSub.category} />
        </>
      )}

      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5 group">
                
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm shrink-0 transition-transform group-hover:rotate-3">
                  {initialSub.logo ? (
                    <img src={initialSub.logo} alt="" className="w-full h-full object-contain p-3" />
                  ) : (
                    <span className="text-xl font-black text-slate-300">{initialSub.serviceName.charAt(0)}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <label className={labelStyles}>Service Name</label>
                  <input 
                    name={isMaster ? "" : "serviceName"}
                    defaultValue={initialSub.serviceName} 
                    className={`w-full text-2xl font-black bg-transparent border-b-2 outline-none transition-all pb-2 ${
                      isMaster 
                      ? "border-transparent text-slate-400 cursor-not-allowed" 
                      : "border-slate-100 text-slate-900 focus:border-sky-400"
                    }`} 
                    required 
                    readOnly={isMaster}
                  />
                  {isMaster && <p className="text-[8px] font-black text-sky-500/50 uppercase tracking-[0.2em] mt-1">Verified Official Service</p>}
                </div>
              </div>
            </div>
            
            <div>
              <label className={labelStyles}>Category</label>
              <select 
                name={isMaster ? "" : "category"} 
                defaultValue={initialSub.category} 
                className={`${inputStyles} ${isMaster ? "opacity-60 cursor-not-allowed bg-slate-100 italic" : ""}`} 
                required
                disabled={isMaster}
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Music">Music</option>
                <option value="Work">Work</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelStyles}>Billing Cycle</label>
              <select
                name="billingCycle"
                value={cycle}
                onChange={(e) => setCycle(Number(e.target.value))}
                className={inputStyles}
              >
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
                value={billingDate}
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
                max={billingDate}
                defaultValue={initialSub.reminderDate}
                className={inputStyles}
                required
              />
            </div>
          </div>

          {initialSub.type === "Family" && (
            <div className="pt-4 border-t border-slate-50 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Active Members</h3>
                  <span className="text-[10px] font-black text-sky-500 bg-sky-50 px-3 py-1 rounded-full">{initialMembers.length} Saved</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {initialMembers.map((m) => (
                    <div key={m._id} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-rose-100 transition-all group">
                      <div className="min-w-0">
                        <p className="text-sm font-black text-slate-700 truncate">{m.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold truncate uppercase tracking-tight">{m.email || m.phone || 'No Contact'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={async () => { if (confirm(`Remove ${m.name}?`)) await deleteMember(m._id, initialSub._id); }}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add New Members</h3>
                  <button type="button" onClick={addNewMemberRow} className="px-4 py-2 bg-sky-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-sky-100">+ Add Row</button>
                </div>
                <div className="space-y-3">
                  {newMembers.map((m) => (
                    <div key={m.id} className="grid grid-cols-1 md:grid-cols-10 gap-3 p-4 bg-white rounded-2xl border-2 border-dashed border-slate-100 items-center animate-in zoom-in-95">
                      <div className="md:col-span-3">
                        <input name="memberName[]" placeholder="Name" className={inputStyles + " !p-2.5"} required />
                      </div>
                      <div className="md:col-span-3">
                        <input name="memberEmail[]" placeholder="Email" className={inputStyles + " !p-2.5"} />
                      </div>
                      <div className="md:col-span-3">
                        <input name="memberPhone[]" placeholder="Phone" className={inputStyles + " !p-2.5"} />
                      </div>
                      <div className="md:col-span-1 flex justify-center">
                        <button type="button" onClick={() => removeNewMemberRow(m.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-start px-4">
          <button
            type="button"
            onClick={() => { if (confirm("Delete this entire subscription?")) deleteSubscription(initialSub._id) }}
            className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-rose-500 transition-colors"
          >
            Delete Subscription
          </button>
        </div>
      </div>

      <div className="lg:sticky lg:top-10 space-y-6">
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

          <div className="relative z-10 space-y-8">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Live Summary</label>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Update Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-500 tracking-tighter uppercase">IDR</span>
                  <input
                    name="pricePaid"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="bg-transparent text-4xl font-black text-white outline-none w-full tracking-tighter"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  {initialSub.type === "Family" ? "Your Share:" : "Total Cost:"}
                </span>
                <span className="text-xl font-black text-emerald-400">
                  Rp {initialSub.type === "Family" ? pricePerPerson.toLocaleString('id-ID') : price.toLocaleString('id-ID')}
                </span>
              </div>
              {cycle > 1 && (
                <div className="flex justify-between items-center opacity-60">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Monthly Eq:</span>
                  <span className="text-sm font-black italic text-emerald-400">
                    Rp {(initialSub.type === "Family" ? monthlyEquivalent : Math.round(price / cycle)).toLocaleString('id-ID')}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl border border-white/5 group cursor-pointer">
                <input
                  type="checkbox"
                  name="isReminderActive"
                  id="isReminderActive"
                  defaultChecked={initialSub.isReminderActive}
                  className="w-5 h-5 text-sky-500 rounded bg-transparent border-slate-700 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isReminderActive" className="text-[9px] font-black text-slate-300 uppercase tracking-widest cursor-pointer select-none">Smart Reminder</label>
              </div>

              <button type="submit" className="w-full bg-sky-500 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-sky-400 transition-all shadow-xl shadow-sky-900/20 active:scale-95">
                Update Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}