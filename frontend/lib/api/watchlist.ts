import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/frontend/lib/auth";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "@/frontend/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = getWatchlist(session.userId);
  return NextResponse.json({ data: items });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { symbol?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { symbol, name } = body;
  if (!symbol || !name) {
    return NextResponse.json(
      { error: "symbol and name are required" },
      { status: 400 }
    );
  }

  try {
    const item = addToWatchlist(session.userId, symbol, name);
    return NextResponse.json({ data: item }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to add to watchlist";
    if (message === "Ticker already in watchlist") {
      return NextResponse.json({ error: message }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json(
      { error: "symbol query parameter is required" },
      { status: 400 }
    );
  }

  const removed = removeFromWatchlist(session.userId, symbol);
  if (!removed) {
    return NextResponse.json(
      { error: "Ticker not found in watchlist" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
