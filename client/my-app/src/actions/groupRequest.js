"use server";

import GroupRequest from "@/server/models/GroupRequest";
import MemberRequest from "@/server/models/MemberRequest";
import Member from "@/server/models/Member";
import Group from "@/server/models/Group";
import Chat from "@/server/models/Chat";
import { getCurrentUser } from "@/actions/auth";
import { revalidatePath } from "next/cache";

// ============================================================
// GROUP REQUEST ACTIONS (Owner)
// ============================================================

// Owner membuat GroupRequest baru dari subscription-nya
export async function createGroupRequest(formData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const serviceId = formData.get("serviceId");
    const title = formData.get("title");
    const description = formData.get("description");
    const maxSlot = formData.get("maxSlot");
    const subscriptionId = formData.get("subscriptionId");

    if (!serviceId || !title || !maxSlot) {
      return { error: "ServiceId, title, and maxSlot are required" };
    }

    if (Number(maxSlot) < 1 || Number(maxSlot) > 20) {
      return { error: "Max slot must be between 1 and 20" };
    }

    await GroupRequest.create({
      ownerId: user.userId,
      serviceId,
      subscriptionId,
      title,
      description,
      maxSlot,
    });

    revalidatePath("/dashboard/group-requests");
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to create group request" };
  }
}

// Owner menutup GroupRequest-nya
export async function closeGroupRequest(groupRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    await GroupRequest.close(groupRequestId, user.userId);

    revalidatePath("/dashboard/group-requests");
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to close group request" };
  }
}

// ============================================================
// MEMBER REQUEST ACTIONS (User yang ingin bergabung)
// ============================================================

// User mengirim request untuk bergabung ke GroupRequest
export async function sendMemberRequest(groupRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    // Cek apakah sudah pernah request sebelumnya
    const existing = await MemberRequest.findExisting(
      user.userId,
      groupRequestId,
    );
    if (existing) {
      if (existing.status === "pending")
        return { error: "You already have a pending request" };
      if (existing.status === "approved")
        return { error: "You are already a member" };
      // Kalau rejected, boleh request ulang — update status ke pending lagi
      await MemberRequest.updateStatus(existing._id.toString(), "pending");
      revalidatePath("/dashboard/explore");
      return { success: true };
    }

    // Cek apakah GroupRequest masih open dan ada slot
    const groupReq = await GroupRequest.getById(groupRequestId);
    if (groupReq.status !== "open") {
      return { error: "This group is no longer accepting requests" };
    }

    await MemberRequest.create({
      userId: user.userId,
      groupRequestId,
    });

    revalidatePath("/dashboard/explore");
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to send request" };
  }
}

// ============================================================
// APPROVE / REJECT ACTIONS (Owner)
// ============================================================

// Buat Group dan Chat otomatis saat GroupRequest penuh
async function createGroupFromRequest(groupRequestId) {
  try {
    const groupReq = await GroupRequest.getById(groupRequestId);

    // Ambil semua members yang sudah approved
    const members = await Member.getByGroupRequestId(groupRequestId);
    const memberIds = members.map((m) => m.userId.toString());

    // Include owner juga sebagai member
    const ownerIdString = groupReq.ownerId.toString();
    if (!memberIds.includes(ownerIdString)) {
      memberIds.push(ownerIdString);
    }

    console.log(
      `📝 Creating group for ${groupReq.title} with ${memberIds.length} members:`,
      memberIds,
    );

    // Create Group
    const groupResult = await Group.create({
      name: groupReq.title,
      description: groupReq.description || `Group for ${groupReq.title}`,
      members: memberIds,
      groupRequestId: groupRequestId,
    });

    const groupId = groupResult.insertedId.toString();

    // Create Chat untuk group
    const chatResult = await Chat.create({
      participants: memberIds,
      type: "group", // Group chat
      groupId: groupId,
    });

    console.log(
      `✅ Group chat created for GroupRequest ${groupRequestId}, Chat ID: ${chatResult.insertedId}`,
    );
    console.log(`   Participants:`, memberIds);
    return { success: true, groupId };
  } catch (error) {
    console.error("Error creating group:", error);
    return { success: false, error: error.message };
  }
}

// Owner meng-approve MemberRequest
// Saat approve: update status + kurangi slot + buat Member baru
export async function approveMemberRequest(memberRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    // Ambil MemberRequest
    const memberReq = await MemberRequest.getById(memberRequestId);

    // Ambil GroupRequest secara terpisah
    const groupReq = await GroupRequest.getById(
      memberReq.groupRequestId.toString(),
    );

    // Pastikan yang approve adalah owner
    if (groupReq.ownerId.toString() !== user.userId) {
      return { error: "You are not authorized to approve this request" };
    }

    if (memberReq.status !== "pending") {
      return { error: "This request has already been processed" };
    }

    if (groupReq.availableSlot <= 0) {
      return { error: "No available slots" };
    }

    // Ambil data user yang request
    const { getDb } = await import("@/server/config/mongodb");
    const { ObjectId } = await import("mongodb");
    const db = await getDb();
    const requestUser = await db.collection("users").findOne({
      _id: new ObjectId(memberReq.userId.toString()),
    });

    // 1. Update status → approved
    await MemberRequest.updateStatus(memberRequestId, "approved");

    // 2. Kurangi slot
    await GroupRequest.decrementSlot(memberReq.groupRequestId.toString());

    // 3. Buat Member baru dengan groupRequestId untuk tracking
    await Member.create({
      subscriptionId:
        groupReq.subscriptionId?.toString() || groupReq._id.toString(),
      userId: memberReq.userId.toString(),
      groupRequestId: memberReq.groupRequestId.toString(), // Link ke GroupRequest
      name: requestUser?.fullname || requestUser?.username || "Unknown",
      email: requestUser?.email || "",
      phone: requestUser?.phoneNumber || "",
    });

    // 4. Cek jika GroupRequest sudah full, create Group & Chat otomatis
    const updatedGroupReq = await GroupRequest.getById(
      memberReq.groupRequestId.toString(),
    );
    if (updatedGroupReq.status === "full") {
      await createGroupFromRequest(memberReq.groupRequestId.toString());
    }

    revalidatePath(`/dashboard/group-requests/${memberReq.groupRequestId}`);
    revalidatePath("/chat"); // Refresh chat page
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to approve request" };
  }
}

// Owner meng-reject MemberRequest
export async function rejectMemberRequest(memberRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const memberReq = await MemberRequest.getById(memberRequestId);
    const groupReq = await GroupRequest.getById(
      memberReq.groupRequestId.toString(),
    );

    if (groupReq.ownerId.toString() !== user.userId) {
      return { error: "You are not authorized to reject this request" };
    }

    if (memberReq.status !== "pending") {
      return { error: "This request has already been processed" };
    }

    await MemberRequest.updateStatus(memberRequestId, "rejected");

    revalidatePath(`/dashboard/group-requests/${memberReq.groupRequestId}`);
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to reject request" };
  }
}
