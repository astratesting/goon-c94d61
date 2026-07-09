## 1) PRODUCT
Goon is a full-stack automated marketing SaaS for mid-sized real estate brokerages (20–200 agents, $20M–$100M revenue). It delivers AI-driven, hyper-local, closed-loop campaigns (SEO, PPC, social, email, content) with service-configurable packages, booking/demo scheduling, lead capture forms, campaign dashboards, and recurring subscription billing. The core value is turning realtor marketing intent into booked demos and closed leads via automated, localized campaigns — solving the pain of fragmented tools, manual workflows, and opaque performance (research: ICP mid-sized brokerages, $2k–$10k/mo SaaS + 5–15% performance fee). The primary user is real-estate marketing ops/manager and broker owners who need an all-in-one control center with real metrics and simple package configuration.

## 2) WHO IT’S FOR
ICP: mid-sized real estate brokerages (20–200 agents, $20M–$100M revenue) in AZ/CA. Personas: Marketing Manager (time-poor, needs set-and-forget automation), Broker/Owner (wants ROI and lead volume), Exec Assistant (handles scheduling/payments). Product tone: warm, confident, premium — rounded surfaces, prism motif, warm SaaS palette (violet #7C3AED, coral #F97316, honey #FBBF24, warm off-white #FFFBEB), Manrope headings, Source Sans 3 body. No enterprise fluff; prioritize clarity, speed, and trust.

## 3) LOOK & FEEL
- Vibe: warm SaaS with rounded surfaces, soft shadows, generous white space, prism-inspired subtle gradients.
- Palette: Violet #7C3AED (primary), Coral #F97316 (accent), Honey #FBBF24 (highlight), Warm off-white #FFFBEB (background), Slate #334155 (text/disabled), Gray #94A3B8 (secondary text), Cool Gray #1E293B (surface text).
- Typography: Manrope (headings), Source Sans 3 (body), Inter (ui elements), JetBrains Mono (pricing/metrics mono accents).
- Layout: single-column top-down, consistent max-w-6xl container, 24–32px section vertical rhythm, 8px base unit.
- Components: rounded buttons (12px), raised cards (8–16px radius), subtle shadow-sm, border focus rings in violet, iconography outlined style with coral highlights.
- Motion: ease-out cubic, 200–300ms micro-interactions, staggered list fade-in.

Main screens:
- Landing (kept intact): Hero (value prop + primary CTA), Features (3), Pricing (3 tiers), FAQ, Footer.
- Auth: centered card with violet header, email+password + magic-link fallback, minimal chrome.
- Dashboard (Today): top bar (brand + global nav), Today card (campaign KPIs, lead metrics, quick actions), Secondary nav (Campaigns, Bookings, Forms, Subscriptions, Admin).
- Campaign Detail: header with status badges, tabs (Overview, Leads, Automations, Settings).
- Service Configurator: step wizard (Select Package → Configure Options → Review → Checkout).
- Booking: Calendly-style date/time picker integrated with Calendly API, confirmation screen.
- Admin: customer list, campaign table, user management, invite/roles.

## 4) USER FLOWS
- Sign up → Verify email → Redirect to Dashboard Today → Configure service → Checkout (Stripe) → Booking → Campaign launch → Lead capture → Review analytics.
- Login → Redirect to Dashboard.
- Forgot password → Magic link → Set password → Login.
- Service configurator: pick package → set parameters (geo, keywords, ad spend) → review → subscribe (Stripe) → activate.
- Booking: select date → select time → Calendly API availability check → confirm → email + calendar invite.
- Lead capture: form render → submit → webhook → notify via Resend → store lead.

## 5) PAGES/ROUTES
- / (landing) — static, unchanged design.
- /auth/signup — email + password, terms, submit → create user → send verification email → redirect /dashboard.
- /auth/signin — email + password, magic link option → sign in → redirect /dashboard.
- /auth/verify — email verification pending → resend → success → redirect /dashboard.
- /dashboard — Today view (default), layout: topbar + sidebar + main.
- /dashboard/campaigns — list and create campaigns.
- /dashboard/campaigns/[id] — detail and tabs.
- /dashboard/configure — service configurator wizard.
- /dashboard/book — booking scheduler.
- /dashboard/forms — lead capture forms list + builder.
- /dashboard/subscriptions — active/past invoices, upgrade/downgrade.
- /admin/customers — customer management (admin only).
- /admin/campaigns — campaign management (admin only).
- /api/auth/[...nextauth] — NextAuth v5 Credentials + bcrypt.
- /api/campaigns/leads — webhook endpoint for lead capture.
- /api/stripe/webhook — Stripe webhook handler.
- /api/booking/availability — Calendly-style availability proxy.
- /api/email/send — Resend email sender.
- /api/analytics/track — PostHog event ingestion.

## 6) CORE FEATURES
- Auth: NextAuth v5 Credentials provider with bcrypt, session via JWT, email verification, magic link.
- Customer Portal/Dashboard: Today view with KPIs (leads, booked demos, revenue), campaign list, subscription status, quick CTAs.
- Service Configurator: Wizard with packages (SEO, PPC, Social Media, Email Marketing, Content Creation), each with configurable options (geo, keywords, ad budget, cadence), real-time pricing summary, CTA to checkout.
- Booking/Demo Scheduler: Calendly-style availability picker integrated with Calendly API, timezone handling, buffer times, confirmation and email invite via Resend.
- Admin Dashboard: customer CRUD, campaign CRUD, role management, audit logs.
- Contact/Lead Capture Forms: drag-and-drop form builder, field validation, webhook to CRM/email, submissions list.
- Stripe Integration: subscription creation, checkout session, webhook handler for events (invoice.paid, customer.subscription.updated), proration, cancel_at_period_end.
- Email Notifications: Resend integration (send verification, booking confirm, campaign alerts, invoice receipts), templates stored in /emails.
- PostHog Analytics: middleware event capture (signup, login, package_select, checkout_start, subscription, booking, lead_capture), session replay optional.

## 7) DATA MODEL
- User { id, email, name, password_hash, email_verified, role (customer|admin), created_at, stripe_customer_id }
- Campaign { id, user_id, name, package_id, status (draft|active|paused), geo, keywords, ad_spend, cpc, start_date, end_date, created_at, updated_at }
- CampaignMetric { id, campaign_id, date, impressions, clicks, leads, spend, conversions }
- Lead { id, campaign_id, source, status (new|contacted|qualified|closed), name, email, phone, notes, captured_at }
- Booking { id, user_id, customer_id, package_id, slot_start, slot_end, status (scheduled|confirmed|cancelled), metadata }
- Subscription { id, user_id, stripe_subscription_id, package_id, status (active|trialing|canceled), current_period_start, current_period_end, cancel_at_period_end }
- Form { id, user_id, name, fields JSON, submit_url, created_at }
- FormSubmission { id, form_id, data JSON, created_at }
- EmailTemplate { id, name, subject, html, variables JSON }

## 8) AUTH
- Use NextAuth v5 Credentials provider with bcrypt for password hashing.
- Magic link flow using same provider with sendVerificationRequest redirecting to provider custom route.
- Session: JWT with roles, access via getServerSession.
- Middleware protection for /dashboard and /admin routes.
- Default email verification required for signup; admins can promote roles via Admin dashboard.

## 9) FILES
- app/globals.css — design tokens, typography, global styles.
- app/layout.tsx — root layout with theme and body classes.
- app/page.tsx — landing (unchanged).
- app/auth/signup/page.tsx — sign up form.
- app/auth/signin/page.tsx — sign in form + magic link.
- app/auth/verify/page.tsx — verification pending.
- app/dashboard/layout.tsx — authenticated layout with sidebar.
- app/dashboard/page.tsx — Today view.
- app/dashboard/campaigns/page.tsx — campaigns list.
- app/dashboard/campaigns/[id]/page.tsx — campaign detail.
- app/dashboard/configure/page.tsx — service configurator wizard.
- app/dashboard/book/page.tsx — booking scheduler.
- app/dashboard/forms/page.tsx — forms list.
- app/dashboard/forms/[id]/page.tsx — form builder and submissions.
- app/dashboard/subscriptions/page.tsx — billing.
- app/admin/customers/page.tsx — customer management.
- app/admin/campaigns/page.tsx — campaign management.
- components/ui/button.tsx — primary/secondary/outline ghost.
- components/ui/card.tsx — surfaced card.
- components/ui/input.tsx — styled input/select/textarea.
- components/ui/date-picker.tsx — reusable date picker.
- components/campaign-kpi.tsx — Today KPI.
- components/service-configurator.tsx — package selection + options.
- components/booking-calendar.tsx — availability grid.
- hooks/api.ts — fetch wrappers, auth interceptors.
- lib/auth.ts — session/getServerSession, role checks.
- lib/db.ts — Prisma client (if used) or Supabase client.
- lib/stripe.ts — checkout and webhook helpers.
- lib/email.ts — Resend client and templates.
- lib/analytics.ts — PostHog capture middleware.
- lib/validation.ts — Zod schemas for forms.
- prisma/schema.prisma or lib/db.ts — data model definitions.
- next.config.js — middleware, rewrites, env.
- types/global.d.ts — global types.

## 10) ACCEPTANCE
- Auth: sign up with email/password creates verified user; magic link works; protected routes redirect unauthenticated users.
- Dashboard: Today view shows KPIs and last 5 campaigns; data loads via server actions.
- Service configurator: package selection updates pricing in real time; validation prevents empty config; checkout creates Stripe session.
- Booking: availability reflects Calendly API; slots respect timezone and buffers; confirmation email sent via Resend.
- Admin: customer and campaign CRUD with role checks; actions log events.
- Leads: form submissions persist and notify via Resend; webhook ingestion works.
- Stripe: subscriptions create customer, attach stripe_customer_id, handle webhooks for status changes and proration.
- Email: templates render via Resend; verification/booking/invoice emails sent with correct context.
- Analytics: PostHog initialized in production; key events captured; dev builds run without errors.
- Responsive: mobile layout collapses sidebar into bottom nav; touch targets ≥44px; no horizontal scroll.
- Security: CSP via next/headers, parameterized queries, env var isolation, rate limits on auth endpoints.
FILES: ["app/globals.css", "app/layout.tsx", "app/page.tsx", "app/auth/signup/page.tsx", "app/auth/signin/page.tsx", "app/auth/verify/page.tsx", "app/dashboard/layout.tsx", "app/dashboard/page.tsx", "app/dashboard/campaigns/page.tsx", "app/dashboard/campaigns/[id]/page.tsx", "app/dashboard/configure/page.tsx", "app/dashboard/book/page.tsx", "app/dashboard/forms/page.tsx", "app/dashboard/forms/[id]/page.tsx", "app/dashboard/subscriptions/page.tsx", "app/admin/customers/page.tsx", "app/admin/campaigns/page.tsx", "components/ui/button.tsx", "components/ui/card.tsx", "components/ui/input.tsx", "components/ui/date-picker.tsx", "components/campaign-kpi.tsx", "components/service-configurator.tsx", "components/booking-calendar.tsx", "hooks/api.ts", "lib/auth.ts", "lib/db.ts", "lib/stripe.ts", "lib/email.ts", "lib/analytics.ts", "lib/validation.ts", "prisma/schema.prisma", "next.config.js", "types/global.d.ts"]