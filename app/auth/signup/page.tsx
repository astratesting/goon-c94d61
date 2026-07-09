"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Auto sign in
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        router.push("/auth/signin");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
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
          <h1 className="text-xl font-semibold text-surface-text mt-6 font-manrope">Create your account</h1>
          <p className="text-slate-secondary mt-1">Start automating your real estate marketing</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="input-warm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="input-warm"
                placeholder="john@brokerage.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
                className="input-warm"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-text mb-1.5">Brokerage Name (optional)</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="input-warm"
                placeholder="Your brokerage name"
              />
            </div>
            {error && (
              <div className="text-sm px-4 py-2.5 rounded-xl bg-red-50 text-red-500 border border-red-100">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-violet w-full py-3"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-secondary mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-violet font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
