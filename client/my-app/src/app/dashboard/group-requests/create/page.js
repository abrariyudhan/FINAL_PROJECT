import { getDb } from "@/server/config/mongodb";
import CreateGroupRequestForm from "@/components/CreateGroupRequestForm";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateGroupRequestPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const db = await getDb()

  // Ambil subscription milik user yang bertipe Family
  const subscriptions = await db.collection("subscriptions")
    .find({ userId: user.userId, type: "Family" })
    .sort({ billingDate: 1 })
    .toArray()

  // Ambil master services untuk info logo & nama
  const masterServices = await db.collection("services")
    .find({})
    .toArray()

  return (
    <CreateGroupRequestForm
      subscriptions={JSON.parse(JSON.stringify(subscriptions))}
      masterServices={JSON.parse(JSON.stringify(masterServices))}
    />
  )
}