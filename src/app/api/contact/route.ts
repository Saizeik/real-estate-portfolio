import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.parse(body); // ✅ validate input

    const { name, email, package: pkg, questions } = parsed;

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY as string,
    });

    // --- Senders ---
    // Client-facing sender (your verified domain)
    const fromSupport: Sender = {
      email: "support@stephaniekayephotography.com",
      name: "Stephanie Kaye Photography",
    };

    // System/neutral sender (use MailerSend verified domain, e.g. mailersend.net)
    const fromSystem: Sender = {
      email: "nathan@stephaniekayephotography.com", // ⚡ must be verified in MailerSend
      name: "Photography Notifications",
    };

    // --- Recipients ---
    const client: Recipient[] = [
      {
        email,
        name,
      },
    ];

    const admin: Recipient[] = [
      {
        email: "nathan@stephaniekayephotography.com",
        name: "Nathan Walker",
      },
    ];

    // --- Email to client (confirmation) ---
    const clientEmail = new EmailParams()
      .setFrom(fromSupport)
      .setTo(client)
      .setSubject("📸 Thanks for contacting Stephanie Kaye Photography!")
      .setText(
        `Hi ${name},\n\nThank you for reaching out about the ${pkg} package.\n\nWe’ll get back to you shortly!\n\nBest,\nStephanie`
      );

    // --- Email to admin (notification) ---
    const adminEmail = new EmailParams()
      .setFrom(fromSystem)
      .setTo(admin)
      .setSubject(`📩 New contact form submission from ${name}`)
      .setText(
        `From: ${name} <${email}>\n\nPackage: ${pkg}\n\nQuestions: ${questions || "N/A"}`
      );

    // --- Send both emails ---
    const [clientRes, adminRes] = await Promise.all([
      mailerSend.email.send(clientEmail),
      mailerSend.email.send(adminEmail),
    ]);

    return NextResponse.json(
      { success: true, clientRes, adminRes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
