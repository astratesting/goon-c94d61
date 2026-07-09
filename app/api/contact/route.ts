import { NextRequest, NextResponse } from "next/server";
import { initializeDB, createLead, getCampaigns, getUsers, getUserById } from "@/lib/db";
import { leadNotification, sendEmail } from "@/lib/email";
import { trackLeadCapture } from "@/lib/analytics";

await initializeDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, campaignId, formId } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const lead = createLead({
      campaignId: campaignId || null,
      source: formId ? "form_submission" : "contact_page",
      status: "new",
      name,
      email,
      phone: phone || "",
      notes: message || "",
      capturedAt: new Date().toISOString(),
    });

    // Notify admin
    const adminUsers = getUsers().filter((u) => u.role === "admin");
    for (const admin of adminUsers) {
      const emailData = leadNotification(name, email, "Contact Form");
      emailData.to = admin.email;
      await sendEmail(emailData);
    }

    trackLeadCapture(formId || "contact", "contact_page");

    return NextResponse.json({ data: lead, message: "Lead captured successfully" }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
