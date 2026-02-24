import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import SetupSubscriptionForm from "@/components/SetupSubscriptionForm";

export default async function SetupSubscriptionPage({ params }) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const { getDb } = await import("@/server/config/mongodb")
  const { ObjectId } = await import("mongodb")
  const db = await getDb()

  // Ambil GroupRequest
  const groupRequest = await db.collection("groupRequests").findOne({
    _id: new ObjectId(id)
  })

  if (!groupRequest) redirect("/dashboard/group-requests")

  // Hanya owner yang bisa akses
  if (groupRequest.ownerId.toString() !== user.userId) {
    redirect("/dashboard/explore")
  }

  // Hanya bisa setup kalau status full
  if (groupRequest.status !== "full") {
    redirect(`/dashboard/group-requests/${id}`)
  }

  // Ambil semua member yang approved beserta data user
  const members = await db.collection("members")
    .find({ groupRequestId: id })
    .toArray()

  // Enrich dengan data user
  const enrichedMembers = await Promise.all(
    members.map(async (m) => {
      const userData = m.userId
        ? await db.collection("users").findOne(
            { _id: new ObjectId(m.userId.toString()) },
            { projection: { fullname: 1, username: 1, email: 1, phoneNumber: 1 } }
          )
        : null
      return { ...m, userData }
    })
  )

  return (
    <SetupSubscriptionForm
      groupRequest={JSON.parse(JSON.stringify(groupRequest))}
      members={JSON.parse(JSON.stringify(enrichedMembers))}
      groupRequestId={id}
    />
  )
}