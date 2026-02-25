"use client"

import { logoutUser } from "@/actions/auth"
import { FiLogOut } from "react-icons/fi"
import Swal from "sweetalert2"

export default function LogoutButton() {
  async function handleLogout() {
    const result = await Swal.fire({
      title: "SIGN OUT",
      text: "Are you sure you want to end your session?",
      icon: "warning",
      showCancelButton: true,
      // Menyesuaikan warna dengan palet Slate & Emerald/Sky
      confirmButtonColor: "#0f172a", // slate-900
      cancelButtonColor: "#94a3b8",  // slate-400
      confirmButtonText: "YES, LOGOUT",
      cancelButtonText: "CANCEL",
      background: "#ffffff",
      customClass: {
        title: "font-black text-sm tracking-[0.2em] text-slate-900",
        htmlContainer: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
        confirmButton: "text-[10px] font-black tracking-widest px-6 py-3 rounded-none",
        cancelButton: "text-[10px] font-black tracking-widest px-6 py-3 rounded-none"
      }
    })

    if (result.isConfirmed) {
      await logoutUser()
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="group flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-900 text-slate-400 hover:text-slate-900 px-6 py-4 rounded font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
    >
      <FiLogOut 
        className="text-slate-300 group-hover:text-rose-500 transition-colors" 
        size={14} 
        strokeWidth={3} 
      />
      <span>Logout</span>
    </button>
  )
}