import { NextRequest, NextResponse } from "next/server";
import { ServerClient } from "postmark";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.parse(body);

    const { name, email, package: pkg, questions } = parsed;

    const client = new ServerClient(process.env.POSTMARK_API_KEY as string);

    // --- Email to client ---
    const clientEmail = {
      From: "support@stephaniekayephotography.com", // must be verified in Postmark
      To: email,
      Subject: "📸 Thanks for contacting Stephanie Kaye Photography!",
      TextBody: `Hi ${name},\n\nThank you for reaching out about the ${pkg} package.\n\nWe’ll get back to you shortly!\n\nBest,\nStephanie`,
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
          <h2 style="color:#444;">Hi ${name},</h2>
          <p>Thank you for reaching out about the <strong>${pkg}</strong> package.</p>
          <p>We’ll get back to you shortly with more details!</p>
          <br />
          <p>Warmly,<br/>Stephanie Kaye Photography</p>
          <hr style="margin-top:20px;"/>
          <p style="font-size:12px;color:#777;">This is an automated confirmation. Please don’t reply directly to this email.</p>
        </div>
      `,
    };

    // --- Email to admin (you) ---
    const adminEmail = {
      From: "support@stephaniekayephotography.com", // must be verified
      To: "nathan@stephaniekayephotography.com",
      Subject: `📩 New contact form submission from ${name}`,
      TextBody: `From: ${name} <${email}>\n\nPackage: ${pkg}\n\nQuestions: ${
        questions || "N/A"
      }`,
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
          <h3>📩 New Contact Form Submission</h3>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Package:</strong> ${pkg}</p>
          <p><strong>Questions:</strong><br/>${questions || "N/A"}</p>
        </div>
      `,
    };

    // Send both emails in parallel
    const [clientRes, adminRes] = await Promise.all([
      client.sendEmail(clientEmail),
      client.sendEmail(adminEmail),
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
