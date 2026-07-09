"use client";

import { useState } from "react";
import type { Package, ServiceConfig } from "@/types/global";

interface ServiceSelectorProps {
  packages: Package[];
  selected: ServiceConfig | null;
  onChange: (config: ServiceConfig) => void;
}

export default function ServiceSelector({ packages, selected, onChange }: ServiceSelectorProps) {
  const [step, setStep] = useState<"select" | "configure" | "review">("select");
  const [config, setConfig] = useState<ServiceConfig>(
    selected || {
      packageId: "",
      geo: "",
      keywords: [],
      adBudget: 1000,
      cadence: "weekly",
      additionalOptions: {},
    }
  );
  const [keywordInput, setKeywordInput] = useState("");

  const selectedPkg = packages.find((p) => p.id === config.packageId);

  const updateConfig = (updates: Partial<ServiceConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onChange(newConfig);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !config.keywords.includes(keywordInput.trim())) {
      updateConfig({ keywords: [...config.keywords, keywordInput.trim()] });
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw: string) => {
    updateConfig({ keywords: config.keywords.filter((k) => k !== kw) });
  };

  const calculatePrice = () => {
    if (!selectedPkg) return 0;
    const cadenceMultiplier: Record<string, number> = { daily: 1.3, weekly: 1.1, "bi-weekly": 1.0, monthly: 0.85 };
    const base = selectedPkg.basePrice;
    const perfFee = config.adBudget * 0.1;
    return Math.round(base * (cadenceMultiplier[config.cadence] || 1) + perfFee);
  };

  if (step === "select") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-surface-text font-manrope">Select a Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => {
                updateConfig({ packageId: pkg.id });
                setStep("configure");
              }}
              className={`text-left bg-white rounded-2xl border-2 p-6 transition-all duration-200 hover:shadow-md ${
                config.packageId === pkg.id
                  ? "border-violet shadow-lg shadow-violet/10"
                  : "border-gray-200 hover:border-violet/30"
              } ${pkg.popular ? "ring-2 ring-coral ring-offset-2" : ""}`}
            >
              {pkg.popular && (
                <span className="inline-block px-2 py-0.5 bg-coral text-white text-xs font-semibold rounded-full mb-3">
                  Most Popular
                </span>
              )}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: pkg.color + "15" }}>
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: pkg.color }} />
              </div>
              <h3 className="text-lg font-semibold text-surface-text font-manrope">{pkg.name}</h3>
              <p className="text-sm text-slate-secondary mt-1 line-clamp-2">{pkg.description}</p>
              <p className="text-2xl font-bold mt-4 font-mono-price" style={{ color: pkg.color }}>
                ${pkg.basePrice.toLocaleString()}<span className="text-sm font-normal text-slate-secondary">/mo</span>
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "configure") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep("select")} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-slate-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-2xl font-bold text-surface-text font-manrope">
            Configure {selectedPkg?.name}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-surface-text mb-2">Geographic Area</label>
            <input
              type="text"
              value={config.geo}
              onChange={(e) => updateConfig({ geo: e.target.value })}
              placeholder="e.g. Phoenix, AZ"
              className="input-warm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-text mb-2">Keywords</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                placeholder="Add a keyword..."
                className="input-warm flex-1"
              />
              <button onClick={addKeyword} className="btn-violet text-sm">Add</button>
            </div>
            {config.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {config.keywords.map((kw) => (
                  <span key={kw} className="inline-flex items-center gap-1 px-3 py-1 bg-violet-50 text-violet text-sm rounded-full border border-violet-100">
                    {kw}
                    <button onClick={() => removeKeyword(kw)} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {config.packageId === "ppc" && (
            <div>
              <label className="block text-sm font-medium text-surface-text mb-2">Monthly Ad Budget</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={100}
                  value={config.adBudget}
                  onChange={(e) => updateConfig({ adBudget: Number(e.target.value) })}
                  className="flex-1 accent-violet"
                />
                <span className="text-lg font-bold text-surface-text font-mono-price w-24 text-right">
                  ${config.adBudget.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-surface-text mb-2">Campaign Cadence</label>
            <div className="grid grid-cols-4 gap-2">
              {(["daily", "weekly", "bi-weekly", "monthly"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => updateConfig({ cadence: c })}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    config.cadence === c
                      ? "border-violet bg-violet-50 text-violet"
                      : "border-gray-200 text-slate-secondary hover:border-violet/30"
                  }`}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => setStep("review")} className="btn-violet w-full py-3" disabled={!config.geo}>
          Review & Subscribe →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep("configure")} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <svg className="w-5 h-5 text-slate-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-surface-text font-manrope">Review Your Package</h2>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-surface-text mb-4 font-manrope">{selectedPkg?.name}</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-slate-secondary">Geographic Area</span><span className="font-medium text-surface-text">{config.geo || "Not set"}</span></div>
          <div className="flex justify-between"><span className="text-slate-secondary">Keywords</span><span className="font-medium text-surface-text">{config.keywords.length} keywords</span></div>
          <div className="flex justify-between"><span className="text-slate-secondary">Cadence</span><span className="font-medium text-surface-text capitalize">{config.cadence}</span></div>
          {config.packageId === "ppc" && (
            <div className="flex justify-between"><span className="text-slate-secondary">Ad Budget</span><span className="font-medium text-surface-text font-mono-price">${config.adBudget.toLocaleString()}/mo</span></div>
          )}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-surface-text">Monthly Total</span>
            <span className="text-2xl font-bold text-violet font-mono-price">${calculatePrice().toLocaleString()}/mo</span>
          </div>
        </div>
      </div>

      <button className="btn-violet w-full py-3" onClick={() => {}}>
        Subscribe & Get Started →
      </button>
    </div>
  );
}
