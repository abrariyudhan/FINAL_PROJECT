import GroupRequest from "@/server/models/GroupRequest";
import MemberRequest from "@/server/models/MemberRequest";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import MyGroupRequestsClient from "@/components/MyGroupRequestsClient";
import { getDb } from "@/server/config/mongodb";
import { ObjectId } from "mongodb";

export default async function GroupRequestsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const db = await getDb();

  // === SECTION 1: Group yang dibuat user sebagai Owner ===
  const myGroupRequests = await GroupRequest.getByOwnerId(user.userId);

  const myGroupRequestsWithService = await Promise.all(
    myGroupRequests.map(async (gr) => {
      // ✅ FIX: Ambil service dari table services menggunakan serviceId
      let service = null;
      if (gr.serviceId) {
        service = await db.collection("services").findOne({
          _id: new ObjectId(gr.serviceId.toString())
        });
      }

      // ✅ Fallback: Jika service tidak ditemukan, pakai field langsung dari groupRequest
      if (!service) {
        service = {
          serviceName: gr.serviceName || "Unknown Service",
          logo: gr.logo || null,
          category: gr.category || "Other",
        };
      }

      const approvedCount = await db.collection("memberRequests").countDocuments({
        groupRequestId: new ObjectId(gr._id.toString()),
        status: "approved",
      });
      const pendingCount = await db.collection("memberRequests").countDocuments({
        groupRequestId: new ObjectId(gr._id.toString()),
        status: "pending",
      });

      return { ...gr, service, approvedCount, pendingCount };
    })
  );

  // === SECTION 2: Group yang user sudah join sebagai Member ===
  const myMemberRequests = await MemberRequest.getByUserId(user.userId);
  const approvedMemberRequests = myMemberRequests.filter((r) => r.status === "approved");

  const joinedGroups = await Promise.all(
    approvedMemberRequests.map(async (mr) => {
      const gr = await db.collection("groupRequests").findOne({
        _id: new ObjectId(mr.groupRequestId.toString()),
      });
      if (!gr) return null;

      // ✅ FIX: Ambil service dari table services menggunakan serviceId
      let service = null;
      if (gr.serviceId) {
        service = await db.collection("services").findOne({
          _id: new ObjectId(gr.serviceId.toString())
        });
      }

      // ✅ Fallback: Jika service tidak ditemukan, pakai field langsung
      if (!service) {
        service = {
          serviceName: gr.serviceName || "Unknown Service",
          logo: gr.logo || null,
          category: gr.category || "Other",
        };
      }

      const owner = await db.collection("users").findOne(
        { _id: new ObjectId(gr.ownerId.toString()) },
        { projection: { fullname: 1, username: 1, email: 1 } }
      );

      return { ...gr, service, owner, memberRequestId: mr._id };
    })
  );

  const validJoinedGroups = joinedGroups.filter(Boolean);

  return (
    <MyGroupRequestsClient
      myGroupRequests={JSON.parse(JSON.stringify(myGroupRequestsWithService))}
      joinedGroups={JSON.parse(JSON.stringify(validJoinedGroups))}
      currentUserId={user.userId}
    />
  );
}