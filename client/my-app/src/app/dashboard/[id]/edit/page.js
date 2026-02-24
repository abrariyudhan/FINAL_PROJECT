import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import MasterData from "@/server/models/MasterData";
import Link from "next/link";
import EditForm from "@/components/EditForm";
import { getCurrentUser } from "@/actions/auth";
import { notFound, redirect } from "next/navigation";

export default async function EditPage({ params }) {
  const { id } = await params

  try {
    // VERIFY USER IS LOGGED IN
    const user = await getCurrentUser()
    if (!user?.userId) {
      redirect("/login")
    }

    // VERIFY OWNERSHIP - Use getByUserAndId instead of getById
    const sub = await Subscription.getByUserAndId(user.userId, id)
    if (!sub) {
      notFound() // Show 404 if not found or not owned by user
    }

    const members = await Member.getBySubscriptionId(id)

    // CEK APAKAH INI DATA DARI MASTER DATA
    const isFromMaster = await MasterData.findByName(sub.serviceName)

    const plainSub = JSON.parse(JSON.stringify(sub))
    const plainMembers = JSON.parse(JSON.stringify(members))

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12 font-sans text-slate-900">
        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <div className="mb-12 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-100/50 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <Link
                  href={`/dashboard/${id}`}
                  className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Cancel Edit</span>
                </Link>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Edit <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Subscription</span>
                </h1>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></span>
                  Updating <span className="font-bold text-slate-900">{sub.serviceName}</span>
                </p>
              </div>

              {/* Service Logo Display */}
              <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50 to-cyan-50 px-6 py-4 rounded-2xl border border-blue-100 shadow-lg">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                  {sub.logo ? (
                    <img src={sub.logo} alt={sub.serviceName} className="w-12 h-12 object-contain" />
                  ) : (
                    <span className="text-blue-500 text-2xl font-black uppercase">
                      {sub.serviceName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Editing</p>
                  <p className="text-lg font-black text-slate-900">{sub.serviceName}</p>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            {isFromMaster && (
              <div className="mt-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-900 mb-1">Master Data Service</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    This service is from our master database. Name and category fields are locked to maintain data consistency.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Edit Form Component */}
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
      <div className="min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white p-16 rounded-[3rem] shadow-2xl border border-slate-100 max-w-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-6xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-4">Failed to Load</h1>
          <p className="text-slate-500 mb-8 font-medium text-sm">
            Subscription data could not be retrieved. Please try again.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-xl shadow-blue-200 transition-all active:scale-95"
          >
            <span className="text-xl">←</span>
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    )
  }
}