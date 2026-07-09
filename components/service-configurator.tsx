"use client";

interface ServiceConfiguratorProps {
  packages: { id: string; name: string; basePrice: number; color: string; features: string[] }[];
  onSelect: (packageId: string) => void;
}

export default function ServiceConfigurator({ packages, onSelect }: ServiceConfiguratorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <button
          key={pkg.id}
          onClick={() => onSelect(pkg.id)}
          className="text-left bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-violet/30 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: pkg.color + "15" }}>
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: pkg.color }} />
          </div>
          <h3 className="text-lg font-semibold text-surface-text font-manrope group-hover:text-violet transition-colors">
            {pkg.name}
          </h3>
          <p className="text-2xl font-bold mt-2 font-mono-price" style={{ color: pkg.color }}>
            ${pkg.basePrice.toLocaleString()}<span className="text-sm font-normal text-slate-secondary">/mo</span>
          </p>
          <ul className="mt-4 space-y-2">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-secondary">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pkg.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}
