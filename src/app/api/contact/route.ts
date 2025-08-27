import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY as string,
});

// Replace with your MailerSend admin email (the one tied to your account)
const ADMIN_EMAIL = "your-admin-email@example.com";

// Real recipient (blocked in trial, but we’ll forward info into the email body)
const REAL_RECIPIENT = "nathan@stephaniekayephotography.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Always send to your admin email during trial
    const recipients: Recipient[] = [
      new Recipient(ADMIN_EMAIL, "Admin Inbox"),
    ];

    const emailParams = new EmailParams()
      .setFrom("no-reply@stephaniekayephotography.com") // must be verified domain
      .setTo(recipients)
      .setSubject(`📩 Contact Form (intended for: ${REAL_RECIPIENT})`)
      .setText(`From: ${name} <${email}>\n\nMessage:\n${message}\n\n---\nThis message was intended for: ${REAL_RECIPIENT}`);

    await mailerSend.email.send(emailParams);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
