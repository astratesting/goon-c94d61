interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM || "Goon <notifications@goon.app>";

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, from = FROM_EMAIL } = options;

  if (!RESEND_API_KEY || RESEND_API_KEY === "re_placeholder") {
    console.log(`[Email Mock] To: ${to} | Subject: ${subject}`);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return res.ok;
  } catch (err) {
    console.error("Email send error:", err);
    return false;
  }
}

export function verificationEmail(name: string, link: string): EmailOptions & { subject: string; html: string } {
  return {
    to: "",
    subject: "Verify your Goon account",
    html: `
      <div style="font-family: 'Source Sans 3', sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #FFFBEB; border-radius: 16px; border: 1px solid #e5e7eb;">
        <h2 style="font-family: 'Manrope', sans-serif; color: #1E293B; margin-bottom: 8px;">Welcome to Goon, ${name}!</h2>
        <p style="color: #64748b; margin-bottom: 24px;">Verify your email to get started with automated marketing for your real estate brokerage.</p>
        <a href="${link}" style="display: inline-block; padding: 12px 24px; background: #7C3AED; color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">Verify Email</a>
        <p style="color: #94A3B8; font-size: 13px; margin-top: 24px;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  };
}

export function bookingConfirmation(
  name: string,
  date: string,
  time: string,
  packageName: string
) {
  return {
    to: "",
    subject: `Booking Confirmed — ${packageName} Demo`,
    html: `
      <div style="font-family: 'Source Sans 3', sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #FFFBEB; border-radius: 16px; border: 1px solid #e5e7eb;">
        <h2 style="font-family: 'Manrope', sans-serif; color: #1E293B; margin-bottom: 8px;">Booking Confirmed! 🎉</h2>
        <p style="color: #64748b; margin-bottom: 16px;">Hi ${name}, your demo call for <strong>${packageName}</strong> is confirmed.</p>
        <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
          <p style="margin: 4px 0; color: #334155;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Time:</strong> ${time}</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Package:</strong> ${packageName}</p>
        </div>
        <p style="color: #94A3B8; font-size: 13px;">We'll send a calendar invite shortly.</p>
      </div>
    `,
  };
}

export function leadNotification(leadName: string, leadEmail: string, source: string) {
  return {
    to: "",
    subject: `New Lead Captured — ${leadName}`,
    html: `
      <div style="font-family: 'Source Sans 3', sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #FFFBEB; border-radius: 16px; border: 1px solid #e5e7eb;">
        <h2 style="font-family: 'Manrope', sans-serif; color: #1E293B; margin-bottom: 8px;">New Lead! 📩</h2>
        <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
          <p style="margin: 4px 0; color: #334155;"><strong>Name:</strong> ${leadName}</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Email:</strong> ${leadEmail}</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Source:</strong> ${source}</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/campaigns" style="display: inline-block; padding: 12px 24px; background: #7C3AED; color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">View in Dashboard</a>
      </div>
    `,
  };
}

export function invoiceEmail(name: string, amount: number, date: string, packageName: string) {
  return {
    to: "",
    subject: `Invoice — Goon ${packageName} Subscription`,
    html: `
      <div style="font-family: 'Source Sans 3', sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #FFFBEB; border-radius: 16px; border: 1px solid #e5e7eb;">
        <h2 style="font-family: 'Manrope', sans-serif; color: #1E293B; margin-bottom: 8px;">Payment Receipt</h2>
        <p style="color: #64748b; margin-bottom: 16px;">Hi ${name}, your payment has been processed.</p>
        <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
          <p style="margin: 4px 0; color: #334155;"><strong>Package:</strong> ${packageName}</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Amount:</strong> $${amount.toLocaleString()}/mo</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Date:</strong> ${date}</p>
        </div>
      </div>
    `,
  };
}
