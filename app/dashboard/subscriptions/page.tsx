"use client";

import { useState, useEffect } from "react";

interface SubscriptionData {
  id: string;
  packageId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

const packageLabels: Record<string, string> = {
  seo: "SEO Optimization",
  ppc: "PPC Advertising",
  social: "Social Media Management",
  email: "Email Marketing",
  content: "Content Creation",
};

const packagePrices: Record<string, number> = {
  seo: 2000,
  ppc: 3500,
  social: 2500,
  email: 1800,
  content: 2200,
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockSubs: SubscriptionData[] = [
      {
        id: "sub_001", packageId: "ppc", status: "active",
        currentPeriodStart: new Date(Date.now() - 15 * 86400000).toISOString(),
        currentPeriodEnd: new Date(Date.now() + 15 * 86400000).toISOString(),
        cancelAtPeriodEnd: false,
      },
      {
        id: "sub_002", packageId: "seo", status: "active",
        currentPeriodStart: new Date(Date.now() - 10 * 86400000).toISOString(),
        currentPeriodEnd: new Date(Date.now() + 20 * 86400000).toISOString(),
        cancelAtPeriodEnd: false,
      },
    ];
    setTimeout(() => { setSubscriptions(mockSubs); setLoading(false); }, 300);
  }, []);

  const totalMonthly = subscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + (packagePrices[s.packageId] || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-text font-manrope">Subscriptions</h1>
        <p className="text-slate-secondary mt-1">Manage your active subscriptions and billing</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-violet to-purple-700 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">Total Monthly Investment</p>
        <p className="text-3xl font-bold font-mono-price mt-1">${totalMonthly.toLocaleString()}/mo</p>
        <p className="text-sm opacity-80 mt-2">{subscriptions.filter((s) => s.status === "active").length} active subscription{subscriptions.filter((s) => s.status === "active").length !== 1 ? "s" : ""}</p>
      </div>

      {/* Subscriptions List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-slate-secondary mb-4">No active subscriptions.</p>
          <a href="/dashboard/configure" className="btn-violet">Browse Packages</a>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-surface-text font-manrope">
                    {packageLabels[sub.packageId] || sub.packageId}
                  </h3>
                  <p className="text-sm text-slate-secondary mt-1">
                    ${packagePrices[sub.packageId]?.toLocaleString()}/mo · Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                    sub.status === "active" ? "bg-green-50 text-green-700 border border-green-200" :
                    sub.status === "trialing" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                    "bg-gray-50 text-gray-600 border border-gray-200"
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                <button className="text-sm text-violet font-medium hover:underline">Manage</button>
                <button className="text-sm text-slate-secondary hover:text-red-500 font-medium transition-colors">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice History */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-surface-text font-manrope">Invoice History</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { date: new Date(Date.now() - 30 * 86400000), amount: totalMonthly, package: "Monthly Subscription" },
            { date: new Date(Date.now() - 60 * 86400000), amount: totalMonthly, package: "Monthly Subscription" },
          ].map((inv, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-surface-text">{inv.package}</p>
                <p className="text-xs text-slate-secondary">{inv.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-surface-text font-mono-price">${inv.amount.toLocaleString()}</span>
                <button className="text-xs text-violet font-medium hover:underline">Download PDF</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
