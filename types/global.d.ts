export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  emailVerified: boolean;
  role: "customer" | "admin";
  stripeCustomerId: string | null;
  createdAt: string;
}

export interface Campaign {
  id: string;
  userId: string;
  name: string;
  packageId: string;
  status: "draft" | "active" | "paused" | "completed";
  geo: string;
  keywords: string[];
  adSpend: number;
  cpc: number;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignMetric {
  id: string;
  campaignId: string;
  date: string;
  impressions: number;
  clicks: number;
  leads: number;
  spend: number;
  conversions: number;
}

export interface Lead {
  id: string;
  campaignId: string | null;
  source: string;
  status: "new" | "contacted" | "qualified" | "closed";
  name: string;
  email: string;
  phone: string;
  notes: string;
  capturedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  customerId: string | null;
  packageId: string | null;
  slotStart: string;
  slotEnd: string;
  status: "scheduled" | "confirmed" | "cancelled";
  metadata: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  packageId: string;
  status: "active" | "trialing" | "canceled";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
}

export interface MarketingForm {
  id: string;
  userId: string;
  name: string;
  fields: FormField[];
  submitUrl: string;
  createdAt: string;
}

export interface FormField {
  id: string;
  type: "text" | "email" | "phone" | "textarea" | "select" | "number";
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, string>;
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  variables: string[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  color: string;
  popular?: boolean;
}

export interface ServiceConfig {
  packageId: string;
  geo: string;
  keywords: string[];
  adBudget: number;
  cadence: "daily" | "weekly" | "bi-weekly" | "monthly";
  additionalOptions: Record<string, string | number | boolean>;
}

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, string | number | boolean>;
  timestamp: string;
  userId?: string;
}
