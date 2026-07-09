"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

interface FormData {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: string;
}

interface Submission {
  id: string;
  data: Record<string, string>;
  createdAt: string;
}

export default function FormDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [form, setForm] = useState<FormData | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demo
    const mockForm: FormData = {
      id,
      name: id === "1" ? "Home Buyer Lead Form" : "Free Market Report",
      fields: id === "1" ? [
        { id: "f1", type: "text", label: "Full Name", required: true },
        { id: "f2", type: "email", label: "Email", required: true },
        { id: "f3", type: "phone", label: "Phone", required: false },
        { id: "f4", type: "select", label: "Budget Range", required: true, options: ["$200K-$400K", "$400K-$600K", "$600K-$1M", "$1M+"] },
      ] : [
        { id: "f5", type: "text", label: "Name", required: true },
        { id: "f6", type: "email", label: "Email", required: true },
        { id: "f7", type: "text", label: "Zip Code", required: true },
      ],
      createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    };

    const mockSubmissions: Submission[] = [
      { id: "s1", data: id === "1" ? { "Full Name": "Alex Thompson", Email: "alex@buyers.com", Phone: "480-555-1234", "Budget Range": "$400K-$600K" } : { Name: "Brian Lee", Email: "brian.lee@yahoo.com", "Zip Code": "85001" }, createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
      { id: "s2", data: id === "1" ? { "Full Name": "Karen White", Email: "karen.w@gmail.com", "Budget Range": "$600K-$1M" } : { Name: "Sarah Kim", Email: "sarah.k@gmail.com", "Zip Code": "85201" }, createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
    ];

    setTimeout(() => { setForm(mockForm); setSubmissions(mockSubmissions); setLoading(false); }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-48 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-surface-text font-manrope mb-4">Form not found</h2>
        <Link href="/dashboard/forms" className="btn-violet">Back to Forms</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/forms" className="text-sm text-slate-secondary hover:text-violet transition-colors mb-2 inline-flex items-center gap-1">
          ← Back to Forms
        </Link>
        <h1 className="text-2xl font-bold text-surface-text font-manrope mt-2">{form.name}</h1>
        <p className="text-slate-secondary mt-1">{form.fields.length} fields · {submissions.length} submissions</p>
      </div>

      {/* Form Preview */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-surface-text font-manrope mb-4">Form Preview</h3>
        <div className="space-y-4 max-w-md">
          {form.fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-surface-text mb-1.5">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              {field.type === "select" ? (
                <select className="input-warm" disabled>
                  <option>Select {field.label.toLowerCase()}...</option>
                  {field.options?.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              ) : field.type === "textarea" ? (
                <textarea className="input-warm" disabled placeholder={`Enter ${field.label.toLowerCase()}...`} rows={3} />
              ) : (
                <input
                  type={field.type === "phone" ? "tel" : field.type}
                  className="input-warm"
                  disabled
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))}
          <button className="btn-violet" disabled>Submit</button>
        </div>
      </div>

      {/* Submissions */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-surface-text font-manrope">Submissions ({submissions.length})</h3>
        </div>
        {submissions.length === 0 ? (
          <div className="p-8 text-center text-slate-secondary">No submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {form.fields.map((field) => (
                    <th key={field.id} className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-5 py-3">
                      {field.label}
                    </th>
                  ))}
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                    {form.fields.map((field) => (
                      <td key={field.id} className="px-5 py-3 text-sm text-surface-text">
                        {sub.data[field.label] || "—"}
                      </td>
                    ))}
                    <td className="px-5 py-3 text-sm text-slate-secondary">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Embed Code */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-surface-text font-manrope mb-3">Embed Code</h3>
        <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-slate-secondary overflow-x-auto">
          &lt;iframe src=&quot;{process.env.NEXT_PUBLIC_APP_URL || "https://goon.app"}/forms/{form.id}&quot; width=&quot;100%&quot; height=&quot;600&quot; frameBorder=&quot;0&quot;&gt;&lt;/iframe&gt;
        </div>
      </div>
    </div>
  );
}
