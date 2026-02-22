"use server"

import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import MasterData from "@/server/models/MasterData";
import { errorHandler } from "@/server/helpers/errorHandler";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFullSubscription(formData) {
  let isSuccess = false
  let newSubId = ""

  try {
    const serviceName = formData.get("serviceName")
    const type = formData.get("type")
    const isReminderActive = formData.get("isReminderActive") === "on"
    const billingDate = formData.get("billingDate")
    const reminderDate = formData.get("reminderDate")
    const billingCycle = Number(formData.get("billingCycle")) || 1

    // CARI LOGO DARI MASTER DATA
    // Jika tidak ditemukan (karena input manual), logo akan menjadi string kosong
    const masterSvc = await MasterData.findByName(serviceName);
    const logoUrl = masterSvc ? masterSvc.logo : "";

    // VALIDASI LOGIKA TANGGAL
    if (new Date(reminderDate) > new Date(billingDate)) {
      throw new Error("The reminder date must not be later than the billing date.")
    }

    const subData = {
      serviceName: serviceName,
      logo: logoUrl,
      category: formData.get("category"),
      billingDate: billingDate,
      pricePaid: Number(formData.get("pricePaid")),
      reminderDate: reminderDate,
      billingCycle: billingCycle,
      type: type,
      isReminderActive: isReminderActive,
    }

    const subResult = await Subscription.create(subData)
    newSubId = subResult.insertedId.toString()

    if (type === "Family") {
      const memberNames = formData.getAll("memberName[]")
      const memberEmails = formData.getAll("memberEmail[]")
      const memberPhones = formData.getAll("memberPhone[]")

      for (let i = 0; i < memberNames.length; i++) {
        if (memberNames[i]) {
          const email = memberEmails[i] || null
          const phone = memberPhones[i] || null

          // VALIDASI KONTAK MEMBER
          if (!email && !phone) {
            throw new Error(`Member "${memberNames[i]}" must provide either an email address or a phone number.`)
          }

          await Member.create({
            subscriptionId: newSubId,
            name: memberNames[i],
            email: email,
            phone: phone,
            userId: null,
          })
        }
      }
    }

    revalidatePath("/dashboard")
    isSuccess = true
  } catch (error) {
    return { error: errorHandler(error).message }
  }

  if (isSuccess) {
    redirect("/dashboard")
  }
}

export async function updateFullSubscription(formData) {
  const id = formData.get("id")
  let isSuccess = false

  try {
    const serviceName = formData.get("serviceName")
    const isReminderActive = formData.get("isReminderActive") === "on"
    const billingDate = formData.get("billingDate")
    const reminderDate = formData.get("reminderDate")
    const billingCycle = Number(formData.get("billingCycle")) || 1

    // CARI LOGO TERBARU DARI MASTER DATA (Antisipasi jika user mengubah nama service)
    const masterSvc = await MasterData.findByName(serviceName)
    const logoUrl = masterSvc ? masterSvc.logo : ""

    // VALIDASI LOGIKA TANGGAL
    if (new Date(reminderDate) > new Date(billingDate)) {
      throw new Error("The reminder date must not be later than the billing date.")
    }
    
    const updatedData = {
      serviceName: serviceName,
      logo: logoUrl,
      category: formData.get("category"),
      billingDate: billingDate,
      billingCycle: billingCycle,
      pricePaid: Number(formData.get("pricePaid")),
      reminderDate: reminderDate,
      isReminderActive: isReminderActive,
      type: formData.get("type"), 
    }

    // Update data utama subscription
    await Subscription.update(id, updatedData)

    // Update/Tambah member baru jika ada
    const memberNames = formData.getAll("memberName[]")
    const memberEmails = formData.getAll("memberEmail[]")
    const memberPhones = formData.getAll("memberPhone[]")

    for (let i = 0; i < memberNames.length; i++) {
      if (memberNames[i].trim() !== "") {
        const email = memberEmails[i] || null
        const phone = memberPhones[i] || null

        if (!email && !phone) {
          throw new Error(`New member "${memberNames[i]}" must provide either an email address or a phone number.`);
        }

        await Member.create({
          subscriptionId: id,
          name: memberNames[i],
          email: email,
          phone: phone,
          userId: null,
        })
      }
    }

    revalidatePath(`/dashboard/${id}`)
    revalidatePath("/dashboard")
    isSuccess = true
  } catch (error) {
    return { error: errorHandler(error).message }
  }

  if (isSuccess) {
    redirect(`/dashboard/${id}`)
  }
}

export async function deleteSubscription(id) {
  try {
    // Bersihkan semua member terkait
    await Member.deleteBySubscriptionId(id)
    
    // Hapus data utama
    await Subscription.delete(id)

    revalidatePath("/dashboard")
  } catch (error) {
    return { error: errorHandler(error).message }
  }
  redirect("/dashboard")
}