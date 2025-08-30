import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import postmark from "postmark";

// Zod schema for validation
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  package: z.string().min(1, "Package selection is required"),
  questions: z.string().optional(),
  honey: z.string().optional(),
});

// Admin email
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

// Initialize Postmark client
const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.honey) {
      return NextResponse.json({ success: false, error: "Spam detected" }, { status: 400 });
    }

    // Validate input
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.errors }, { status: 400 });
    }

    const { name, email, package: pkg, questions } = parsed.data;

    // Send email to admin
    await client.sendEmail({
      From: email,
      To: ADMIN_EMAIL,
      Subject: `New contact form submission from ${name}`,
      HtmlBody: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Package:</strong> ${pkg}</p>
                 <p><strong>Questions:</strong> ${questions}</p>`,
    });

    // Send confirmation email to user
    await client.sendEmail({
      From: ADMIN_EMAIL,
      To: email,
      Subject: "Thank you for contacting us!",
      HtmlBody: `<p>Hi ${name},</p>
                 <p>Thanks for reaching out! We received your message regarding the ${pkg} package and will get back to you shortly.</p>
                 <p>— Admin</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
