// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

// Ensure API key is present
if (!process.env.MAILERSEND_API_KEY) {
  throw new Error("Missing MAILERSEND_API_KEY in environment variables");
}

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData = contactFormSchema.parse(body) as ContactFormData;

    if (formData.honey) {
      return NextResponse.json({ success: true });
    }

    const sentFrom = new Sender(
      "support@stephaniekayephotography.com", // Must be a verified sender
      "Stephanie Kaye Photography"
    );

    const notifyEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient("nathan@stephaniekayephotography.com", "Nathan")])
      .setSubject(`New Contact Form Submission from ${formData.name}`)
      .setHtml(`
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Package:</strong> ${formData.package}</p>
        <p><strong>Questions:</strong> ${formData.questions || "None"}</p>
      `)
      .setText(
        `New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Package: ${formData.package}
Questions: ${formData.questions || "None"}`
      );

    const confirmationEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient(formData.email, formData.name)])
      .setSubject("We received your message ✨")
      .setHtml(`
        <h1>Thank you, ${formData.name}!</h1>
        <p>Your message has been received. I’ll get back to you soon.</p>
        <p><strong>Here’s a copy of what you submitted:</strong></p>
        <p><strong>Package:</strong> ${formData.package}</p>
        <p><strong>Questions:</strong> ${formData.questions || "None"}</p>
      `)
      .setText(
        `Hi ${formData.name},

Thanks for reaching out! I’ve got your message and will reply shortly.

Your submission:
Package: ${formData.package}
Questions: ${formData.questions || "None"}

— Stephanie Kaye Photography`
      );

    await mailersend.email.send(notifyEmail);
    await mailersend.email.send(confirmationEmail);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error sending emails:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
