import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

export async function POST(req: NextRequest) {
  try {
    // --- Validate body with Zod schema ---
    const body = await req.json();
    const parsed = contactFormSchema.parse(body);
    const { name, email, package: pkg, questions } = parsed as ContactFormData;

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY as string,
    });

    // --- From address (MUST be verified in MailerSend) ---
    const from = new Sender(
      "support@stephaniekayephotography.com", // must be verified in MailerSend
      "Stephanie Kaye Photography"
    );

    // --- 1. Notification email to you (Nathan) ---
    const notifyEmailParams = new EmailParams()
      .setFrom(from)
      .setTo([new Recipient("nathan@stephaniekayephotography.com", "Nathan Walker")])
      .setSubject(`📩 New Contact Form Submission from ${name}`)
      .setText(
        `You received a new contact form message:\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Package: ${pkg}\n` +
          `Questions: ${questions || "None"}\n`
      )
      .setHtml(`
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Package:</strong> ${pkg}</p>
        <p><strong>Questions:</strong> ${questions || "None"}</p>
      `);

    // --- 2. Confirmation email to client ---
    const confirmEmailParams = new EmailParams()
      .setFrom(from)
      .setTo([new Recipient(email, name)])
      .setSubject("✅ We received your message!")
      .setText(
        `Hi ${name},\n\n` +
          `Thanks for reaching out to Stephanie Kaye Photography! We’ve received your message and will get back to you soon.\n\n` +
          `Here’s what you sent:\n` +
          `Package: ${pkg}\n` +
          `Questions: ${questions || "None"}\n\n` +
          `— Stephanie Kaye Photography`
      )
      .setHtml(`
        <h1>Thank you for contacting Stephanie Kaye Photography!</h1>
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! We’ve received your message and will get back to you soon.</p>
        <h2>Your Submission:</h2>
        <p><strong>Package:</strong> ${pkg}</p>
        <p><strong>Questions:</strong> ${questions || "None"}</p>
        <br/>
        <p>— Stephanie Kaye Photography</p>
      `);

    // --- Send both emails ---
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
