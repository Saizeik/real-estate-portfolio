import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

if (!process.env.MAILERSEND_API_KEY) {
  throw new Error("Missing MAILERSEND_API_KEY in environment variables");
}

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

async function checkDomainStatus(domain: string) {
  try {
    const domains = await mailersend.domains.list();
    const matched = domains.find(d => d.domain === domain);
    if (!matched) {
      console.warn(`⚠️ Domain "${domain}" is not added in MailerSend.`);
      return false;
    }
    if (!matched.verified) {
      console.warn(`⚠️ Domain "${domain}" is added but not verified.`);
    }
    if (!matched.dkim_valid) {
      console.warn(`⚠️ DKIM is not valid for domain "${domain}". Emails may be rejected.`);
    }
    if (!matched.spf_valid) {
      console.warn(`⚠️ SPF is not valid for domain "${domain}". Emails may be rejected.`);
    }
    return matched.verified && matched.dkim_valid && matched.spf_valid;
  } catch (err) {
    console.error("Error checking domain status:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData = contactFormSchema.parse(body) as ContactFormData;

    // Honeypot spam check
    if (formData.honey) {
      return NextResponse.json({ success: true });
    }

    // Check domain readiness
    const domain = "stephaniekayephotography.com";
    const domainReady = await checkDomainStatus(domain);
    if (!domainReady) {
      console.warn(
        `⚠️ Emails may fail sending because "${domain}" is not fully verified or DKIM/SPF not set correctly.`
      );
    }

    const sentFrom = new Sender(
      `support@${domain}`,
      "Stephanie Kaye Photography"
    );

    // ----------- 📩 Email to You -----------
    const notifyEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo(new Recipient("nathan@stephaniekayephotography.com", "Nathan"))
      .setReplyTo(new Recipient(formData.email, formData.name))
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
      .setTo(new Recipient(formData.email, formData.name))
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
