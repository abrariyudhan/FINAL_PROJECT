import GroupRequest from "@/server/models/GroupRequest";
import MemberRequest from "@/server/models/MemberRequest";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import ExploreClient from "@/components/ExploreClient";
import { getDb } from "@/server/config/mongodb";
import { ObjectId } from "mongodb";

export default async function ExplorePage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const db = await getDb()

  // Ambil semua GroupRequest (semua status)
  const groupRequests = await GroupRequest.getAll()

  // Enrich dengan data service (via subscription) dan owner
  const enrichedGroupRequests = await Promise.all(
    groupRequests.map(async (gr) => {
      // Ambil data service dari subscription milik owner
      let service = null
      if (gr.subscriptionId) {
        const subscription = await db.collection("subscriptions").findOne({
          _id: new ObjectId(gr.subscriptionId.toString())
        })
        if (subscription) {
          service = {
            serviceName: subscription.serviceName,
            logo: subscription.logo,
            category: subscription.category,
          }
        }
      }

      const owner = gr.ownerId
        ? await db.collection("users").findOne(
            { _id: new ObjectId(gr.ownerId.toString()) },
            { projection: { fullname: 1, username: 1, email: 1 } }
          )
        : null

      return { ...gr, service, owner }
    })
  )

  // Ambil semua MemberRequest milik user ini
  const myRequests = await MemberRequest.getByUserId(user.userId)

  return (
    <ExploreClient
      groupRequests={JSON.parse(JSON.stringify(enrichedGroupRequests))}
      myRequests={JSON.parse(JSON.stringify(myRequests))}
      currentUserId={user.userId}
    />
  )
}