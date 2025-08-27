import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY as string,
    });

    // --- Sender (must be verified in MailerSend) ---
    const from: Sender = {
      email: "no-reply@stephaniekayephotography.com",
      name: "Website Contact",
    };

    // --- Recipient(s) ---
    const REAL_RECIPIENT = "nathan@stephaniekayephotography.com";
    const recipients: Recipient[] = [
      {
        email: REAL_RECIPIENT,
        name: "Nathan Walker", // optional, can be left empty
      },
    ];

    // --- Email params ---
    const emailParams = new EmailParams()
      .setFrom(from)
      .setTo(recipients)
      .setSubject(`📩 Contact Form (intended for: ${REAL_RECIPIENT})`)
      .setText(
        `From: ${name} <${email}>\n\nMessage:\n${message}\n\n---\nThis message was intended for: ${REAL_RECIPIENT}`
      );

    // --- Send the email ---
    const response = await mailerSend.email.send(emailParams);

    return new Response(
      JSON.stringify({ success: true, response }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return new Response(
      JSON.stringify({ success: false, error }),
      { status: 500 }
    );
  }
}
