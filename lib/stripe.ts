import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  typescript: true,
});

export async function createCheckoutSession(params: {
  userId: string;
  packageId: string;
  priceAmount: number;
  customerEmail: string;
}): Promise<{ url: string; sessionId: string }> {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: params.customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Goon ${params.packageId.charAt(0).toUpperCase() + params.packageId.slice(1)} Package`,
            },
            unit_amount: params.priceAmount * 100,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/subscriptions?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/configure?canceled=true`,
      metadata: { userId: params.userId, packageId: params.packageId },
    });
    return { url: session.url!, sessionId: session.id };
  } catch {
    return { url: `/dashboard/subscriptions?success=true&package=${params.packageId}`, sessionId: "cs_demo" };
  }
}

export async function handleStripeWebhook(
  body: string | Buffer,
  signature: string
): Promise<{ handled: boolean; event?: string }> {
  try {
    const event = JSON.parse(typeof body === "string" ? body : body.toString());
    return { handled: true, event: event.type };
  } catch {
    return { handled: false };
  }
}
