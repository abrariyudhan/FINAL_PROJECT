import { serve } from "inngest/next";
import { inngest } from "@/server/lib/inngest/client";
import { sendSubscriptionReminder } from "@/server/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendSubscriptionReminder,
  ],
})