import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Middleware handles auth check, this layout just renders the sidebar
  return (
    <div className="flex min-h-screen bg-warm">
      <Sidebar user={{ name: "Demo User", email: "demo@demo.app", role: "customer" }} />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
