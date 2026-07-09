"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { MarketingForm } from "@/types/global";

export default function FormsPage() {
  const [forms, setForms] = useState<MarketingForm[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [newForm, setNewForm] = useState({ name: "", fields: [] as MarketingForm["fields"] });
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState<string>("text");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data for demo
    const mockForms: MarketingForm[] = [
      {
        id: "1", userId: "", name: "Home Buyer Lead Form",
        fields: [
          { id: "f1", type: "text", label: "Full Name", required: true },
          { id: "f2", type: "email", label: "Email", required: true },
          { id: "f3", type: "phone", label: "Phone", required: false },
          { id: "f4", type: "select", label: "Budget Range", required: true, options: ["$200K-$400K", "$400K-$600K", "$600K-$1M", "$1M+"] },
        ],
        submitUrl: "/api/contact", createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
      },
      {
        id: "2", userId: "", name: "Free Market Report",
        fields: [
          { id: "f5", type: "text", label: "Name", required: true },
          { id: "f6", type: "email", label: "Email", required: true },
          { id: "f7", type: "text", label: "Zip Code", required: true },
        ],
        submitUrl: "/api/contact", createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
      },
    ];
    setTimeout(() => { setForms(mockForms); setLoading(false); }, 300);
  }, []);

  const addField = () => {
    if (!fieldLabel.trim()) return;
    const field = {
      id: Math.random().toString(36).slice(2),
      type: fieldType as "text" | "email" | "phone" | "textarea" | "select" | "number",
      label: fieldLabel,
      required: false,
    };
    setNewForm({ ...newForm, fields: [...newForm.fields, field] });
    setFieldLabel("");
  };

  const removeField = (id: string) => {
    setNewForm({ ...newForm, fields: newForm.fields.filter((f) => f.id !== id) });
  };

  const saveForm = () => {
    if (!newForm.name || newForm.fields.length === 0) return;
    const form: MarketingForm = {
      id: Math.random().toString(36).slice(2),
      userId: "",
      name: newForm.name,
      fields: newForm.fields,
      submitUrl: "/api/forms/submit",
      createdAt: new Date().toISOString(),
    };
    setForms([...forms, form]);
    setNewForm({ name: "", fields: [] });
    setShowBuilder(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-text font-manrope">Lead Capture Forms</h1>
          <p className="text-slate-secondary mt-1">Build and manage forms to capture leads</p>
        </div>
        <button onClick={() => setShowBuilder(!showBuilder)} className="btn-violet">
          {showBuilder ? "Cancel" : "+ New Form"}
        </button>
      </div>

      {showBuilder && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-surface-text font-manrope">Form Builder</h3>
          <div>
            <label className="block text-sm font-medium text-surface-text mb-1.5">Form Name</label>
            <input
              type="text"
              value={newForm.name}
              onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
              placeholder="e.g. Home Buyer Lead Form"
              className="input-warm"
            />
          </div>

          <div className="border border-dashed border-gray-300 rounded-xl p-4">
            <p className="text-sm font-medium text-surface-text mb-3">Add Field</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                placeholder="Field label"
                className="input-warm flex-1"
                onKeyDown={(e) => e.key === "Enter" && addField()}
              />
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="input-warm w-36"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="textarea">Textarea</option>
                <option value="select">Select</option>
                <option value="number">Number</option>
              </select>
              <button onClick={addField} className="btn-violet text-sm">Add</button>
            </div>
          </div>

          {newForm.fields.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-surface-text">Fields ({newForm.fields.length})</p>
              {newForm.fields.map((field, i) => (
                <div key={field.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs font-mono text-slate-secondary">{i + 1}</span>
                  <span className="text-sm text-surface-text flex-1">{field.label}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full text-slate-secondary">{field.type}</span>
                  <button onClick={() => removeField(field.id)} className="text-gray-400 hover:text-red-500">×</button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={saveForm}
            disabled={!newForm.name || newForm.fields.length === 0}
            className="btn-violet"
          >
            Save Form
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : forms.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-slate-secondary mb-4">No forms yet. Create your first lead capture form!</p>
          <button onClick={() => setShowBuilder(true)} className="btn-violet">Create Form</button>
        </div>
      ) : (
        <div className="space-y-3">
          {forms.map((form) => (
            <Link
              key={form.id}
              href={`/dashboard/forms/${form.id}`}
              className="block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-honey bg-opacity-10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-surface-text group-hover:text-violet transition-colors font-manrope">{form.name}</h3>
                    <p className="text-sm text-slate-secondary">{form.fields.length} fields · Created {new Date(form.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-violet transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
