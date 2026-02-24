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
    if (!user) return { error: "Unauthorized" }

    const serviceName = formData.get("serviceName")
    const type = formData.get("type")
    const isReminderActive = formData.get("isReminderActive") === "on"
    const billingDate = formData.get("billingDate")
    const reminderDate = formData.get("reminderDate")
    const billingCycle = Number(formData.get("billingCycle")) || 1

    const masterSvc = await MasterData.findByName(serviceName);
    const logoUrl = masterSvc ? masterSvc.logo : "";

    if (new Date(reminderDate) > new Date(billingDate)) {
      throw new Error("The reminder date must not be later than the billing date.")
    }

    const subData = {
      serviceName,
      logo: logoUrl,
      category: formData.get("category"),
      billingDate,
      pricePaid: Number(formData.get("pricePaid")),
      reminderDate,
      billingCycle,
      type,
      isReminderActive,
      userId: user.userId,
    }

    // 1. Simpan Subscription Utama
    const subResult = await Subscription.create(subData)
    newSubId = subResult.insertedId.toString()

    // 2. Simpan Members (jika tipe Family)
    if (type === "Family") {
      const memberNames = formData.getAll("memberName[]")
      const memberEmails = formData.getAll("memberEmail[]")
      const memberPhones = formData.getAll("memberPhone[]")

      const memberPromises = []

      for (let i = 0; i < memberNames.length; i++) {
        if (memberNames[i]) {
          const email = memberEmails[i] || null
          const phone = memberPhones[i] || null

          if (!email && !phone) {
            throw new Error(`Member "${memberNames[i]}" must provide either an email address or a phone number.`)
          }

          memberPromises.push(Member.create({
            subscriptionId: newSubId,
            name: memberNames[i],
            email,
            phone,
            userId: null,
          }))
        }
      }

      // PASTIKAN SEMUA MEMBER SELESAI DISIMPAN SEBELUM LANJUT
      if (memberPromises.length > 0) {
        await Promise.all(memberPromises)
      }
    }

    // 3. KIRIM EVENT KE INNGEST (SETELAH SEMUA DATA DB SIAP)
    // Kirim event Welcome/Invitation ke Owner dan Member
    await inngest.send({
      name: "app/subscription.created",
      data: { subId: newSubId }
    })

    // Kirim event Reminder jika aktif
    if (subData.isReminderActive) {
      await inngest.send({
        name: "app/subscription.reminder",
        data: {
          subId: newSubId,
          reminderDate: subData.reminderDate,
        },
      })
    }

    revalidatePath("/dashboard")
    isSuccess = true
  } catch (error) {
    return { error: errorHandler(error).message }
  }

  if (isSuccess) redirect("/dashboard")
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

    const masterSvc = await MasterData.findByName(serviceName)
    const logoUrl = masterSvc ? masterSvc.logo : ""

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

    // Update data utama
    await Subscription.update(id, user.userId, updatedData)

    // Handle Update/Tambah Member
    const memberIds = formData.getAll("memberId[]")
    const memberNames = formData.getAll("memberName[]")
    const memberEmails = formData.getAll("memberEmail[]")
    const memberPhones = formData.getAll("memberPhone[]")

    const memberUpdatePromises = []

    for (let i = 0; i < memberNames.length; i++) {
      const name = memberNames[i].trim()
      if (name !== "") {
        const email = memberEmails[i] || null
        const phone = memberPhones[i] || null
        const mId = memberIds[i]

        if (!email && !phone) {
          throw new Error(`Member "${name}" must provide either an email address or a phone number.`);
        }

        if (mId && mId !== "") {
          memberUpdatePromises.push(Member.update(mId, {
            name: name,
            email: email,
            phone: phone,
          }))
        } else {
          // Member baru langsung di-await karena kita butuh ID-nya untuk Inngest
          const memberResult = await Member.create({
            subscriptionId: id,
            name: name,
            email: email,
            phone: phone,
            userId: null,
          })

          // Kirim welcome hanya untuk member baru
          await inngest.send({
            name: "app/subscription.created",
            data: {
              subId: id,
              specificMemberId: memberResult.insertedId.toString()
            }
          })
        }
      }
    }

    if (memberUpdatePromises.length > 0) {
      await Promise.all(memberUpdatePromises)
    }

    // LOGIKA INNGEST REMINDER
    try {
      if (!isReminderActive && existingSub.isReminderActive) {
        await inngest.send({
          name: "app/subscription.reminder.cancel",
          data: { subId: id }
        })
      }
      else if (isReminderActive && !existingSub.isReminderActive) {
        await inngest.send({
          name: "app/subscription.reminder",
          data: { subId: id, reminderDate: reminderDate },
        })
      }
      else if (isReminderActive && existingSub.reminderDate !== reminderDate) {
        await inngest.send({
          name: "app/subscription.reminder.cancel",
          data: { subId: id }
        })
        // Jeda kecil agar pembatalan diproses lebih dulu
        await new Promise(resolve => setTimeout(resolve, 150))
        await inngest.send({
          name: "app/subscription.reminder",
          data: { subId: id, reminderDate: reminderDate },
        })
      }
    } catch (inngestError) {
      console.error("Inngest event error:", inngestError)
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

    const sub = await Subscription.getByUserAndId(user.userId, id)
    if (!sub) throw new Error("Subscription not found or access denied")

    // Batalkan reminder di Inngest sebelum hapus data
    await inngest.send({
      name: "app/subscription.reminder.cancel",
      data: { subId: id }
    })

    await Member.deleteBySubscriptionId(id, user.userId)
    await Subscription.delete(id, user.userId)

    revalidatePath("/dashboard")
  } catch (error) {
    return { error: errorHandler(error).message }
  }
  redirect("/dashboard")
}

