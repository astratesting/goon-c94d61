import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function auth(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Fallback: read session from a simple cookie for dev without Supabase
    const sessionCookie = cookieStore.get("goon_session");
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie.value);
        if (session.userId) return { userId: session.userId };
      } catch {
        // invalid cookie
      }
    }
    return null;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // read-only in auth context
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return { userId: user.id };
}
