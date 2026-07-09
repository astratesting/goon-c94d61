"use client";

import Link from "next/link";
import type { Campaign } from "@/types/global";

const statusStyles: Record<string, string> = { active: "bg-green-50 text-green-700 border-green-200", draft: "bg-gray-50 text-gray-600 border-gray-200", paused: "bg-amber-50 text-amber-700 border-amber-200" };
const packageLabels: Record<string, string> = { seo: "SEO", ppc: "PPC", social: "Social", email: "Email", content: "Content" };

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link href={`/dashboard/campaigns/${campaign.id}`}>
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-surface-text truncate group-hover:text-violet transition-colors font-manrope">{campaign.name}</h3>
            <p className="text-sm text-slate-secondary mt-1">{campaign.geo}</p>
          </div>
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[campaign.status]}`}>{campaign.status}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-secondary">
          <span>{packageLabels[campaign.packageId] || campaign.packageId}</span>
          {campaign.adSpend > 0 && <span>${campaign.adSpend.toLocaleString()}/mo</span>}
        </div>
      </div>
    </Link>
  );
}
