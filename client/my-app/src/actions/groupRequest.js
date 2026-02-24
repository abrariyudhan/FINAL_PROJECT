"use server";

import GroupRequest from "@/server/models/GroupRequest";
import MemberRequest from "@/server/models/MemberRequest";
import Member from "@/server/models/Member";
import MasterData from "@/server/models/MasterData";
import { getCurrentUser } from "@/actions/auth";
import { revalidatePath } from "next/cache";

// ============================================================
// GROUP REQUEST ACTIONS (Owner)
// ============================================================

export async function createGroupRequest(formData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const serviceName = formData.get("serviceName");
    const title = formData.get("title");
    const description = formData.get("description");
    const maxSlot = formData.get("maxSlot");

    if (!serviceName || !title || !maxSlot) {
      return { error: "Service name, title, and max slot are required" };
    }

    if (Number(maxSlot) < 1 || Number(maxSlot) > 20) {
      return { error: "Max slot must be between 1 and 20" };
    }

    const masterSvc = await MasterData.findByName(serviceName);
    const logo = masterSvc?.logo || "";

    await GroupRequest.create({
      ownerId: user.userId,
      serviceName,
      logo,
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

export async function updateGroupRequest(groupRequestId, formData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const serviceName = formData.get("serviceName");
    const title = formData.get("title");
    const description = formData.get("description");
    const maxSlot = formData.get("maxSlot");

    if (!serviceName || !title || !maxSlot) {
      return { error: "Service name, title, and max slot are required" };
    }

    if (Number(maxSlot) < 1 || Number(maxSlot) > 20) {
      return { error: "Max slot must be between 1 and 20" };
    }

    const masterSvc = await MasterData.findByName(serviceName);
    const logo = masterSvc?.logo || "";

    await GroupRequest.update(groupRequestId, user.userId, {
      serviceName,
      logo,
      title,
      description,
      maxSlot,
    });

    revalidatePath(`/dashboard/group-requests/${groupRequestId}`);
    revalidatePath("/dashboard/group-requests");
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to update group request" };
  }
}

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

export async function deleteGroupRequest(groupRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const groupReq = await GroupRequest.getById(groupRequestId);
    if (groupReq.ownerId.toString() !== user.userId) {
      return { error: "You are not authorized to delete this group request" };
    }

    const { getDb } = await import("@/server/config/mongodb");
    const { ObjectId } = await import("mongodb");
    const db = await getDb();

    await db.collection("memberRequests").deleteMany({
      groupRequestId: new ObjectId(groupRequestId),
    });

    await db.collection("members").deleteMany({
      groupRequestId: groupRequestId,
    });

    await GroupRequest.delete(groupRequestId, user.userId);

    revalidatePath("/dashboard/group-requests");
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to delete group request" };
  }
}

export async function removeApprovedMember(memberRequestId, groupRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const groupReq = await GroupRequest.getById(groupRequestId);
    if (groupReq.ownerId.toString() !== user.userId) {
      return { error: "You are not authorized to remove this member" };
    }

    const { getDb } = await import("@/server/config/mongodb");
    const { ObjectId } = await import("mongodb");
    const db = await getDb();

    const memberReq = await MemberRequest.getById(memberRequestId);

    await MemberRequest.updateStatus(memberRequestId, "rejected");

    await db.collection("members").deleteOne({
      groupRequestId: groupRequestId,
      userId: memberReq.userId.toString(),
    });

    await GroupRequest.incrementSlot(groupRequestId);

    revalidatePath(`/dashboard/group-requests/${groupRequestId}`);
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to remove member" };
  }
}

// ============================================================
// MEMBER REQUEST ACTIONS
// ============================================================

export async function sendMemberRequest(groupRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const existing = await MemberRequest.findExisting(user.userId, groupRequestId);
    if (existing) {
      if (existing.status === "pending")
        return { error: "You already have a pending request" };
      if (existing.status === "approved")
        return { error: "You are already a member" };
      await MemberRequest.updateStatus(existing._id.toString(), "pending");
      revalidatePath("/dashboard/explore");
      return { success: true };
    }

    const groupReq = await GroupRequest.getById(groupRequestId);
    if (groupReq.status !== "open") {
      return { error: "This group is no longer accepting requests" };
    }

    await MemberRequest.create({ userId: user.userId, groupRequestId });

    revalidatePath("/dashboard/explore");
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to send request" };
  }
}

// ============================================================
// APPROVE / REJECT ACTIONS
// ============================================================

export async function approveMemberRequest(memberRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const memberReq = await MemberRequest.getById(memberRequestId);
    const groupReq = await GroupRequest.getById(memberReq.groupRequestId.toString());

    if (groupReq.ownerId.toString() !== user.userId) {
      return { error: "You are not authorized to approve this request" };
    }

    if (memberReq.status !== "pending") {
      return { error: "This request has already been processed" };
    }

    if (groupReq.availableSlot <= 0) {
      return { error: "No available slots" };
    }

    const { getDb } = await import("@/server/config/mongodb");
    const { ObjectId } = await import("mongodb");
    const db = await getDb();

    const requestUser = await db.collection("users").findOne({
      _id: new ObjectId(memberReq.userId.toString()),
    });

    await MemberRequest.updateStatus(memberRequestId, "approved");
    await GroupRequest.decrementSlot(memberReq.groupRequestId.toString());

    await Member.create({
      userId: memberReq.userId.toString(),
      groupRequestId: memberReq.groupRequestId.toString(),
      name: requestUser?.fullname || requestUser?.username || "Unknown",
      email: requestUser?.email || "",
      phone: requestUser?.phoneNumber || "",
    });

    // Group & Chat akan dibuat setelah owner setup subscription
    // (tidak lagi otomatis saat full)

    revalidatePath(`/dashboard/group-requests/${memberReq.groupRequestId}`);
    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to approve request" };
  }
}

export async function rejectMemberRequest(memberRequestId) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const memberReq = await MemberRequest.getById(memberRequestId);
    const groupReq = await GroupRequest.getById(memberReq.groupRequestId.toString());

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