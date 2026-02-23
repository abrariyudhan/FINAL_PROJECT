"use server";

import Group from "@/server/models/Group";
import Chat from "@/server/models/Chat";
import GroupRequest from "@/server/models/GroupRequest";
import Member from "@/server/models/Member";

// Utility to create groups and chats for completed GroupRequests
export async function syncGroupChats() {
  try {
    console.log("🔄 Starting group chat sync...");

    // Step 1: Find GroupRequests that are "full" but don't have Groups yet
    const { getDb } = await import("@/server/config/mongodb.js");
    const db = await getDb();
    const groupRequestsCollection = db.collection("groupRequests");
    const groupsCollection = db.collection("groups");

    const fullRequests = await groupRequestsCollection
      .find({
        status: "full",
      })
      .toArray();

    console.log(`📊 Found ${fullRequests.length} full GroupRequests`);

    let groupsCreated = 0;
    let chatsCreated = 0;

    for (const groupReq of fullRequests) {
      const groupReqId = groupReq._id.toString();

      // Check if Group already exists for this GroupRequest
      const existingGroup = await groupsCollection.findOne({
        groupRequestId: groupReqId,
      });

      if (!existingGroup) {
        console.log(`🆕 Creating Group for GroupRequest: ${groupReq.title}`);

        // Get all approved members
        const members = await Member.getByGroupRequestId(groupReqId);
        const memberIds = members.map((m) => m.userId.toString());

        // Include owner
        const ownerIdString = groupReq.ownerId.toString();
        if (!memberIds.includes(ownerIdString)) {
          memberIds.push(ownerIdString);
        }

        console.log(`   👥 Members: ${memberIds.length}`, memberIds);

        // Create Group
        const groupResult = await Group.create({
          name: groupReq.title,
          description: groupReq.description || `Group for ${groupReq.title}`,
          members: memberIds,
          groupRequestId: groupReqId,
        });

        const groupId = groupResult.insertedId.toString();
        groupsCreated++;

        // Create Chat for this group
        const chatResult = await Chat.create({
          participants: memberIds,
          type: "group",
          groupId: groupId,
        });

        chatsCreated++;
        console.log(
          `   ✅ Created Group ${groupId} and Chat ${chatResult.insertedId}`,
        );
      }
    }

    // Step 2: For existing groups without chats, create chats
    const allGroups = await Group.getAll();
    const allChats = await Chat.getAll();
    const existingGroupIds = allChats.map((c) => c.groupId).filter(Boolean);

    for (const group of allGroups) {
      const groupId = group._id.toString();

      if (!existingGroupIds.includes(groupId)) {
        console.log(`💬 Creating chat for existing group: ${group.name}`);

        await Chat.create({
          participants: group.members || [],
          type: "group",
          groupId: groupId,
        });

        chatsCreated++;
      }
    }

    console.log(
      `✨ Sync complete! Created ${groupsCreated} groups and ${chatsCreated} chats`,
    );
    return { success: true, groupsCreated, chatsCreated };
  } catch (error) {
    console.error("❌ Error syncing group chats:", error);
    return { success: false, error: error.message };
  }
}
