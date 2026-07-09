# Goon — Automated Marketing for Realtors

AI-driven, hyper-local, closed-loop marketing campaigns for real estate brokerages. SEO, PPC, social, email, content — all automated.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4
- **Auth**: NextAuth v5 Credentials (email/password, bcrypt)
- **Database**: JSON file-based (dev) / Prisma + PostgreSQL (prod)
- **Payments**: Stripe (subscriptions, checkout)
- **Email**: Resend
- **Analytics**: PostHog
- **Language**: TypeScript

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and click "Try Live Demo" to log in with the demo account.

## Demo Account

- **Email**: demo@demo.app
- **Password**: demo123
- **Role**: Customer (full dashboard access)

## Admin Account

- **Email**: admin@goon.app
- **Password**: admin123
- **Role**: Admin (customer + campaign management)

## Features

- Landing page with warm SaaS design system
- Email/password authentication via NextAuth v5 + bcrypt
- Customer dashboard with KPIs, campaigns, bookings
- Service configurator (5 packages: SEO, PPC, Social, Email, Content)
- Calendly-style booking scheduler
- Lead capture form builder
- Stripe subscription management
- Admin dashboard for customer/campaign management
- Mobile responsive layout
- PostHog analytics integration
- Resend email notifications

## Project Structure

```
app/
├── auth/           # Sign in, sign up, verify
├── dashboard/      # Customer portal
├── admin/          # Admin panel
├── api/            # API routes
components/
├── ui/             # Reusable UI (Button, Card, Input, DatePicker)
├── dashboard/      # Dashboard-specific (Sidebar, StatsCard, CampaignCard, etc.)
├── contact/        # Contact form
├── campaign-kpi.tsx
├── service-configurator.tsx
├── booking-calendar.tsx
lib/
├── auth.ts         # NextAuth config + session helpers
├── db.ts           # JSON file-based database + seed data
├── stripe.ts       # Stripe integration
├── email.ts        # Resend email templates
├── analytics.ts    # PostHog event capture
├── validation.ts   # Zod schemas
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys. The app works in demo mode without any external service keys.
