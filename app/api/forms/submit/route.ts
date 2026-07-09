import { NextRequest, NextResponse } from "next/server";
import { initializeDB, createFormSubmission, getFormById } from "@/lib/db";
import { createLead } from "@/lib/db";

await initializeDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formId, data } = body;

    if (!formId || !data) {
      return NextResponse.json({ error: "formId and data are required" }, { status: 400 });
    }

    const form = getFormById(formId);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const submission = createFormSubmission({ formId, data });

    // Also create a lead
    const nameField = form.fields.find((f) => f.type === "text" || f.type === "textarea");
    const emailField = form.fields.find((f) => f.type === "email");
    const phoneField = form.fields.find((f) => f.type === "phone");

    createLead({
      campaignId: null,
      source: `form:${form.name}`,
      status: "new",
      name: nameField ? data[nameField.label] || "Unknown" : "Unknown",
      email: emailField ? data[emailField.label] || "" : "",
      phone: phoneField ? data[phoneField.label] || "" : "",
      notes: `Submitted via form: ${form.name}`,
      capturedAt: new Date().toISOString(),
    });

    return NextResponse.json({ data: submission, message: "Submission recorded" }, { status: 201 });
  } catch (err) {
    console.error("Form submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
