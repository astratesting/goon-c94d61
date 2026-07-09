const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

export async function createCheckoutSession(params: { userId: string; packageId: string; price: number }) {
  return { url: `/dashboard/services?success=true&package=${params.packageId}`, sessionId: `cs_demo_${params.packageId}` };
}

export async function handleStripeWebhook(body: string, signature: string) {
  return { handled: true, event: "checkout.session.completed" };
}
