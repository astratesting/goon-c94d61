"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceSelector from "@/components/dashboard/ServiceSelector";
import type { Package, ServiceConfig } from "@/types/global";

const PACKAGES: Package[] = [
  { id: "seo", name: "SEO Optimization", description: "Hyper-local search engine optimization to dominate Google rankings for real estate searches in your market.", basePrice: 2000, features: ["Local keyword strategy", "On-page optimization", "Google Business Profile management", "Monthly ranking reports", "Backlink building"], color: "#7C3AED" },
  { id: "ppc", name: "PPC Advertising", description: "Data-driven Google & Meta ad campaigns targeting home buyers and sellers in your exact geo.", basePrice: 3500, features: ["Google Ads management", "Facebook/Instagram ads", "Retargeting campaigns", "Landing page optimization", "Weekly performance reports"], color: "#F97316", popular: true },
  { id: "social", name: "Social Media Management", description: "Consistent, branded social content across all platforms to build authority and generate inbound leads.", basePrice: 2500, features: ["Content calendar creation", "Post scheduling & publishing", "Engagement management", "Instagram Reels & TikTok", "Monthly analytics report"], color: "#FBBF24" },
  { id: "email", name: "Email Marketing", description: "Automated drip campaigns, newsletters, and nurture sequences that convert leads into closings.", basePrice: 1800, features: ["Drip campaign setup", "Lead nurture sequences", "Newsletter templates", "List segmentation", "A/B testing"], color: "#EC4899" },
  { id: "content", name: "Content Creation", description: "Professional blog posts, video scripts, market reports, and property descriptions that attract and convert.", basePrice: 2200, features: ["Blog posts (4/month)", "Market analysis reports", "Property listing copy", "Video scripts", "Social media graphics"], color: "#10B981" },
];

export default function ConfigurePage() {
  const router = useRouter();
  const [config, setConfig] = useState<ServiceConfig | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (!config?.packageId || !config.geo) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        router.push(data.checkoutUrl);
      }
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-text font-manrope">Configure Your Package</h1>
        <p className="text-slate-secondary mt-1">Select and customize your marketing package</p>
      </div>

      <ServiceSelector
        packages={PACKAGES}
        selected={config}
        onChange={setConfig}
      />
    </div>
  );
}
