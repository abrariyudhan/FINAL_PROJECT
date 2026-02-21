import AddSubscriptionForm from "@/components/AddForm";
import { getDb } from "@/server/config/mongodb";

export default async function AddSubscriptionPage() {
  // Ambil Master Data dari Database
  const db = await getDb()
  const masterServices = await db.collection("services")
    .find({})
    .sort({ serviceName: 1 })
    .toArray()

  // Render Client Component dan kirim data sebagai props
  // Kita gunakan JSON.parse/stringify untuk menghindari error serialisasi MongoDB ID
  return (
    <AddSubscriptionForm 
      masterServices={JSON.parse(JSON.stringify(masterServices))} 
    />
  )
}