"use client";

import { useState } from "react";

const strategies = [
  {
    id: 1,
    name: "Trend Following",
    description:
      "Identifies and follows market momentum using moving averages, RSI, and MACD signals. Enters positions aligned with the prevailing trend and exits on reversal signals.",
    performance: "+18.3%",
    trades: 47,
    winRate: "64%",
    status: true,
    risk: "Medium",
  },
  {
    id: 2,
    name: "Mean Reversion",
    description:
      "Detects when asset prices deviate significantly from their historical mean and trades on the expectation of reversion. Uses Bollinger Bands and z-score analysis.",
    performance: "+12.7%",
    trades: 63,
    winRate: "71%",
    status: true,
    risk: "Low",
  },
  {
    id: 3,
    name: "Sentiment-Based",
    description:
      "Analyzes news sentiment, social media signals, and market fear/greed indicators to identify contrarian opportunities before price movements occur.",
    performance: "+24.1%",
    trades: 31,
    winRate: "58%",
    status: true,
    risk: "High",
  },
];

const riskColors: Record<string, string> = {
  Low: "text-accent bg-accent/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
  High: "text-red-400 bg-red-400/10",
};

export default function StrategiesClient() {
  const [strategyStates, setStrategyStates] = useState<Record<number, boolean>>(
    Object.fromEntries(strategies.map((s) => [s.id, s.status]))
  );

  const toggleStrategy = (id: number) => {
    setStrategyStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">
          AI Strategies
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your autonomous trading strategies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className="bg-navy-100 border border-slate-800 rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {strategy.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${riskColors[strategy.risk]}`}
                  >
                    {strategy.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  {strategy.description}
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleStrategy(strategy.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ml-4 ${
                  strategyStates[strategy.id] ? "bg-accent" : "bg-slate-600"
                }`}
                aria-label={`Toggle ${strategy.name}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    strategyStates[strategy.id]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-slate-800">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Performance
                </p>
                <p className="text-lg font-semibold text-accent mt-1">
                  {strategy.performance}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Total Trades
                </p>
                <p className="text-lg font-semibold text-white mt-1">
                  {strategy.trades}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Win Rate
                </p>
                <p className="text-lg font-semibold text-white mt-1">
                  {strategy.winRate}
                </p>
              </div>
            </div>

            {/* Status indicator */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  strategyStates[strategy.id] ? "bg-accent animate-pulse" : "bg-slate-600"
                }`}
              />
              <span className="text-xs text-slate-400">
                {strategyStates[strategy.id] ? "Active - Monitoring markets" : "Paused"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
