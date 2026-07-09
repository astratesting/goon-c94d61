import { initializeDB, getCampaigns, getLeads, getSubscriptions, getCampaignMetrics } from "@/lib/db";
import StatsCard from "@/components/dashboard/StatsCard";
import CampaignCard from "@/components/dashboard/CampaignCard";
import Link from "next/link";

await initializeDB();

export default async function DashboardPage() {
  const campaigns = getCampaigns();
  const leads = getLeads();
  const subscriptions = getSubscriptions();

  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const newLeads = leads.filter((l) => l.status === "new");

  let totalImpressions = 0;
  let totalClicks = 0;
  activeCampaigns.forEach((c) => {
    const metrics = getCampaignMetrics(c.id);
    metrics.forEach((m) => {
      totalImpressions += m.impressions;
      totalClicks += m.clicks;
    });
  });

  const recentCampaigns = [...campaigns]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-surface-text font-manrope">
          Welcome back 👋
        </h1>
        <p className="text-slate-secondary mt-1">
          Here&apos;s what&apos;s happening with your marketing today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Campaigns" value={activeCampaigns.length} change={`${campaigns.length} total`} changeType="neutral" icon="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" color="violet" />
        <StatsCard title="Total Leads" value={leads.length} change={`${newLeads.length} new this week`} changeType="up" icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" color="coral" />
        <StatsCard title="Impressions" value={totalImpressions.toLocaleString()} change={`${totalClicks.toLocaleString()} clicks`} changeType="up" icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z" color="honey" />
        <StatsCard title="Subscriptions" value={subscriptions.filter((s) => s.status === "active").length} change="Active plans" changeType="neutral" icon="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" color="green" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-surface-text font-manrope mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/dashboard/configure" className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-violet/30 hover:bg-violet-50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center"><svg className="w-5 h-5 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
            <div><p className="text-sm font-medium text-surface-text">New Campaign</p><p className="text-xs text-slate-secondary">Configure & launch</p></div>
          </Link>
          <Link href="/dashboard/book" className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-coral/30 hover:bg-coral-100 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-coral-100 flex items-center justify-center"><svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
            <div><p className="text-sm font-medium text-surface-text">Book a Demo</p><p className="text-xs text-slate-secondary">Schedule a call</p></div>
          </Link>
          <Link href="/dashboard/forms" className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-honey/30 hover:bg-amber-50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"><svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
            <div><p className="text-sm font-medium text-surface-text">Create Form</p><p className="text-xs text-slate-secondary">Capture leads</p></div>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-text font-manrope">Recent Campaigns</h2>
          <Link href="/dashboard/campaigns" className="text-sm text-violet font-medium hover:underline">View all →</Link>
        </div>
        {recentCampaigns.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <p className="text-slate-secondary mb-4">No campaigns yet. Start your first one!</p>
            <Link href="/dashboard/configure" className="btn-violet">Configure Campaign</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCampaigns.map((campaign) => (<CampaignCard key={campaign.id} campaign={campaign} />))}
          </div>
        )}
      </div>
    </div>
  );
}
