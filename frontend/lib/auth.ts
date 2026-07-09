// Simple auth helper for frontend directory
export async function auth() {
  // In production, this would check the JWT cookie via NextAuth
  // For demo purposes, return a mock session
  return { user: { id: "demo-user", email: "demo@demo.app", name: "Demo User", role: "customer" } };
}
