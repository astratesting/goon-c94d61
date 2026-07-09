import CampaignCard from "@/components/dashboard/CampaignCard";
import type { Campaign } from "@/types/global";

const mockCampaigns: Campaign[] = [
  { id: "1", userId: "", name: "Phoenix Home Buyers SEO", packageId: "seo", status: "active", geo: "Phoenix, AZ", keywords: ["phoenix homes"], adSpend: 0, cpc: 0, startDate: new Date(Date.now() - 45 * 86400000).toISOString(), endDate: null, createdAt: new Date(Date.now() - 45 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "2", userId: "", name: "Scottsdale PPC Campaign", packageId: "ppc", status: "active", geo: "Scottsdale, AZ", keywords: ["scottsdale luxury"], adSpend: 5000, cpc: 2.45, startDate: new Date(Date.now() - 30 * 86400000).toISOString(), endDate: null, createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 1 * 86400000).toISOString() },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-text font-manrope">Campaigns</h1>
        <a href="/dashboard/services" className="btn-violet">+ New Campaign</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCampaigns.map((c) => <CampaignCard key={c.id} campaign={c} />)}
      </div>
    </div>
  );
}
