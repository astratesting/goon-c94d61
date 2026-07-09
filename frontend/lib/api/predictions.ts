import { NextResponse } from "next/server";
import { auth } from "@/frontend/lib/auth";
import { getWatchlist } from "@/frontend/lib/db";
import { generatePrediction } from "@/frontend/lib/predictions";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const watchlist = getWatchlist(session.user.id);
  const predictions = watchlist.map((item) => {
    const pred = generatePrediction(item.symbol);
    return {
      ticker: item.symbol,
      name: item.name,
      direction: pred.direction,
      confidence: pred.confidence,
      timestamp: pred.timestamp,
    };
  });

  return NextResponse.json({ data: predictions });
}
