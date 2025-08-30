import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as postmark from "postmark"; // fixed import

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  package: z.string().min(1, "Package selection is required"),
  questions: z.string().optional(),
  honey: z.string().optional(),
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.honey) {
      return NextResponse.json({ success: false, error: "Spam detected" }, { status: 400 });
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      // format Zod errors
      const formattedErrors = parsed.error.format();
      return NextResponse.json({ success: false, errors: formattedErrors }, { status: 400 });
    }

    const { name, email, package: pkg, questions } = parsed.data;

    await client.sendEmail({
      From: email,
      To: ADMIN_EMAIL,
      Subject: `New contact form submission from ${name}`,
      HtmlBody: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Package:</strong> ${pkg}</p>
                 <p><strong>Questions:</strong> ${questions}</p>`,
    });

    await client.sendEmail({
      From: ADMIN_EMAIL,
      To: email,
      Subject: " 📸 Thank you for contacting us!",
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
