// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

export async function POST(req: Request) {
  try {
    const formData: {
      name: string;
      email: string;
      package: string;
      questions?: string;
      honey?: string;
    } = await req.json();

    // --- Honeypot spam check ---
    if (formData.honey && formData.honey.trim() !== "") {
      return NextResponse.json({ success: true, message: "Ignored spam bot." });
    }

    // --- Setup MailerSend client ---
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY!,
    });

    const sentFrom = new Sender(
      "no-reply@stephaniekayephotography.com", // must match verified MailerSend sender domain
      "Stephanie Kaye Photography"
    );

    // ----------- 📩 Email to You (Notification) -----------
    const notifyEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo([
        new Recipient("nathan@stephaniekayephotography.com", "Nathan"),
      ])
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

    // ----------- 📩 Confirmation Email to User -----------
    const confirmationEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient(formData.email, formData.name)])
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

    // --- Send both emails ---
    await mailerSend.email.send(notifyEmail);
    await mailerSend.email.send(confirmationEmail);

    return NextResponse.json({ success: true, message: "Emails sent!" });
  } catch (error: any) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send emails" },
      { status: 500 }
    );
  }
}
