"use server"

import Subscription from "@/server/models/Subscription";
import Member from "@/server/models/Member";
import MasterData from "@/server/models/MasterData";
import { errorHandler } from "@/server/helpers/errorHandler";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth"
import { inngest } from "@/server/lib/inngest/client";

export async function createFullSubscription(formData) {
  let isSuccess = false
  let newSubId = ""

  try {
    const user = await getCurrentUser()
    // Validasi jika user tidak ada
    if (!user) return { error: "Unauthorized" }

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
      userId: user.userId,
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

    if (subData.isReminderActive) {
      await inngest.send({
        name: "app/subscription.reminder",
        data: {
          subId: subResult.insertedId.toString(),
          reminderDate: subData.reminderDate,
        },
      })
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
    const user = await getCurrentUser()
    if (!user.userId) throw new Error("Unauthorized")

    const existingSub = await Subscription.getByUserAndId(user.userId, id)
    if (!existingSub) throw new Error("Subscription not found or access denied")

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
      userId: user.userId,
    }

    // Update data utama subscription
    await Subscription.update(id, user.userId, updatedData)

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

    // HANDLE INNGEST EVENTS - Setelah semua update berhasil
    try {
      // Jika user matikan reminder DAN sebelumnya aktif
      if (!isReminderActive && existingSub.isReminderActive) {
        await inngest.send({
          name: "app/subscription.reminder.cancel",
          data: { subId: id }
        })
      } 
      // Jika user nyalakan reminder DAN sebelumnya mati
      else if (isReminderActive && !existingSub.isReminderActive) {
        await inngest.send({
          name: "app/subscription.reminder",
          data: {
            subId: id,
            reminderDate: reminderDate,
          },
        })
      }
      // Jika reminder tetap aktif tapi tanggal berubah
      else if (isReminderActive && existingSub.reminderDate !== reminderDate) {
        // Cancel dulu, baru schedule ulang
        await inngest.send({
          name: "app/subscription.reminder.cancel",
          data: { subId: id }
        })
        
        // Kasih delay kecil
        await new Promise(resolve => setTimeout(resolve, 100))
        
        await inngest.send({
          name: "app/subscription.reminder",
          data: {
            subId: id,
            reminderDate: reminderDate,
          },
        })
      }
      } catch (inngestError) {
      // Log error tapi jangan fail keseluruhan update
      console.error("Inngest event error (non-critical):", inngestError)
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
    const user = await getCurrentUser()
    if (!user.userId) throw new Error("Unauthorized")

    // Pastikan user memiliki akses ke subscription ini
    const sub = await Subscription.getByUserAndId(user.userId, id)
    if (!sub) throw new Error("Subscription not found or access denied")

    // Bersihkan semua member terkait
    await Member.deleteBySubscriptionId(id, user.userId)

    // Hapus data utama
    await Subscription.delete(id, user.userId)

    revalidatePath("/dashboard")
  } catch (error) {
    return { error: errorHandler(error).message }
  }
  redirect("/dashboard")
}