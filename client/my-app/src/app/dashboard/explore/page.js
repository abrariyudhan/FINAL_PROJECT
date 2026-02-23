import GroupRequest from "@/server/models/GroupRequest";
import MemberRequest from "@/server/models/MemberRequest";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import ExploreClient from "@/components/ExploreClient";

export default async function ExplorePage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  // Ambil semua GroupRequest (semua status) supaya bisa dibedakan di UI
  const groupRequests = await GroupRequest.getAll()

  // Ambil semua MemberRequest milik user ini supaya tahu mana yang sudah di-request
  const myRequests = await MemberRequest.getByUserId(user.userId)

  return (
    <ExploreClient
      groupRequests={JSON.parse(JSON.stringify(groupRequests))}
      myRequests={JSON.parse(JSON.stringify(myRequests))}
      currentUserId={user.userId}
    />
  )
}