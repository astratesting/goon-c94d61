import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <span className="text-xl font-bold font-display">
          <span className="text-white">G</span>
          <span className="text-cobalt">oo</span>
          <span className="text-white">n</span>
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-cobalt hover:bg-cobalt-600 text-white rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-8 pt-32 pb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-display text-white leading-tight">
          Autonomous AI
          <br />
          <span className="text-cobalt">Trading Agents</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Deploy intelligent trading strategies that monitor markets 24/7.
          Built for retail investors who want institutional-grade automation.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-3 text-sm font-medium bg-cobalt hover:bg-cobalt-600 text-white rounded-lg transition-colors"
          >
            Start Trading
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 text-sm font-medium border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "AI-Powered Strategies",
            desc: "Trend following, mean reversion, and sentiment analysis running autonomously.",
          },
          {
            title: "Real-Time Monitoring",
            desc: "24/7 market surveillance with instant trade execution on signal triggers.",
          },
          {
            title: "Risk Management",
            desc: "Built-in stop losses, position sizing, and portfolio-level risk controls.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-navy-100 border border-slate-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="text-sm text-slate-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
