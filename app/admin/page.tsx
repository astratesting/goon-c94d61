"use client";

import { useState } from "react";

export default function AdminPage() {
  const [stats] = useState({
    totalUsers: 12,
    activeCampaigns: 8,
    totalLeads: 247,
    revenue: 42500,
  });

  const recentUsers = [
    { id: "1", name: "Demo User", email: "demo@demo.app", role: "customer", createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
    { id: "2", name: "Admin User", email: "admin@goon.app", role: "admin", createdAt: new Date(Date.now() - 45 * 86400000).toISOString() },
    { id: "3", name: "Sarah Chen", email: "sarah@brokerage.com", role: "customer", createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
    { id: "4", name: "Mike Johnson", email: "mike@realty.com", role: "customer", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
  ];

  const recentCampaigns = [
    { id: "1", name: "Phoenix Home Buyers SEO", user: "Demo User", status: "active", createdAt: new Date(Date.now() - 45 * 86400000).toISOString() },
    { id: "2", name: "Scottsdale PPC Campaign", user: "Demo User", status: "active", createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
    { id: "3", name: "CA Coastal Social Media", user: "Sarah Chen", status: "active", createdAt: new Date(Date.now() - 20 * 86400000).toISOString() },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-surface-text font-manrope">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.totalUsers, color: "text-violet" },
          { label: "Active Campaigns", value: stats.activeCampaigns, color: "text-coral" },
          { label: "Total Leads", value: stats.totalLeads, color: "text-amber-600" },
          { label: "Revenue (MTD)", value: `$${stats.revenue.toLocaleString()}`, color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-slate-secondary">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 font-manrope ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-surface-text font-manrope">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">User</th>
                <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Role</th>
                <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Joined</th>
                <th className="text-right text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                        <span className="text-violet text-xs font-semibold">{user.name.split(" ").map((n) => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-text">{user.name}</p>
                        <p className="text-xs text-slate-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-violet-50 text-violet" : "bg-gray-50 text-gray-600"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-secondary">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-violet font-medium hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-surface-text font-manrope">Recent Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Campaign</th>
                <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">User</th>
                <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-surface-text">{campaign.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-secondary">{campaign.user}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-secondary">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
