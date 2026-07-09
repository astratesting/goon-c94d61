"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps { user: { name: string; email: string; role: string }; }

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" },
  { name: "Services", href: "/dashboard/services", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35" },
  { name: "Book Demo", href: "/dashboard/booking", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg prism-gradient flex items-center justify-center"><span className="text-white font-bold text-sm font-manrope">G</span></div>
          <span className="text-lg font-bold font-manrope text-surface-text">Goon</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname === item.href ? "bg-violet-50 text-violet border border-violet-100" : "text-slate-secondary hover:text-surface-text hover:bg-gray-50 border border-transparent"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center"><span className="text-violet font-semibold text-sm">{user.name.split(" ").map((n) => n[0]).join("")}</span></div>
          <div className="flex-1 min-w-0"><p className="text-sm font-medium text-surface-text truncate">{user.name}</p><p className="text-xs text-slate-secondary truncate">{user.email}</p></div>
        </div>
        <button onClick={async () => { await signOut({ redirect: false }); router.push("/"); router.refresh(); }} className="w-full px-3 py-2 text-sm text-slate-secondary hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left">Sign Out</button>
      </div>
    </aside>
  );
}
