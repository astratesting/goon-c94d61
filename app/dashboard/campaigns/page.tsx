"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Campaign } from "@/types/global";

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

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((r) => r.json())
      .then((d) => { setCampaigns(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? campaigns : campaigns.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-text font-manrope">Campaigns</h1>
          <p className="text-slate-secondary mt-1">Manage your marketing campaigns</p>
        </div>
        <Link href="/dashboard/configure" className="btn-violet">
          + New Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "active", "draft", "paused", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
              filter === f
                ? "border-violet bg-violet-50 text-violet"
                : "border-gray-200 text-slate-secondary hover:border-violet/30"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-surface-text font-manrope mb-2">No campaigns found</h3>
          <p className="text-slate-secondary mb-6">Get started by creating your first campaign.</p>
          <Link href="/dashboard/configure" className="btn-violet">Create Campaign</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/dashboard/campaigns/${campaign.id}`}
              className="block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <span className="text-violet font-bold text-sm">
                      {(packageLabels[campaign.packageId] || campaign.packageId).slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-surface-text group-hover:text-violet transition-colors font-manrope">
                      {campaign.name}
                    </h3>
                    <p className="text-sm text-slate-secondary">{campaign.geo} · {packageLabels[campaign.packageId] || campaign.packageId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {campaign.adSpend > 0 && (
                    <span className="text-sm text-slate-secondary font-mono-price">${campaign.adSpend.toLocaleString()}/mo</span>
                  )}
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[campaign.status]}`}>
                    {campaign.status}
                  </span>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-violet transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
