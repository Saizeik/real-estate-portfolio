import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

export async function POST(req: NextRequest) {
  try {
    // --- Validate body with Zod schema ---
    const body = await req.json();
    const parsed = contactFormSchema.parse(body);
    const { name, email, message } = parsed as ContactFormData;

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY as string,
    });

    // --- From address (MUST be verified in MailerSend) ---
    const from = new Sender(
      "support@stephaniekayephotography.com", // replace with your verified domain
      "Stephanie Kaye Photography"
    );

    // --- 1. Notification email to you (Nathan) ---
    const notifyEmailParams = new EmailParams()
      .setFrom(from)
      .setTo([new Recipient("nathan@stephaniekayephotography.com", "Nathan Walker")])
      .setSubject(`📩 New Contact Form Submission from ${name}`)
      .setText(
        `You received a new contact form message:\n\n` +
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
      );

    // --- 2. Confirmation email to client ---
    const confirmEmailParams = new EmailParams()
      .setFrom(from)
      .setTo([new Recipient(email, name)])
      .setSubject("✅ We received your message!")
      .setText(
        `Hi ${name},\n\n` +
        `Thanks for reaching out to Stephanie Kaye Photography! We’ve received your message and will get back to you soon.\n\n` +
        `Here’s a copy of what you sent:\n\n${message}\n\n` +
        `— Stephanie Kaye Photography`
      );

    // --- Send both emails separately ---
    const [notifyRes, confirmRes] = await Promise.all([
      mailerSend.email.send(notifyEmailParams),
      mailerSend.email.send(confirmEmailParams),
    ]);

    return NextResponse.json(
      { success: true, notifyRes, confirmRes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
