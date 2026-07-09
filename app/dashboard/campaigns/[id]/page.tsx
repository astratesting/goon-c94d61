"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import type { Campaign, Lead, CampaignMetric } from "@/types/global";

const packageLabels: Record<string, string> = {
  seo: "SEO Optimization",
  ppc: "PPC Advertising",
  social: "Social Media",
  email: "Email Marketing",
  content: "Content Creation",
};

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-gray-50 text-gray-600 border-gray-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<CampaignMetric[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "settings">("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch campaign data from a mock source
    fetch("/api/campaigns")
      .then((r) => r.json())
      .then((d) => {
        const found = (d.data || []).find((c: Campaign) => c.id === id);
        setCampaign(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-surface-text font-manrope mb-4">Campaign not found</h2>
        <Link href="/dashboard/campaigns" className="btn-violet">Back to Campaigns</Link>
      </div>
    );
  }

  const recentMetrics = metrics.slice(-7);
  const totalImpressions = recentMetrics.reduce((sum, m) => sum + m.impressions, 0);
  const totalClicks = recentMetrics.reduce((sum, m) => sum + m.clicks, 0);
  const totalLeads = recentMetrics.reduce((sum, m) => sum + m.leads, 0);
  const totalSpend = recentMetrics.reduce((sum, m) => sum + m.spend, 0);

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "leads" as const, label: `Leads (${leads.length})` },
    { id: "settings" as const, label: "Settings" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/dashboard/campaigns" className="text-sm text-slate-secondary hover:text-violet transition-colors mb-2 inline-flex items-center gap-1">
            ← Back to Campaigns
          </Link>
          <h1 className="text-2xl font-bold text-surface-text font-manrope mt-2">{campaign.name}</h1>
          <p className="text-slate-secondary mt-1">{campaign.geo} · {packageLabels[campaign.packageId] || campaign.packageId}</p>
        </div>
        <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium border ${statusStyles[campaign.status]}`}>
          {campaign.status}
        </span>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-violet text-violet"
                  : "border-transparent text-slate-secondary hover:text-surface-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Impressions", value: totalImpressions.toLocaleString() },
              { label: "Clicks", value: totalClicks.toLocaleString() },
              { label: "Leads", value: totalLeads.toString() },
              { label: "Spend", value: `$${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
                <p className="text-xs text-slate-secondary mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-surface-text font-manrope">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-surface-text font-manrope mb-4">Campaign Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-secondary">Package:</span> <span className="font-medium text-surface-text ml-2">{packageLabels[campaign.packageId]}</span></div>
              <div><span className="text-slate-secondary">Geo:</span> <span className="font-medium text-surface-text ml-2">{campaign.geo}</span></div>
              <div><span className="text-slate-secondary">Start Date:</span> <span className="font-medium text-surface-text ml-2">{new Date(campaign.startDate).toLocaleDateString()}</span></div>
              <div><span className="text-slate-secondary">Ad Spend:</span> <span className="font-medium text-surface-text ml-2 font-mono-price">${campaign.adSpend.toLocaleString()}/mo</span></div>
              <div className="col-span-2"><span className="text-slate-secondary">Keywords:</span> <span className="font-medium text-surface-text ml-2">{campaign.keywords.join(", ")}</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "leads" && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {leads.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-secondary">No leads captured for this campaign yet.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-5 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-5 py-3">Email</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-5 py-3">Source</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-medium text-surface-text">{lead.name}</td>
                    <td className="px-5 py-3 text-sm text-slate-secondary">{lead.email}</td>
                    <td className="px-5 py-3 text-sm text-slate-secondary">{lead.source}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === "new" ? "bg-blue-50 text-blue-600" :
                        lead.status === "contacted" ? "bg-amber-50 text-amber-600" :
                        lead.status === "qualified" ? "bg-green-50 text-green-600" :
                        "bg-gray-50 text-gray-600"
                      }`}>{lead.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-surface-text font-manrope">Campaign Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Campaign Name</label>
              <input type="text" defaultValue={campaign.name} className="input-warm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Geographic Area</label>
              <input type="text" defaultValue={campaign.geo} className="input-warm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Status</label>
              <select defaultValue={campaign.status} className="input-warm">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button className="btn-violet">Save Changes</button>
              <button className="btn-outline text-red-500 border-red-300 hover:bg-red-500 hover:text-white">Pause Campaign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
