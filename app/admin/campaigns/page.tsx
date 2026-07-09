"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Campaign {
  id: string;
  name: string;
  userId: string;
  packageId: string;
  status: string;
  geo: string;
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-gray-50 text-gray-600 border-gray-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      { id: "1", name: "Phoenix Home Buyers SEO", userId: "1", packageId: "seo", status: "active", geo: "Phoenix, AZ", createdAt: new Date(Date.now() - 45 * 86400000).toISOString() },
      { id: "2", name: "Scottsdale PPC Campaign", userId: "1", packageId: "ppc", status: "active", geo: "Scottsdale, AZ", createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
      { id: "3", name: "CA Coastal Social Media", userId: "3", packageId: "social", status: "active", geo: "San Diego, CA", createdAt: new Date(Date.now() - 20 * 86400000).toISOString() },
      { id: "4", name: "Tucson Lead Nurture", userId: "1", packageId: "email", status: "active", geo: "Tucson, AZ", createdAt: new Date(Date.now() - 15 * 86400000).toISOString() },
      { id: "5", name: "Mesa Content Strategy", userId: "1", packageId: "content", status: "draft", geo: "Mesa, AZ", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
    ];
    setTimeout(() => { setCampaigns(mockCampaigns); setLoading(false); }, 300);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-text font-manrope">All Campaigns</h1>
        <p className="text-slate-secondary mt-1">Manage all customer campaigns</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-secondary">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Campaign</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Package</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Location</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Created</th>
                  <th className="text-right text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-surface-text">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-secondary capitalize">{campaign.packageId}</td>
                    <td className="px-6 py-4 text-sm text-slate-secondary">{campaign.geo}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyles[campaign.status] || ""}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-secondary">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/campaigns/${campaign.id}`} className="text-sm text-violet font-medium hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
