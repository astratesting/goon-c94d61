"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-warm">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col h-screen fixed left-0 top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg prism-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm font-manrope">G</span>
            </div>
            <span className="text-lg font-bold font-manrope text-surface-text">Goon</span>
            <span className="text-xs px-2 py-0.5 bg-coral text-white rounded-full font-medium">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-secondary uppercase tracking-wider mb-2">Admin</p>
          {[
            { name: "Dashboard", href: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
            { name: "Customers", href: "/admin/customers", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
            { name: "Campaigns", href: "/admin/campaigns", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "bg-coral-100 text-coral border border-orange-200"
                  : "text-slate-secondary hover:text-surface-text hover:bg-gray-50 border border-transparent"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {item.name}
            </Link>
          ))}
          <div className="my-4 border-t border-gray-200" />
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-secondary hover:text-surface-text hover:bg-gray-50 border border-transparent">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Customer View
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button onClick={handleSignOut} className="w-full px-3 py-2 text-sm text-slate-secondary hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg prism-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm font-manrope">G</span>
          </div>
          <span className="text-lg font-bold font-manrope text-surface-text">Admin</span>
        </Link>
      </div>

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
