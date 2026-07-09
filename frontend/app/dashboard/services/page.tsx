import ServiceSelector from "@/components/dashboard/ServiceSelector";
import type { Package, ServiceConfig } from "@/types/global";

const PACKAGES: Package[] = [
  { id: "seo", name: "SEO Optimization", description: "Dominate local search.", basePrice: 2000, features: ["Local keywords", "On-page SEO", "GBP management"], color: "#7C3AED" },
  { id: "ppc", name: "PPC Advertising", description: "Google & Meta ads.", basePrice: 3500, features: ["Google Ads", "Facebook ads", "Retargeting"], color: "#F97316", popular: true },
  { id: "social", name: "Social Media", description: "Branded social content.", basePrice: 2500, features: ["Content calendar", "Post scheduling", "Analytics"], color: "#FBBF24" },
  { id: "email", name: "Email Marketing", description: "Automated drip campaigns.", basePrice: 1800, features: ["Drip campaigns", "Nurture sequences", "A/B testing"], color: "#EC4899" },
  { id: "content", name: "Content Creation", description: "Blog posts & market reports.", basePrice: 2200, features: ["Blog posts", "Market reports", "Video scripts"], color: "#10B981" },
];

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-surface-text font-manrope">Services</h1>
      <ServiceSelector packages={PACKAGES} selected={null} onChange={(config: ServiceConfig) => {}} />
    </div>
  );
}
