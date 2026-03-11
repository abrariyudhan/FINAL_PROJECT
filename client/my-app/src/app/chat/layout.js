import { getCurrentUser } from "@/actions/auth";
import Navbar from "@/components/Navbar";

export default async function UserLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      {children}
    </div>
  )
}
