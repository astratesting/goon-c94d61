import { NextRequest, NextResponse } from "next/server";
import { initializeDB, getPackageById, calculatePrice } from "@/lib/db";
import { trackCheckoutStart } from "@/lib/analytics";

await initializeDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageId, geo, adBudget, cadence } = body;

    if (!packageId || !geo) {
      return NextResponse.json({ error: "Package and geo are required" }, { status: 400 });
    }

    const pkg = getPackageById(packageId);
    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    const price = calculatePrice(packageId, adBudget || 0, cadence || "monthly");
    trackCheckoutStart("demo-user", packageId);

    return NextResponse.json({
      checkoutUrl: `/dashboard/subscriptions?success=true&package=${packageId}`,
      price,
      packageId,
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
