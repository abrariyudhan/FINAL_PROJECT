import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import MasterData from "@/server/models/MasterData";
import Link from "next/link";
import EditForm from "@/components/EditForm";

export default async function EditPage({ params }) {
  const { id } = await params

  try {
    const sub = await Subscription.getById(id)
    const members = await Member.getBySubscriptionId(id)

    // CEK APAKAH INI DATA DARI MASTER DATA
    const isFromMaster = await MasterData.findByName(sub.serviceName)

    const plainSub = JSON.parse(JSON.stringify(sub))
    const plainMembers = JSON.parse(JSON.stringify(members))

    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900">
        <div className="max-w-4xl mx-auto">

          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Link
                href={`/dashboard/${id}`}
                className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors mb-4"
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cancel Edit</span>
              </Link>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Edit <span className="text-sky-500">Service.</span>
              </h1>
              <p className="text-sm text-slate-500 font-medium italic mt-1">
                Updating details for <span className="text-slate-900 font-bold not-italic">{sub.serviceName}</span>
              </p>
            </div>
          </div>

          <EditForm
            initialSub={plainSub}
            initialMembers={plainMembers}
            isMaster={!!isFromMaster}
          />

        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 bg-[#FBFCFE]">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 max-w-sm w-full">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-black text-rose-300">!</span>
          </div>
          <h1 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Load Failed</h1>
          <p className="text-slate-500 mb-8 text-sm font-medium">Subscription data could not be retrieved at this time.</p>
          <Link
            href="/dashboard"
            className="block w-full bg-sky-400 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }
}