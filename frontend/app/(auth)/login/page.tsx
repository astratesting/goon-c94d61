"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: "demo@demo.app",
      password: "demo123",
    });

    if (result?.error) {
      setError("Demo login failed");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-warm flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl prism-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg font-manrope">G</span>
            </div>
            <span className="text-2xl font-bold font-manrope text-surface-text">Goon</span>
          </Link>
          <h1 className="text-xl font-semibold text-surface-text mt-6 font-manrope">Welcome back</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-warm" placeholder="you@brokerage.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-warm" placeholder="••••••••" />
            </div>
            {error && <div className="text-sm px-4 py-2.5 rounded-xl bg-red-50 text-red-500 border border-red-100">{error}</div>}
            <button type="submit" disabled={loading} className="btn-violet w-full py-3">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-white px-3 text-slate-secondary">or</span></div>
          </div>

          <button onClick={handleDemoLogin} disabled={loading} className="btn-coral w-full py-3">
            🚀 Try Live Demo
          </button>
        </div>

        <p className="text-center text-sm text-slate-secondary mt-6">
          Don&apos;t have an account? <Link href="/auth/signup" className="text-violet font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
