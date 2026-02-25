"use client";

import { useState } from "react";
import { updateFullSubscription, deleteSubscription } from "@/actions/subscription";
import { deleteMember } from "@/actions/member";
import { FiPlus, FiX, FiTrash2, FiUsers, FiCreditCard, FiSettings } from "react-icons/fi";

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

  const inputStyles = "w-full px-4 py-3.5 bg-white border border-slate-200 rounded-md outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300 shadow-sm"
  const labelStyles = "block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-[0.2em] ml-1"

  return (
    <form action={updateFullSubscription} className="max-w-3xl mx-auto space-y-8 pb-20">
      <input type="hidden" name="id" value={initialSub._id} />
      <input type="hidden" name="type" value={initialSub.type} />

      {isMaster && (
        <>
          <input type="hidden" name="serviceName" value={initialSub.serviceName} />
          <input type="hidden" name="category" value={initialSub.category} />
        </>
      )}

      {/* Section 1: Service Core */}
      <div className="bg-white p-8 border border-slate-200 rounded-lg shadow-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <FiSettings className="text-slate-400" size={14} />
          <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Service Identity</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className={labelStyles}>Provider Name</label>
            <div className="flex items-center gap-4 group bg-slate-50 p-4 rounded-md border border-slate-100">
              <div className="w-12 h-12 bg-white rounded border border-slate-200 flex items-center justify-center shrink-0">
                {initialSub.logo ? (
                  <img src={initialSub.logo} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  <span className="text-lg font-black text-slate-300">{initialSub.serviceName.charAt(0)}</span>
                )}
              </div>
              <input
                name={isMaster ? "" : "serviceName"}
                defaultValue={initialSub.serviceName}
                className={`flex-1 text-xl font-black bg-transparent outline-none ${isMaster ? "text-slate-400 cursor-not-allowed" : "text-slate-900"}`}
                required
                readOnly={isMaster}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyles}>Category Class</label>
              <select
                name={isMaster ? "" : "category"}
                defaultValue={initialSub.category}
                className={`${inputStyles} ${isMaster ? "opacity-60 cursor-not-allowed bg-slate-50 italic" : ""}`}
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
                <option value="1">Monthly (1 Mo)</option>
                <option value="3">Quarterly (3 Mo)</option>
                <option value="6">Semi-Annually (6 Mo)</option>
                <option value="12">Annually (1 Year)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Financials */}
      <div className="bg-slate-900 p-8 rounded-lg shadow-xl text-white space-y-8">
        <div className="flex items-center gap-3">
          <FiCreditCard className="text-blue-500" size={14} />
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Financial Summary</h3>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-1">Total Price (IDR)</label>
          <input
            name="pricePaid"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="bg-transparent text-4xl font-black text-white outline-none w-full tracking-tighter border-b border-slate-800 focus:border-blue-600 pb-2 transition-colors"
            required
          />
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/5 p-4 rounded-md">
              <span className="block text-[9px] font-black text-slate-500 uppercase">Cost Per Head</span>
              <span className="text-lg font-black tracking-tight">Rp {pricePerPerson.toLocaleString('id-ID')}</span>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <span className="block text-[9px] font-black text-slate-500 uppercase">Monthly Burn</span>
              <span className="text-lg font-black text-blue-400 tracking-tight">Rp {monthlyEquivalent.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Schedule */}
      <div className="bg-white p-8 border border-slate-200 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyles}>Renewal Date</label>
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
          <label className={labelStyles}>Alert Trigger</label>
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

      {/* Section 4: Family Ledger (If applicable) */}
      {initialSub.type === "Family" && (
        <div className="bg-white p-8 border border-slate-200 rounded-lg shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <FiUsers className="text-blue-600" /> Subscription Group
            </h3>
            <button type="button" onClick={addNewMemberRow} className="text-[10px] font-black text-blue-600 uppercase border-b-2 border-blue-600 pb-0.5 hover:text-blue-800 transition-all">
              Add Member
            </button>
          </div>

          <div className="space-y-4">
            {initialMembers.map((m) => (
              <div key={m._id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-md border border-slate-100">
                <input type="hidden" name="memberId[]" value={m._id.toString()} />
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <input name="memberName[]" defaultValue={m.name} className="bg-transparent font-bold text-sm outline-none" placeholder="NAME" required />
                  <input name="memberEmail[]" defaultValue={m.email || ""} className="bg-transparent text-xs text-slate-500 outline-none" placeholder="EMAIL" />
                </div>
                <button type="button" onClick={async () => { if (confirm(`Remove ${m.name}?`)) await deleteMember(m._id, initialSub._id); }} className="text-slate-300 hover:text-rose-500">
                  <FiX size={16} strokeWidth={3} />
                </button>
              </div>
            ))}

            {newMembers.map((m) => (
              <div key={m.id} className="flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-md">
                <input type="hidden" name="memberId[]" value="" />
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <input name="memberName[]" className="bg-transparent font-bold text-sm outline-none" placeholder="NEW NAME" required />
                  <input name="memberEmail[]" className="bg-transparent text-xs text-slate-500 outline-none" placeholder="NEW EMAIL" />
                </div>
                <button type="button" onClick={() => removeNewMemberRow(m.id)} className="text-slate-300 hover:text-rose-500">
                  <FiX size={16} strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-slate-100 rounded-md">
          <input
            type="checkbox"
            name="isReminderActive"
            id="isReminderActive"
            defaultChecked={initialSub.isReminderActive}
            className="w-5 h-5 text-slate-900 rounded border-slate-300 focus:ring-0 cursor-pointer"
          />
          <label htmlFor="isReminderActive" className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer select-none">Enable Automated Notifications</label>
        </div>

        <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-md font-black text-[12px] uppercase tracking-[0.2em] transition-all shadow-xl">
          Commit Changes
        </button>

        <button
          type="button"
          onClick={() => { if (confirm("Destructive Action: Permanent removal of this registry?")) deleteSubscription(initialSub._id) }}
          className="w-full flex justify-center items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-rose-600 py-2 transition-colors"
        >
          <FiTrash2 /> Delete Subscription
        </button>
      </div>
    </form>
  )
}