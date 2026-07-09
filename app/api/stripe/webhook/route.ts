import { NextRequest, NextResponse } from "next/server";
import { initializeDB } from "@/lib/db";
import { handleStripeWebhook } from "@/lib/stripe";

await initializeDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";
    const result = await handleStripeWebhook(body, signature);
    if (!result.handled) {
      return NextResponse.json({ error: "Webhook handling failed" }, { status: 400 });
    }
    return NextResponse.json({ received: true, event: result.event });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
