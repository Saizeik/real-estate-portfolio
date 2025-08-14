// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

// Make sure the API key exists
if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const body = await req.json();

    // Validate form data
    const formData = contactFormSchema.parse(body) as ContactFormData;

    // Optional: Skip sending if honeypot is filled
    if (formData.honey) {
      return NextResponse.json({ success: true }); // silently ignore bots
    }

    // Send email using Resend
    await resend.emails.send({
      from: "support@stephaniekayephotography.com", // Replace with your verified "from" email
      to: "stephanie@stephaniekayephotography.com", // Your email
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Package:</strong> ${formData.package}</p>
        <p><strong>Questions:</strong> ${formData.questions || "None"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error in /api/contact:", err);
    return NextResponse.json(
      { error: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}