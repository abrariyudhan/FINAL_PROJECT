"use client"

import { logoutUser } from "@/actions/auth"
import Swal from "sweetalert2"

export default function LogoutButton() {
  async function handleLogout() {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Logout",
    })

    if (result.isConfirmed) {
      await logoutUser()
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
    >
      Logout
    </button>
  )
}