// Buat subscription dari GroupRequest yang sudah full
export async function setupSubscriptionFromGroup(formData) {
  let isSuccess = false

  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Unauthorized" }

    const groupRequestId = formData.get("groupRequestId")
    const serviceName = formData.get("serviceName")
    const billingDate = formData.get("billingDate")
    const reminderDate = formData.get("reminderDate")
    const billingCycle = Number(formData.get("billingCycle")) || 1
    const pricePaid = Number(formData.get("pricePaid"))
    const isReminderActive = formData.get("isReminderActive") === "on"
    const membersData = JSON.parse(formData.get("membersData") || "[]")

    if (new Date(reminderDate) > new Date(billingDate)) {
      throw new Error("The reminder date must not be later than the billing date.")
    }

    const masterSvc = await MasterData.findByName(serviceName)
    const logoUrl = masterSvc?.logo || ""

    // Buat subscription bertipe Family
    const subResult = await Subscription.create({
      serviceName,
      logo: logoUrl,
      category: masterSvc?.category || "Other",
      billingDate,
      reminderDate,
      billingCycle,
      pricePaid,
      type: "Family",
      isReminderActive,
      userId: user.userId,
    })

    const newSubId = subResult.insertedId.toString()

    const { getDb } = await import("@/server/config/mongodb")
    const { ObjectId } = await import("mongodb")
    const db = await getDb()

    // Update data member + link ke subscription baru
    for (const m of membersData) {
      await db.collection("members").updateOne(
        { _id: new ObjectId(m.memberId) },
        {
          $set: {
            subscriptionId: newSubId,
            name: m.name,
            email: m.email || "",
            phone: m.phone || "",
          }
        }
      )
    }

    // Update GroupRequest: simpan subscriptionId + tutup group
    await db.collection("groupRequests").updateOne(
      { _id: new ObjectId(groupRequestId) },
      { $set: { subscriptionId: newSubId, status: "closed" } }
    )

    if (isReminderActive) {
      await inngest.send({
        name: "app/subscription.reminder",
        data: { subId: newSubId, reminderDate },
      })
    }

    revalidatePath("/dashboard")
    revalidatePath(`/dashboard/group-requests/${groupRequestId}`)
    isSuccess = true
  } catch (error) {
    console.log("SETUP ERROR:", error)
    return { error: errorHandler(error).message }
  }

  if (isSuccess) redirect("/dashboard")
}