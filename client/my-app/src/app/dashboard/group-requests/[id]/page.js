import GroupRequest from "@/server/models/GroupRequest";
import MemberRequest from "@/server/models/MemberRequest";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import ManageGroupRequestClient from "@/components/ManageGroupRequestClient";

export default async function ManageGroupRequestPage({ params }) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  try {
    // Ambil data GroupRequest (pakai getById sederhana tanpa aggregate dulu)
    const { getDb } = await import("@/server/config/mongodb")
    const { ObjectId } = await import("mongodb")
    const db = await getDb()

    const groupRequest = await db.collection("groupRequests").findOne({
      _id: new ObjectId(id)
    })

    if (!groupRequest) redirect("/dashboard/explore")

    // Pastikan hanya owner yang bisa akses halaman ini
    if (groupRequest.ownerId.toString() !== user.userId) {
      redirect("/dashboard/explore")
    }

    // Ambil semua MemberRequest untuk GroupRequest ini
    const memberRequests = await db.collection("memberRequests")
      .aggregate([
        { $match: { groupRequestId: new ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        { $unwind: "$user" },
        { $sort: { createdAt: -1 } }
      ])
      .toArray()

    // Ambil info service
    const service = groupRequest.serviceId
      ? await db.collection("services").findOne({ _id: groupRequest.serviceId })
      : null

    return (
      <ManageGroupRequestClient
        groupRequest={JSON.parse(JSON.stringify(groupRequest))}
        memberRequests={JSON.parse(JSON.stringify(memberRequests))}
        service={JSON.parse(JSON.stringify(service))}
      />
    )
  } catch (error) {
    redirect("/dashboard/explore")
  }
}