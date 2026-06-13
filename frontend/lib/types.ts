export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at: string;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  symbol: string;
  name: string;
  added_at: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  ticker: string;
  direction: "bullish" | "bearish" | "neutral";
  confidence: number;
  timestamp: string;
}
