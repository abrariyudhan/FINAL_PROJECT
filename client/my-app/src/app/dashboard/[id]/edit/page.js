import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import MasterData from "@/server/models/MasterData";
import Link from "next/link";
import EditForm from "@/components/EditForm";
import { getCurrentUser } from "@/actions/auth";
import { notFound, redirect } from "next/navigation";
import { FiArrowLeft, FiAlertTriangle, FiEdit3 } from "react-icons/fi";

export default async function EditPage({ params }) {
  const { id } = await params

  try {
    const user = await getCurrentUser()
    if (!user?.userId) redirect("/login")

    const sub = await Subscription.getByUserAndId(user.userId, id)
    if (!sub) notFound()

    const members = await Member.getBySubscriptionId(id)
    const isFromMaster = await MasterData.findByName(sub.serviceName)

    const plainSub = JSON.parse(JSON.stringify(sub))
    const plainMembers = JSON.parse(JSON.stringify(members))

    return (
      <div className="min-h-screen bg-[#FBFBFB] p-6 md:px-12 md:py-12 font-sans text-slate-900 antialiased">
        <div className="max-w-3xl mx-auto">

          {/* --- Navigation --- */}
          <div className="mb-10 space-y-8">
            <Link
              href={`/dashboard/${id}`}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase text-[10px] font-black tracking-[0.2em]"
            >
              <FiArrowLeft strokeWidth={3} /> Back to Details
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                  Edit <span className="text-slate-400">Subscription</span>
                </h1>
                <div className="flex items-center gap-2 text-slate-500">
                  <FiEdit3 className="text-blue-500" size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Updating: <span className="text-slate-900">{sub.serviceName}</span>
                  </p>
                </div>
              </div>

              {/* Service Info Badge */}
              <div className="hidden md:flex items-center gap-4 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
                  {sub.logo ? (
                    <img src={sub.logo} alt="" className="w-6 h-6 object-contain" />
                  ) : (
                    <span className="text-slate-300 text-sm font-black uppercase">{sub.serviceName.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Provider</p>
                  <p className="text-xs font-black text-slate-900 uppercase">{sub.serviceName}</p>
                </div>
              </div>
            </div>

            {/* Simple Info Banner */}
            {isFromMaster && (
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-4">
                <div className="text-blue-600 mt-0.5">
                  <FiAlertTriangle size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-700 mb-1">Service Info Locked</p>
                  <p className="text-[11px] text-blue-900/70 leading-relaxed font-medium">
                    The name and category for this service are set by our system. 
                    You can still change your price, billing dates, and member details below.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* --- Main Form --- */}
          <div className="relative">
            <EditForm
              initialSub={plainSub}
              initialMembers={plainMembers}
              isMaster={!!isFromMaster}
            />
          </div>

        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 bg-[#FBFBFB]">
        <div className="text-center bg-white p-12 border border-slate-200 rounded-lg max-w-md shadow-sm">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <FiAlertTriangle className="text-rose-500" size={24} />
          </div>
          <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Something went wrong</h1>
          <p className="text-slate-400 mb-8 font-medium text-xs tracking-wide">
            We couldn't load the subscription data. Please try again or return home.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-slate-900 text-white px-10 py-4 rounded-md font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }
}