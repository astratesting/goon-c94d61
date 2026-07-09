import { initializeDB, getCampaigns, getLeads, getUsers, getSubscriptions } from "@/lib/db";
import { NextResponse } from "next/server";

await initializeDB();

export async function GET() {
  try {
    const campaigns = getCampaigns();
    const leads = getLeads();
    const users = getUsers();
    const subscriptions = getSubscriptions();

    return NextResponse.json({
      data: {
        campaigns: campaigns.length,
        leads: leads.length,
        users: users.length,
        subscriptions: subscriptions.length,
        activeCampaigns: campaigns.filter((c) => c.status === "active").length,
        newLeads: leads.filter((l) => l.status === "new").length,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
