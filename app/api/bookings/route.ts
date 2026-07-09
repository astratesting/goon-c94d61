import { NextRequest, NextResponse } from "next/server";
import { initializeDB, createBooking, getPackageById } from "@/lib/db";
import { bookingConfirmation, sendEmail } from "@/lib/email";
import { trackBooking } from "@/lib/analytics";

await initializeDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slotStart, packageId, notes } = body;

    if (!slotStart || !packageId) {
      return NextResponse.json({ error: "slotStart and packageId are required" }, { status: 400 });
    }

    const pkg = getPackageById(packageId);
    const slotDate = new Date(slotStart);
    const slotEnd = new Date(slotDate.getTime() + 30 * 60 * 1000);

    const booking = createBooking({
      userId: "demo-user",
      customerId: null,
      packageId,
      slotStart: slotDate.toISOString(),
      slotEnd: slotEnd.toISOString(),
      status: "scheduled",
      metadata: notes || "",
    });

    const emailData = bookingConfirmation(
      "Demo User",
      slotDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
      slotDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      pkg?.name || packageId
    );
    emailData.to = "demo@demo.app";
    await sendEmail(emailData);
    trackBooking("demo-user", packageId);

    return NextResponse.json({ data: booking, message: "Booking created" }, { status: 201 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { getBookings } = await import("@/lib/db");
    const bookings = getBookings("demo-user");
    return NextResponse.json({ data: bookings });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
