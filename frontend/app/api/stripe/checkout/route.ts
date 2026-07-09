import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageId } = body;
    return NextResponse.json({ checkoutUrl: "/dashboard/services?success=true", packageId });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
