export const dynamic = "force-dynamic";

const holdings = [
  { id: 1, asset: "AAPL", name: "Apple Inc.", shares: 50, avgPrice: "$178.50", currentPrice: "$189.84", value: "$9,492.00", change: "+6.35%", positive: true },
  { id: 2, asset: "NVDA", name: "NVIDIA Corp.", shares: 25, avgPrice: "$650.00", currentPrice: "$875.28", value: "$21,882.00", change: "+34.66%", positive: true },
  { id: 3, asset: "MSFT", name: "Microsoft Corp.", shares: 40, avgPrice: "$380.20", currentPrice: "$415.60", value: "$16,624.00", change: "+9.31%", positive: true },
  { id: 4, asset: "TSLA", name: "Tesla Inc.", shares: 30, avgPrice: "$260.10", currentPrice: "$248.50", value: "$7,455.00", change: "-4.46%", positive: false },
  { id: 5, asset: "AMZN", name: "Amazon.com Inc.", shares: 60, avgPrice: "$170.30", currentPrice: "$185.90", value: "$11,154.00", change: "+9.16%", positive: true },
  { id: 6, asset: "GOOGL", name: "Alphabet Inc.", shares: 35, avgPrice: "$140.00", currentPrice: "$155.72", value: "$5,450.20", change: "+11.23%", positive: true },
  { id: 7, asset: "META", name: "Meta Platforms", shares: 20, avgPrice: "$480.50", currentPrice: "$510.25", value: "$10,205.00", change: "+6.19%", positive: true },
  { id: 8, asset: "BTC", name: "Bitcoin", shares: 0.5, avgPrice: "$52000", currentPrice: "$67,450.00", value: "$33,725.00", change: "+29.71%", positive: true },
];

export default function PortfolioPage() {
  const totalValue = "$126,087.20";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Portfolio</h1>
          <p className="text-slate-400 mt-1">Your current holdings and performance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Total Portfolio Value</p>
          <p className="text-2xl font-bold text-white">{totalValue}</p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-navy-100 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Asset</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Shares</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Avg Price</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Current</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Value</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Change</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((item) => (
                <tr key={item.id} className="border-b border-slate-800/50 last:border-0 hover:bg-navy-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="text-sm font-semibold text-cobalt">{item.asset}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-300">{item.name}</td>
                  <td className="px-5 py-3 text-sm text-white text-right">{item.shares}</td>
                  <td className="px-5 py-3 text-sm text-slate-300 text-right">{item.avgPrice}</td>
                  <td className="px-5 py-3 text-sm text-white text-right">{item.currentPrice}</td>
                  <td className="px-5 py-3 text-sm text-white text-right font-medium">{item.value}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-sm font-medium ${
                      item.positive ? "text-accent" : "text-red-400"
                    }`}>
                      {item.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
