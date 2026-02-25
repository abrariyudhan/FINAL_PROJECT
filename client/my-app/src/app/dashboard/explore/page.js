import GroupRequest from "@/server/models/GroupRequest";
import MemberRequest from "@/server/models/MemberRequest";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import ExploreClient from "@/components/ExploreClient";

export default async function ExplorePage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const groupRequests = await GroupRequest.getAll()
  const myRequests = await MemberRequest.getByUserId(user.userId)

  // ✅ Hitung pending requests per group
  const allPendingRequests = await MemberRequest.getAllPending()
  const pendingCounts = allPendingRequests.reduce((acc, req) => {
    const groupId = req.groupRequestId.toString()
    acc[groupId] = (acc[groupId] || 0) + 1
    return acc
  }, {})

  return (
    <ExploreClient
      groupRequests={JSON.parse(JSON.stringify(groupRequests))}
      myRequests={JSON.parse(JSON.stringify(myRequests))}
      currentUserId={user.userId}
      pendingCounts={pendingCounts}
    />
  )
}