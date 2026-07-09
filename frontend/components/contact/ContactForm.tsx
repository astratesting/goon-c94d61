"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div className="bg-green-50 rounded-2xl border border-green-200 p-8 text-center">
      <h3 className="text-lg font-semibold text-surface-text font-manrope mb-2">Message Sent! ✓</h3>
      <p className="text-sm text-slate-secondary">We&apos;ll get back to you within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-warm" />
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="input-warm" />
      </div>
      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className="input-warm" />
      <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your needs..." className="input-warm resize-none" rows={4} />
      <button type="submit" disabled={status === "loading"} className="btn-violet w-full py-3">{status === "loading" ? "Sending..." : "Send Message"}</button>
    </form>
  );
}
