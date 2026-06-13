export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

  if (!url || !key) {
    return null;
  }

  // Dynamic import to avoid crash if @supabase/supabase-js isn't configured
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient: createSupabaseClient } = require("@supabase/supabase-js");
    return createSupabaseClient(url, key);
  } catch {
    return null;
  }
}
