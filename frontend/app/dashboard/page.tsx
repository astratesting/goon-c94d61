import StatsCard from "@/components/dashboard/StatsCard";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-surface-text font-manrope">Welcome back 👋</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Campaigns" value={4} change="2 new" changeType="up" icon="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" color="violet" />
        <StatsCard title="Total Leads" value={247} change="+32 this week" changeType="up" icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" color="coral" />
        <StatsCard title="Impressions" value="45.2K" change="+12% from last month" changeType="up" icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z" color="honey" />
        <StatsCard title="Revenue" value="$8,400" change="MTD" changeType="neutral" icon="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" color="green" />
      </div>
      <div className="flex gap-3">
        <Link href="/dashboard/campaigns" className="btn-violet">View Campaigns</Link>
        <Link href="/dashboard/book" className="btn-outline">Book a Demo</Link>
      </div>
    </div>
  );
}
