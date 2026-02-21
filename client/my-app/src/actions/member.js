"use server"

import Member from "@/server/models/Member";
import { errorHandler } from "@/server/helpers/errorHandler";
import { revalidatePath } from "next/cache";

export async function addMember(formData) {
  try {
    const subId = formData.get("subscriptionId")
    
    const data = {
      subscriptionId: subId,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      userId: formData.get("userId") || null,
      role: "member"
    }

    if (!data.name || (!data.email && !data.phone)) {
      throw new Error("Name and contact information (Email/Phone Number) are required.")
    }

    await Member.create(data)
    
    revalidatePath(`/dashboard/${subId}`)
    return { success: true }
  } catch (error) {
    return { error: errorHandler(error).message }
  }
}

export async function deleteMember(memberId, subId) {
  try {
    await Member.deleteById(memberId)
    revalidatePath(`/dashboard/${subId}/edit`)
    revalidatePath(`/dashboard/${subId}`)
    return { success: true }
  } catch (error) {
    return { error: errorHandler(error).message }
  }
}