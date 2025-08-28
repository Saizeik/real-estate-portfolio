// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

// Ensure API key exists
if (!process.env.MAILERSEND_API_KEY) {
  throw new Error("Missing MAILERSEND_API_KEY in environment variables");
}

// Initialize MailerSend
const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData = contactFormSchema.parse(body) as ContactFormData;

    // Honeypot spam check
    if (formData.honey) {
      return NextResponse.json({ success: true });
    }

    // Verified sender
    const sentFrom = new Sender(
      "support@stephaniekayephotography.com",
      "Stephanie Kaye Photography"
    );

    // Recipient (your inbox)
    const notifyRecipient = new Recipient(
      "nathan@stephaniekayephotography.com",
      "Nathan"
    );

    // Recipient (user submitting form)
    const userRecipient = new Recipient(formData.email, formData.name);

    // ----------- 📩 Email to You -----------
    const notifyEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo(notifyRecipient)
      .setSubject(`New Contact Form Submission from ${formData.name}`)
      .setHtml(`
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Package:</strong> ${formData.package}</p>
        <p><strong>Questions:</strong> ${formData.questions || "None"}</p>
      `)
      .setText(
        `New Contact Form Submission\n\n` +
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Package: ${formData.package}\n` +
          `Questions: ${formData.questions || "None"}\n`
      );

    // ----------- 📩 Auto-Reply to User -----------
    const confirmationEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo(userRecipient)
      .setSubject("We received your message ✨")
      .setHtml(`
        <h1>Thank you, ${formData.name}!</h1>
        <p>Your message has been received. I’ll get back to you as soon as possible.</p>
        <p><strong>Here’s a copy of what you submitted:</strong></p>
        <p><strong>Package:</strong> ${formData.package}</p>
        <p><strong>Questions:</strong> ${formData.questions || "None"}</p>
        <br/>
        <p>— Stephanie Kaye Photography</p>
      `)
      .setText(
        `Hi ${formData.name},\n\n` +
          `Thanks for reaching out! I’ve received your message and will reply shortly.\n\n` +
          `Here’s what you submitted:\n` +
          `Package: ${formData.package}\n` +
          `Questions: ${formData.questions || "None"}\n\n` +
          `— Stephanie Kaye Photography`
      );

    // Send both emails
    await mailersend.email.send(notifyEmail);
    await mailersend.email.send(confirmationEmail);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error in /api/contact:", err);
    return NextResponse.json(
      { error: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
