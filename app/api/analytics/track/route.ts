import { NextRequest, NextResponse } from "next/server";
import { initializeDB } from "@/lib/db";
import { captureEvent } from "@/lib/analytics";

await initializeDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, properties } = body;

    if (!event) {
      return NextResponse.json({ error: "event is required" }, { status: 400 });
    }

    captureEvent(event, properties);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: true }); // Don't fail on analytics errors
  }
}
