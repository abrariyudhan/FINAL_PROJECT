import MasterData from "@/server/models/MasterData";
import CreateGroupRequestForm from "@/components/CreateGroupRequestForm";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateGroupRequestPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  // Hanya butuh master services untuk pilih service name + logo
  const masterServices = await MasterData.findAll()

  return (
    <CreateGroupRequestForm
      masterServices={JSON.parse(JSON.stringify(masterServices))}
    />
  )
}