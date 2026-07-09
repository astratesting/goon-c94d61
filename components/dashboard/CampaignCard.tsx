"use client";

import Link from "next/link";
import type { Campaign } from "@/types/global";

interface CampaignCardProps {
  campaign: Campaign;
}

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-gray-50 text-gray-600 border-gray-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
};

const packageLabels: Record<string, string> = {
  seo: "SEO",
  ppc: "PPC",
  social: "Social Media",
  email: "Email Marketing",
  content: "Content Creation",
};

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const daysAgo = Math.floor((Date.now() - new Date(campaign.updatedAt).getTime()) / 86400000);

  return (
    <Link href={`/dashboard/campaigns/${campaign.id}`}>
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-surface-text truncate group-hover:text-violet transition-colors font-manrope">
              {campaign.name}
            </h3>
            <p className="text-sm text-slate-secondary mt-1">{campaign.geo}</p>
          </div>
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[campaign.status]}`}>
            {campaign.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-secondary">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-violet" />
            {packageLabels[campaign.packageId] || campaign.packageId}
          </span>
          {campaign.adSpend > 0 && (
            <span>${campaign.adSpend.toLocaleString()}/mo</span>
          )}
          <span>{daysAgo === 0 ? "Updated today" : `${daysAgo}d ago`}</span>
        </div>
        {campaign.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {campaign.keywords.slice(0, 3).map((kw) => (
              <span key={kw} className="px-2 py-0.5 bg-gray-50 text-slate-secondary text-xs rounded-md border border-gray-100">
                {kw}
              </span>
            ))}
            {campaign.keywords.length > 3 && (
              <span className="px-2 py-0.5 text-slate-secondary text-xs">+{campaign.keywords.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
