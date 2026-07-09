"use client";

import Link from "next/link";
import { useState } from "react";
import ContactForm from "@/components/contact/ContactForm";

const packages = [
  {
    id: "seo",
    name: "SEO Optimization",
    price: 2000,
    description: "Dominate local search for real estate in your market.",
    features: ["Local keyword strategy", "On-page optimization", "Google Business Profile", "Monthly ranking reports", "Backlink building"],
    color: "#7C3AED",
  },
  {
    id: "ppc",
    name: "PPC Advertising",
    price: 3500,
    popular: true,
    description: "Data-driven Google & Meta ad campaigns that convert.",
    features: ["Google Ads management", "Facebook/Instagram ads", "Retargeting campaigns", "Landing page optimization", "Weekly performance reports"],
    color: "#F97316",
  },
  {
    id: "social",
    name: "Social Media",
    price: 2500,
    description: "Branded social content that builds authority.",
    features: ["Content calendar", "Post scheduling", "Engagement management", "Instagram Reels & TikTok", "Monthly analytics"],
    color: "#FBBF24",
  },
];

const features = [
  { title: "AI-Powered Campaigns", desc: "Hyper-local, automated campaigns that target buyers and sellers in your exact market.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Closed-Loop Analytics", desc: "Track every lead from first impression to closed deal. Know exactly what's working.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { title: "All-in-One Platform", desc: "SEO, PPC, social, email, content — managed from one dashboard. No more tool juggling.", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
];

const faqs = [
  { q: "How is Goon different from hiring a marketing agency?", a: "Goon is a platform, not an agency. We give you AI-powered automation, real-time dashboards, and configurable campaigns — at a fraction of agency costs, with full transparency." },
  { q: "What size brokerages do you work with?", a: "We're built for mid-sized brokerages with 20–200 agents and $20M–$100M revenue. Our sweet spot is brokerages in Arizona and California." },
  { q: "Can I try before I commit?", a: "Absolutely. Book a free demo and we'll walk you through the platform with your actual market data. No commitment required." },
  { q: "How long until I see results?", a: "PPC campaigns start generating leads within days. SEO typically shows significant ranking improvements within 60–90 days. Social and email build momentum over 30–60 days." },
];

export default function LandingPage() {
  const [showContact, setShowContact] = useState(false);

  const handleDemoLogin = async () => {
    window.location.href = "/auth/signin";
  };

  return (
    <div className="min-h-screen bg-warm">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl prism-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm font-manrope">G</span>
          </div>
          <span className="text-xl font-bold font-manrope text-surface-text">Goon</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/auth/signin" className="text-sm text-slate-secondary hover:text-surface-text transition-colors font-medium hidden sm:block">
            Sign In
          </Link>
          <button onClick={handleDemoLogin} className="text-sm font-medium text-violet border-2 border-violet px-4 py-2 rounded-xl hover:bg-violet hover:text-white transition-all">
            Try Demo
          </button>
          <Link href="/auth/signup" className="btn-violet text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full text-sm text-violet font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
          AI-Powered Marketing for Real Estate
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-manrope text-surface-text leading-tight">
          Automate Your
          <br />
          <span className="bg-gradient-to-r from-violet via-coral to-honey bg-clip-text text-transparent">
            Real Estate Marketing
          </span>
        </h1>
        <p className="mt-6 text-lg text-slate-secondary max-w-2xl mx-auto leading-relaxed">
          AI-driven, hyper-local campaigns that generate leads on autopilot.
          Built for mid-sized brokerages that want institutional-grade automation
          without the enterprise price tag.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <button onClick={handleDemoLogin} className="btn-coral text-base px-10 py-3.5">
            🚀 Try Live Demo
          </button>
          <Link href="/auth/signup" className="btn-violet text-base px-10 py-3.5">
            Start Free Trial
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-secondary">
          No credit card required · Setup in 5 minutes · Cancel anytime
        </p>
      </section>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-surface-text">
              Everything you need to <span className="text-violet">grow</span>
            </h2>
            <p className="text-lg text-slate-secondary mt-4 max-w-xl mx-auto">
              One platform replaces your fragmented marketing tools, manual workflows, and opaque performance reports.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-warm rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-surface-text font-manrope mb-3">{f.title}</h3>
                <p className="text-slate-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-warm">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-surface-text">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-secondary mt-4">
              Choose the package that fits your brokerage. Scale up anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl border-2 p-8 transition-all duration-200 hover:shadow-lg ${
                  pkg.popular ? "border-coral shadow-md relative" : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-coral text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: pkg.color + "15" }}>
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: pkg.color }} />
                </div>
                <h3 className="text-xl font-semibold text-surface-text font-manrope">{pkg.name}</h3>
                <p className="text-sm text-slate-secondary mt-2 mb-4">{pkg.description}</p>
                <p className="text-3xl font-bold font-mono-price" style={{ color: pkg.color }}>
                  ${pkg.price.toLocaleString()}<span className="text-sm font-normal text-slate-secondary">/mo</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-secondary">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pkg.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block mt-8 text-center py-3 rounded-xl font-semibold transition-all ${
                    pkg.popular
                      ? "bg-coral text-white hover:bg-orange-600 hover:shadow-lg"
                      : "border-2 border-violet text-violet hover:bg-violet hover:text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-surface-text">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-warm rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-surface-text font-manrope mb-2">{faq.q}</h3>
                <p className="text-slate-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-warm">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-surface-text">
              Ready to automate your marketing?
            </h2>
            <p className="text-lg text-slate-secondary mt-4">
              Book a free demo or send us a message. We&apos;ll show you how Goon can transform your brokerage.
            </p>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/auth/signup" className="btn-violet">
              Start Free Trial
            </Link>
            <button onClick={() => setShowContact(!showContact)} className="btn-outline">
              Contact Sales
            </button>
          </div>
          {showContact && <ContactForm />}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-text py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg prism-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm font-manrope">G</span>
              </div>
              <span className="text-lg font-bold font-manrope text-white">Goon</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/auth/signin" className="hover:text-white transition-colors">Sign In</Link>
              <Link href="/auth/signup" className="hover:text-white transition-colors">Get Started</Link>
              <button onClick={() => setShowContact(true)} className="hover:text-white transition-colors">Contact</button>
            </div>
            <p className="text-sm text-slate-500">© 2025 Goon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
