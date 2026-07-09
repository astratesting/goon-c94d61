"use client";

import { useState } from "react";
import type { CampaignMetric } from "@/types/global";

interface CampaignKpiProps {
  metrics: CampaignMetric[];
  campaignName: string;
}

export default function CampaignKpi({ metrics, campaignName }: CampaignKpiProps) {
  const [period, setPeriod] = useState<"7d" | "14d" | "30d">("7d");
  const days = period === "7d" ? 7 : period === "14d" ? 14 : 30;

  const recent = metrics
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, days);

  const totals = recent.reduce(
    (acc, m) => ({
      impressions: acc.impressions + m.impressions,
      clicks: acc.clicks + m.clicks,
      leads: acc.leads + m.leads,
      spend: acc.spend + m.spend,
      conversions: acc.conversions + m.conversions,
    }),
    { impressions: 0, clicks: 0, leads: 0, spend: 0, conversions: 0 }
  );

  const ctr = totals.impressions > 0 ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : "0";
  const convRate = totals.clicks > 0 ? ((totals.conversions / totals.clicks) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-text font-manrope">{campaignName} — Performance</h3>
        <div className="flex bg-gray-100 rounded-xl p-0.5">
          {(["7d", "14d", "30d"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                period === p ? "bg-white text-violet shadow-sm" : "text-slate-secondary hover:text-surface-text"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Impressions", value: totals.impressions.toLocaleString() },
          { label: "Clicks", value: totals.clicks.toLocaleString() },
          { label: "CTR", value: `${ctr}%` },
          { label: "Leads", value: totals.leads.toString() },
          { label: "Conv. Rate", value: `${convRate}%` },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-slate-secondary mb-1">{stat.label}</p>
            <p className="text-lg font-bold text-surface-text font-manrope">{stat.value}</p>
          </div>
        ))}
      </div>
      {totals.spend > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-slate-secondary">Total Spend</span>
          <span className="font-semibold text-surface-text font-mono-price">${totals.spend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      )}
    </div>
  );
}
