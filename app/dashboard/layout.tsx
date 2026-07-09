import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { initializeDB } from "@/lib/db";

await initializeDB();

// Simple session check for demo - in production use auth() from next-auth
async function getSession() {
  // In NextAuth v5 without a DB adapter, session is checked via JWT cookie
  // For this build, we pass through and let middleware handle auth
  return { user: { id: "demo-user", name: "Demo User", email: "demo@demo.app", role: "customer" } };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-warm">
      <Sidebar
        user={{
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
        }}
      />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
