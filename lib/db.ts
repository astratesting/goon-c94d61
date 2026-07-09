// @ts-nocheck
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import type {
  User,
  Campaign,
  CampaignMetric,
  Lead,
  Booking,
  Subscription,
  MarketingForm,
  FormSubmission,
  Package,
} from "@/types/global";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON<T>(filename: string): T[] {
  ensureDataDir();
  const fp = path.join(DATA_DIR, filename);
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, "[]", "utf-8");
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(fp, "utf-8")) as T[];
  } catch {
    fs.writeFileSync(fp, "[]", "utf-8");
    return [];
  }
}

function writeJSON<T>(filename: string, data: T[]) {
  ensureDataDir();
  fs.writeFileSync(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

function genId(): string {
  return crypto.randomUUID();
}

function genShortId(): string {
  return crypto.randomBytes(8).toString("hex");
}

// ─── Users ──────────────────────────────────────────────────────────────────

export function getUsers(): User[] {
  return readJSON<User>("users.json");
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email === email);
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: "customer" | "admin" = "customer"
): Promise<User> {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }
  const hashed = await bcrypt.hash(password, 10);
  const user: User = {
    id: genId(),
    email,
    name,
    passwordHash: hashed,
    emailVerified: true,
    role,
    stripeCustomerId: null,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeJSON("users.json", users);
  return user;
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<User | null> {
  const user = getUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

// ─── Campaigns ──────────────────────────────────────────────────────────────

export function getCampaigns(userId?: string): Campaign[] {
  const campaigns = readJSON<Campaign>("campaigns.json");
  if (userId) return campaigns.filter((c) => c.userId === userId);
  return campaigns;
}

export function getCampaignById(id: string): Campaign | undefined {
  return readJSON<Campaign>("campaigns.json").find((c) => c.id === id);
}

export function createCampaign(
  data: Omit<Campaign, "id" | "createdAt" | "updatedAt">
): Campaign {
  const campaigns = readJSON<Campaign>("campaigns.json");
  const now = new Date().toISOString();
  const campaign: Campaign = {
    ...data,
    id: genId(),
    createdAt: now,
    updatedAt: now,
  };
  campaigns.push(campaign);
  writeJSON("campaigns.json", campaigns);
  return campaign;
}

export function updateCampaign(
  id: string,
  data: Partial<Campaign>
): Campaign | null {
  const campaigns = readJSON<Campaign>("campaigns.json");
  const idx = campaigns.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  campaigns[idx] = {
    ...campaigns[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeJSON("campaigns.json", campaigns);
  return campaigns[idx];
}

// ─── Campaign Metrics ───────────────────────────────────────────────────────

export function getCampaignMetrics(campaignId: string): CampaignMetric[] {
  return readJSON<CampaignMetric>("campaign_metrics.json").filter(
    (m) => m.campaignId === campaignId
  );
}

export function addCampaignMetric(
  data: Omit<CampaignMetric, "id">
): CampaignMetric {
  const metrics = readJSON<CampaignMetric>("campaign_metrics.json");
  const metric: CampaignMetric = { ...data, id: genId() };
  metrics.push(metric);
  writeJSON("campaign_metrics.json", metrics);
  return metric;
}

// ─── Leads ──────────────────────────────────────────────────────────────────

export function getLeads(campaignId?: string): Lead[] {
  const leads = readJSON<Lead>("leads.json");
  if (campaignId) return leads.filter((l) => l.campaignId === campaignId);
  return leads;
}

export function getLeadById(id: string): Lead | undefined {
  return readJSON<Lead>("leads.json").find((l) => l.id === id);
}

export function createLead(data: Omit<Lead, "id">): Lead {
  const leads = readJSON<Lead>("leads.json");
  const lead: Lead = { ...data, id: genId() };
  leads.push(lead);
  writeJSON("leads.json", leads);
  return lead;
}

export function updateLead(id: string, data: Partial<Lead>): Lead | null {
  const leads = readJSON<Lead>("leads.json");
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], ...data };
  writeJSON("leads.json", leads);
  return leads[idx];
}

// ─── Bookings ───────────────────────────────────────────────────────────────

export function getBookings(userId?: string): Booking[] {
  const bookings = readJSON<Booking>("bookings.json");
  if (userId) return bookings.filter((b) => b.userId === userId);
  return bookings;
}

export function createBooking(
  data: Omit<Booking, "id" | "createdAt">
): Booking {
  const bookings = readJSON<Booking>("bookings.json");
  const booking: Booking = {
    ...data,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  writeJSON("bookings.json", bookings);
  return booking;
}

export function updateBooking(
  id: string,
  data: Partial<Booking>
): Booking | null {
  const bookings = readJSON<Booking>("bookings.json");
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = { ...bookings[idx], ...data };
  writeJSON("bookings.json", bookings);
  return bookings[idx];
}

// ─── Subscriptions ──────────────────────────────────────────────────────────

export function getSubscriptions(userId?: string): Subscription[] {
  const subs = readJSON<Subscription>("subscriptions.json");
  if (userId) return subs.filter((s) => s.userId === userId);
  return subs;
}

export function createSubscription(
  data: Omit<Subscription, "id" | "createdAt">
): Subscription {
  const subs = readJSON<Subscription>("subscriptions.json");
  const sub: Subscription = {
    ...data,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  subs.push(sub);
  writeJSON("subscriptions.json", subs);
  return sub;
}

export function updateSubscription(
  id: string,
  data: Partial<Subscription>
): Subscription | null {
  const subs = readJSON<Subscription>("subscriptions.json");
  const idx = subs.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  subs[idx] = { ...subs[idx], ...data };
  writeJSON("subscriptions.json", subs);
  return subs[idx];
}

// ─── Forms ──────────────────────────────────────────────────────────────────

export function getForms(userId?: string): MarketingForm[] {
  const forms = readJSON<MarketingForm>("forms.json");
  if (userId) return forms.filter((f) => f.userId === userId);
  return forms;
}

export function getFormById(id: string): MarketingForm | undefined {
  return readJSON<MarketingForm>("forms.json").find((f) => f.id === id);
}

export function createForm(data: Omit<MarketingForm, "id" | "createdAt">): MarketingForm {
  const forms = readJSON<MarketingForm>("forms.json");
  const form: MarketingForm = {
    ...data,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  forms.push(form);
  writeJSON("forms.json", forms);
  return form;
}

export function updateForm(
  id: string,
  data: Partial<MarketingForm>
): MarketingForm | null {
  const forms = readJSON<MarketingForm>("forms.json");
  const idx = forms.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  forms[idx] = { ...forms[idx], ...data };
  writeJSON("forms.json", forms);
  return forms[idx];
}

export function deleteForm(id: string): boolean {
  const forms = readJSON<MarketingForm>("forms.json");
  const filtered = forms.filter((f) => f.id !== id);
  if (filtered.length === forms.length) return false;
  writeJSON("forms.json", filtered);
  return true;
}

// ─── Form Submissions ───────────────────────────────────────────────────────

export function getFormSubmissions(formId?: string): FormSubmission[] {
  const subs = readJSON<FormSubmission>("form_submissions.json");
  if (formId) return subs.filter((s) => s.formId === formId);
  return subs;
}

export function createFormSubmission(
  data: Omit<FormSubmission, "id" | "createdAt">
): FormSubmission {
  const subs = readJSON<FormSubmission>("form_submissions.json");
  const sub: FormSubmission = {
    ...data,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  subs.push(sub);
  writeJSON("form_submissions.json", subs);
  return sub;
}

// ─── Packages ───────────────────────────────────────────────────────────────

export const PACKAGES: Package[] = [
  {
    id: "seo",
    name: "SEO Optimization",
    description:
      "Hyper-local search engine optimization to dominate Google rankings for real estate searches in your market.",
    basePrice: 2000,
    features: [
      "Local keyword strategy",
      "On-page optimization",
      "Google Business Profile management",
      "Monthly ranking reports",
      "Backlink building",
    ],
    color: "#7C3AED",
  },
  {
    id: "ppc",
    name: "PPC Advertising",
    description:
      "Data-driven Google & Meta ad campaigns targeting home buyers and sellers in your exact geo.",
    basePrice: 3500,
    features: [
      "Google Ads management",
      "Facebook/Instagram ads",
      "Retargeting campaigns",
      "Landing page optimization",
      "Weekly performance reports",
    ],
    color: "#F97316",
    popular: true,
  },
  {
    id: "social",
    name: "Social Media Management",
    description:
      "Consistent, branded social content across all platforms to build authority and generate inbound leads.",
    basePrice: 2500,
    features: [
      "Content calendar creation",
      "Post scheduling & publishing",
      "Engagement management",
      "Instagram Reels & TikTok",
      "Monthly analytics report",
    ],
    color: "#FBBF24",
  },
  {
    id: "email",
    name: "Email Marketing",
    description:
      "Automated drip campaigns, newsletters, and nurture sequences that convert leads into closings.",
    basePrice: 1800,
    features: [
      "Drip campaign setup",
      "Lead nurture sequences",
      "Newsletter templates",
      "List segmentation",
      "A/B testing",
    ],
    color: "#EC4899",
  },
  {
    id: "content",
    name: "Content Creation",
    description:
      "Professional blog posts, video scripts, market reports, and property descriptions that attract and convert.",
    basePrice: 2200,
    features: [
      "Blog posts (4/month)",
      "Market analysis reports",
      "Property listing copy",
      "Video scripts",
      "Social media graphics",
    ],
    color: "#10B981",
  },
];

export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find((p) => p.id === id);
}

export function calculatePrice(
  packageId: string,
  adBudget: number,
  cadence: string
): number {
  const pkg = getPackageById(packageId);
  if (!pkg) return 0;
  const cadenceMultiplier: Record<string, number> = {
    daily: 1.3,
    weekly: 1.1,
    "bi-weekly": 1.0,
    monthly: 0.85,
  };
  const base = pkg.basePrice;
  const perfFee = adBudget * 0.1;
  return Math.round(base * (cadenceMultiplier[cadence] || 1) + perfFee);
}

// ─── Seed Data ──────────────────────────────────────────────────────────────

export async function seedDemoData() {
  const users = getUsers();
  if (users.length > 0) return;

  const demoUser = await createUser("demo@demo.app", "demo123", "Demo User", "customer");
  const adminUser = await createUser("admin@goon.app", "admin123", "Admin User", "admin");

  const now = new Date();
  const daysAgo = (d: number) => {
    const dt = new Date(now);
    dt.setDate(dt.getDate() - d);
    return dt.toISOString();
  };

  // Campaigns
  const campaigns: Campaign[] = [
    {
      id: genId(), userId: demoUser.id, name: "Phoenix Home Buyers SEO",
      packageId: "seo", status: "active", geo: "Phoenix, AZ",
      keywords: ["phoenix homes for sale", "AZ real estate", "phoenix realtor"],
      adSpend: 0, cpc: 0, startDate: daysAgo(45), endDate: null,
      createdAt: daysAgo(45), updatedAt: daysAgo(2),
    },
    {
      id: genId(), userId: demoUser.id, name: "Scottsdale PPC Campaign",
      packageId: "ppc", status: "active", geo: "Scottsdale, AZ",
      keywords: ["scottsdale luxury homes", "buy home scottsdale", "scottsdale real estate agent"],
      adSpend: 5000, cpc: 2.45, startDate: daysAgo(30), endDate: null,
      createdAt: daysAgo(30), updatedAt: daysAgo(1),
    },
    {
      id: genId(), userId: demoUser.id, name: "CA Coastal Social Media",
      packageId: "social", status: "active", geo: "San Diego, CA",
      keywords: ["san diego homes", "coastal real estate", "SD realtor"],
      adSpend: 0, cpc: 0, startDate: daysAgo(60), endDate: null,
      createdAt: daysAgo(60), updatedAt: daysAgo(3),
    },
    {
      id: genId(), userId: demoUser.id, name: "Tucson Lead Nurture",
      packageId: "email", status: "active", geo: "Tucson, AZ",
      keywords: ["tucson real estate", "tucson homes"],
      adSpend: 0, cpc: 0, startDate: daysAgo(20), endDate: null,
      createdAt: daysAgo(20), updatedAt: daysAgo(5),
    },
    {
      id: genId(), userId: demoUser.id, name: "Mesa Content Strategy",
      packageId: "content", status: "draft", geo: "Mesa, AZ",
      keywords: ["mesa arizona homes", "east valley real estate"],
      adSpend: 0, cpc: 0, startDate: daysAgo(10), endDate: null,
      createdAt: daysAgo(10), updatedAt: daysAgo(10),
    },
  ];
  writeJSON("campaigns.json", campaigns);

  // Campaign Metrics
  const metrics: CampaignMetric[] = [];
  for (const campaign of campaigns) {
    if (campaign.status === "draft") continue;
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      metrics.push({
        id: genId(),
        campaignId: campaign.id,
        date: d.toISOString().split("T")[0],
        impressions: Math.floor(Math.random() * 5000) + 1000,
        clicks: Math.floor(Math.random() * 200) + 50,
        leads: Math.floor(Math.random() * 20) + 3,
        spend: Math.round((Math.random() * 300 + 50) * 100) / 100,
        conversions: Math.floor(Math.random() * 5) + 1,
      });
    }
  }
  writeJSON("campaign_metrics.json", metrics);

  // Leads
  const leadNames = [
    ["Sarah Chen", "sarah@homebuyers.com", "480-555-0101"],
    ["Mike Johnson", "mike.j@gmail.com", "602-555-0202"],
    ["Lisa Park", "lisa.park@realtor.com", "480-555-0303"],
    ["David Rodriguez", "david.r@outlook.com", "602-555-0404"],
    ["Emma Wilson", "emma.wilson@yahoo.com", "520-555-0505"],
    ["James Lee", "james.lee@gmail.com", "858-555-0606"],
    ["Maria Garcia", "maria.g@icloud.com", "619-555-0707"],
    ["Robert Kim", "rkim@realtor.com", "480-555-0808"],
    ["Jennifer Adams", "jen.a@gmail.com", "602-555-0909"],
    ["Carlos Martinez", "carlos.m@gmail.com", "520-555-1010"],
  ];
  const leads: Lead[] = leadNames.map((l, i) => ({
    id: genId(),
    campaignId: campaigns[i % 4].id,
    source: ["google_ads", "organic", "social", "email"][i % 4],
    status: (["new", "contacted", "qualified", "closed"] as const)[i % 4],
    name: l[0],
    email: l[1],
    phone: l[2],
    notes: i % 3 === 0 ? "Interested in luxury properties" : "",
    capturedAt: daysAgo(Math.floor(Math.random() * 30)),
  }));
  writeJSON("leads.json", leads);

  // Bookings
  const bookings: Booking[] = [
    {
      id: genId(), userId: demoUser.id, customerId: null,
      packageId: "ppc",
      slotStart: new Date(now.getTime() + 86400000).toISOString(),
      slotEnd: new Date(now.getTime() + 90000000).toISOString(),
      status: "scheduled", metadata: "Demo call for PPC campaign", createdAt: daysAgo(2),
    },
    {
      id: genId(), userId: demoUser.id, customerId: null,
      packageId: "seo",
      slotStart: new Date(now.getTime() + 172800000).toISOString(),
      slotEnd: new Date(now.getTime() + 176400000).toISOString(),
      status: "confirmed", metadata: "Strategy review", createdAt: daysAgo(5),
    },
  ];
  writeJSON("bookings.json", bookings);

  // Subscriptions
  const subscriptions: Subscription[] = [
    {
      id: genId(), userId: demoUser.id, stripeSubscriptionId: "sub_demo_001",
      packageId: "ppc", status: "active",
      currentPeriodStart: daysAgo(15), currentPeriodEnd: new Date(now.getTime() + 15 * 86400000).toISOString(),
      cancelAtPeriodEnd: false, createdAt: daysAgo(45),
    },
    {
      id: genId(), userId: demoUser.id, stripeSubscriptionId: "sub_demo_002",
      packageId: "seo", status: "active",
      currentPeriodStart: daysAgo(10), currentPeriodEnd: new Date(now.getTime() + 20 * 86400000).toISOString(),
      cancelAtPeriodEnd: false, createdAt: daysAgo(45),
    },
  ];
  writeJSON("subscriptions.json", subscriptions);

  // Forms
  const forms: MarketingForm[] = [
    {
      id: genId(), userId: demoUser.id, name: "Home Buyer Lead Form",
      fields: [
        { id: genShortId(), type: "text", label: "Full Name", required: true, placeholder: "Enter your name" },
        { id: genShortId(), type: "email", label: "Email", required: true, placeholder: "you@example.com" },
        { id: genShortId(), type: "phone", label: "Phone", required: false, placeholder: "(555) 000-0000" },
        { id: genShortId(), type: "select", label: "Budget Range", required: true, options: ["$200K-$400K", "$400K-$600K", "$600K-$1M", "$1M+"] },
        { id: genShortId(), type: "select", label: "Timeline", required: true, options: ["Immediately", "1-3 months", "3-6 months", "6+ months"] },
      ],
      submitUrl: "/api/contact", createdAt: daysAgo(20),
    },
    {
      id: genShortId(), userId: demoUser.id, name: "Free Market Report",
      fields: [
        { id: genShortId(), type: "text", label: "Name", required: true },
        { id: genShortId(), type: "email", label: "Email", required: true },
        { id: genShortId(), type: "text", label: "Zip Code", required: true },
      ],
      submitUrl: "/api/contact", createdAt: daysAgo(15),
    },
  ];
  writeJSON("forms.json", forms);

  // Form submissions
  const submissions: FormSubmission[] = [
    { id: genId(), formId: forms[0].id, data: { "Full Name": "Alex Thompson", Email: "alex@buyers.com", Phone: "480-555-1234", "Budget Range": "$400K-$600K", Timeline: "1-3 months" }, createdAt: daysAgo(3) },
    { id: genId(), formId: forms[0].id, data: { "Full Name": "Karen White", Email: "karen.w@gmail.com", "Budget Range": "$600K-$1M", Timeline: "3-6 months" }, createdAt: daysAgo(5) },
    { id: genId(), formId: forms[1].id, data: { Name: "Brian Lee", Email: "brian.lee@yahoo.com", "Zip Code": "85001" }, createdAt: daysAgo(1) },
  ];
  writeJSON("form_submissions.json", submissions);

  // Assign campaigns to admin user too
  campaigns[0].userId = adminUser.id;
  campaigns[1].userId = adminUser.id;
  campaigns[2].userId = adminUser.id;
  writeJSON("campaigns.json", campaigns);
}

export async function initializeDB() {
  await seedDemoData();
}
