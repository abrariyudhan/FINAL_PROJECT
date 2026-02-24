import MasterData from "@/server/models/MasterData";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import ManageGroupRequestClient from "@/components/ManageGroupRequestClient";

export default async function ManageGroupRequestPage({ params }) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  try {
    const { getDb } = await import("@/server/config/mongodb")
    const { ObjectId } = await import("mongodb")
    const db = await getDb()

    const groupRequest = await db.collection("groupRequests").findOne({
      _id: new ObjectId(id)
    })

    if (!groupRequest) redirect("/dashboard/group-requests")

    if (groupRequest.ownerId.toString() !== user.userId) {
      redirect("/dashboard/explore")
    }

    // Ambil MemberRequest lalu enrich dengan data user secara manual
    // (hindari aggregate $unwind yang bisa error jika userId tidak match)
    const rawMemberRequests = await db.collection("memberRequests")
      .find({ groupRequestId: new ObjectId(id) })
      .sort({ createdAt: -1 })
      .toArray()

    const memberRequests = await Promise.all(
      rawMemberRequests.map(async (req) => {
        const userData = req.userId
          ? await db.collection("users").findOne(
              { _id: new ObjectId(req.userId.toString()) },
              { projection: { fullname: 1, username: 1, email: 1 } }
            )
          : null
        return { ...req, userData }
      })
    )

    // Ambil master services untuk edit modal
    const services = await MasterData.findAll()

    return (
      <ManageGroupRequestClient
        groupRequest={JSON.parse(JSON.stringify(groupRequest))}
        memberRequests={JSON.parse(JSON.stringify(memberRequests))}
        services={JSON.parse(JSON.stringify(services))}
      />
    )
  } catch (error) {
    console.error("ManageGroupRequestPage error:", error)
    redirect("/dashboard/group-requests")
  }
}