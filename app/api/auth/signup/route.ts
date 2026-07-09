import { NextRequest, NextResponse } from "next/server";
import { initializeDB, createUser } from "@/lib/db";

await initializeDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, company } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const user = await createUser(email, password, name);

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      message: "Account created successfully",
    }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    if (message === "User already exists") {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
