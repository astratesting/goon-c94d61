"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold font-display">
            <span className="text-white">G</span>
            <span className="text-cobalt">oo</span>
            <span className="text-white">n</span>
          </Link>
          <h1 className="text-xl font-semibold text-white mt-4">
            Sign in to your account
          </h1>
        </div>

        <div className="bg-navy-100 border border-slate-800 rounded-xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm text-slate-400 block mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-navy border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm text-slate-400 block mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-navy border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent text-sm"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="text-sm px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-2.5 bg-cobalt hover:bg-cobalt-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-cobalt hover:text-cobalt-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
