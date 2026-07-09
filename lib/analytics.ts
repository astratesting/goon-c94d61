import type { AnalyticsEvent } from "@/types/global";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function captureEvent(
  event: string,
  properties: Record<string, string | number | boolean> = {},
  userId?: string
): void {
  if (typeof window === "undefined") return;

  if (POSTHOG_KEY && POSTHOG_KEY !== "phc_placeholder") {
    try {
      const w = window as unknown as Record<string, unknown>;
      const ph = w.posthog as { capture: (e: string, p: Record<string, string | number | boolean>) => void } | undefined;
      if (ph && typeof ph.capture === "function") {
        ph.capture(event, { ...properties, ...(userId ? { distinct_id: userId } : {}) });
        return;
      }
    } catch {
      // PostHog not loaded
    }
  }

  console.log(`[Analytics] ${event}`, properties);
}

export function trackSignup(userId: string, method: string = "email") {
  captureEvent("signup", { method }, userId);
}

export function trackLogin(userId: string) {
  captureEvent("login", { method: "credentials" }, userId);
}

export function trackPackageSelect(userId: string, packageId: string, price: number) {
  captureEvent("package_select", { packageId, price }, userId);
}

export function trackCheckoutStart(userId: string, packageId: string) {
  captureEvent("checkout_start", { packageId }, userId);
}

export function trackSubscription(userId: string, packageId: string, amount: number) {
  captureEvent("subscription_created", { packageId, amount }, userId);
}

export function trackBooking(userId: string, packageId: string) {
  captureEvent("booking_created", { packageId }, userId);
}

export function trackLeadCapture(formId: string, source: string) {
  captureEvent("lead_captured", { formId, source });
}

export function trackPageView(page: string) {
  captureEvent("page_view", { page });
}
