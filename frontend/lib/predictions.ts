/**
 * Seeded prediction engine — returns deterministic results per ticker for demo.
 */

export interface PredictionResult {
  direction: "bullish" | "bearish" | "neutral";
  confidence: number;
  timestamp: string;
}

function seedHash(ticker: string): number {
  let hash = 0;
  for (let i = 0; i < ticker.length; i++) {
    const char = ticker.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generatePrediction(ticker: string): PredictionResult {
  const seed = seedHash(ticker.toUpperCase());
  const rand = seededRandom(seed);

  const directions: PredictionResult["direction"][] = ["bullish", "bearish", "neutral"];
  const direction = directions[Math.floor(rand() * 3)];
  const confidence = Math.floor(rand() * 66) + 30; // 30–95

  return {
    direction,
    confidence,
    timestamp: new Date().toISOString(),
  };
}
