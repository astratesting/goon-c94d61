import { initializeDB, getCampaigns, getLeads, getCampaignMetrics } from "@/lib/db";
import { NextResponse } from "next/server";

await initializeDB();

export async function GET() {
  try {
    const campaigns = getCampaigns();
    const leads = getLeads();

    const campaignsData = campaigns.slice(0, 5).map((c) => {
      const metrics = getCampaignMetrics(c.id);
      const campaignLeads = leads.filter((l) => l.campaignId === c.id);
      const totalImpressions = metrics.reduce((sum, m) => sum + m.impressions, 0);
      return { ...c, leadCount: campaignLeads.length, impressions: totalImpressions };
    });

    return NextResponse.json({ data: campaignsData });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
