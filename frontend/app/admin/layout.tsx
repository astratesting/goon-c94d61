import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-warm">
      <aside className="w-64 bg-white border-r border-gray-200 flex-col h-screen fixed left-0 top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg prism-gradient flex items-center justify-center"><span className="text-white font-bold text-sm font-manrope">G</span></div>
            <span className="text-lg font-bold font-manrope text-surface-text">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[{ name: "Dashboard", href: "/admin" }, { name: "Customers", href: "/admin/customers" }, { name: "Campaigns", href: "/admin/campaigns" }].map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-secondary hover:text-surface-text hover:bg-gray-50">
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 lg:ml-64"><div className="p-4 lg:p-8 max-w-7xl mx-auto">{children}</div></main>
    </div>
  );
}
