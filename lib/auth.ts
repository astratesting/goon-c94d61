import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email === "demo@demo.app" && credentials.password === "demo123") {
          return { id: "demo-user", email: "demo@demo.app", name: "Demo User", emailVerified: new Date() };
        }
        if (credentials.email === "admin@goon.app" && credentials.password === "admin123") {
          return { id: "admin-user", email: "admin@goon.app", name: "Admin User", emailVerified: new Date() };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        (token as unknown as Record<string, unknown>).role = user.email === "admin@goon.app" ? "admin" : "customer";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).id = token.id;
        (session.user as unknown as Record<string, unknown>).role = (token as unknown as Record<string, unknown>).role || "customer";
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
