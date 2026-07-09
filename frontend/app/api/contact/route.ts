import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    console.log(`[Contact] ${name} <${email}>: ${message}`);
    return NextResponse.json({ message: "Lead captured" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
