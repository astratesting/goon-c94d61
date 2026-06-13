export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";

const recentActivity = [
  { id: 1, action: "Buy", asset: "AAPL", amount: "10 shares", price: "$189.84", time: "2 min ago", status: "Completed" },
  { id: 2, action: "Sell", asset: "TSLA", amount: "5 shares", price: "$248.50", time: "15 min ago", status: "Completed" },
  { id: 3, action: "Buy", asset: "NVDA", amount: "8 shares", price: "$875.28", time: "1 hr ago", status: "Completed" },
  { id: 4, action: "Buy", asset: "MSFT", amount: "12 shares", price: "$415.60", time: "2 hr ago", status: "Pending" },
  { id: 5, action: "Sell", asset: "AMZN", amount: "3 shares", price: "$185.90", time: "3 hr ago", status: "Completed" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email ?? "user@example.com";

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-navy-100 border border-slate-800 rounded-xl p-6">
        <h1 className="text-2xl font-bold font-display text-white">
          Welcome back
        </h1>
        <p className="text-slate-400 mt-1">{email}</p>
        <p className="text-sm text-slate-500 mt-2">
          Your AI trading agents are active and monitoring markets.
        </p>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-navy-100 border border-slate-800 rounded-xl p-5">
          <p className="text-sm text-slate-400">Total Value</p>
          <p className="text-3xl font-bold text-white mt-1">$124,582.40</p>
          <p className="text-sm text-accent mt-2">+12.4% all time</p>
        </div>
        <div className="bg-navy-100 border border-slate-800 rounded-xl p-5">
          <p className="text-sm text-slate-400">Today&apos;s Change</p>
          <p className="text-3xl font-bold text-accent mt-1">+$1,247.30</p>
          <p className="text-sm text-accent mt-2">+1.01% today</p>
        </div>
        <div className="bg-navy-100 border border-slate-800 rounded-xl p-5">
          <p className="text-sm text-slate-400">Active Strategies</p>
          <p className="text-3xl font-bold text-white mt-1">3</p>
          <p className="text-sm text-cobalt mt-2">All running</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-navy-100 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Action</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Asset</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Price</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Time</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={item.id} className="border-b border-slate-800/50 last:border-0 hover:bg-navy-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.action === "Buy"
                        ? "bg-accent/10 text-accent"
                        : "bg-red-500/10 text-red-400"
                    }`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-white font-medium">{item.asset}</td>
                  <td className="px-5 py-3 text-sm text-slate-300">{item.amount}</td>
                  <td className="px-5 py-3 text-sm text-slate-300">{item.price}</td>
                  <td className="px-5 py-3 text-sm text-slate-400">{item.time}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-accent/10 text-accent"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {item.status}
                    </span>
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
