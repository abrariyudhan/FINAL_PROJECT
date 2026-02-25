import { getCurrentUser } from "@/actions/auth";
import Navbar from "@/components/Navbar";

export default async function UserLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  )
}
