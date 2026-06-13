"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function SettingsClient() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? "");
        setNewEmail(user.email ?? "");
        setCreatedAt(
          new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({
        type: "success",
        text: "Confirmation email sent. Please check your inbox to verify the change.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account preferences</p>
      </div>

      {/* Profile Info */}
      <div className="bg-navy-100 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 block mb-1">Email</label>
            <p className="text-white">{email || "Loading..."}</p>
          </div>
          <div>
            <label className="text-sm text-slate-400 block mb-1">
              Member Since
            </label>
            <p className="text-white">{createdAt || "Loading..."}</p>
          </div>
          <div>
            <label className="text-sm text-slate-400 block mb-1">Plan</label>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-cobalt/10 text-cobalt border border-cobalt/20">
              Pro Trader
            </span>
          </div>
        </div>
      </div>

      {/* Change Email Form */}
      <div className="bg-navy-100 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Change Email
        </h2>
        <form onSubmit={handleEmailChange} className="space-y-4">
          <div>
            <label
              htmlFor="new-email"
              className="text-sm text-slate-400 block mb-2"
            >
              New Email Address
            </label>
            <input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-navy border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent text-sm"
              placeholder="new@email.com"
            />
          </div>
          {message && (
            <div
              className={`text-sm px-4 py-2.5 rounded-lg ${
                message.type === "success"
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message.text}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || newEmail === email}
            className="px-5 py-2.5 bg-cobalt hover:bg-cobalt-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? "Sending..." : "Update Email"}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-navy-100 border border-red-500/20 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-400 mb-2">
          Danger Zone
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <button className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg border border-red-500/20 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
