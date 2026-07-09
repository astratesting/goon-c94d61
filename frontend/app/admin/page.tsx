import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-surface-text font-manrope">Admin Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: 12 },
          { label: "Active Campaigns", value: 8 },
          { label: "Total Leads", value: 247 },
          { label: "Revenue", value: "$42.5K" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-slate-secondary">{s.label}</p>
            <p className="text-2xl font-bold text-surface-text mt-1 font-manrope">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Link href="/admin/customers" className="btn-violet">Manage Customers</Link>
        <Link href="/admin/campaigns" className="btn-outline">Manage Campaigns</Link>
      </div>
    </div>
  );
}
