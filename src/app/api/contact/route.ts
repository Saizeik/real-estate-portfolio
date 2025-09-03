import { NextResponse } from "next/server";
import { contactFormSchema } from "@/types/contact";
import { Client } from "postmark";

const client = new Client(process.env.POSTMARK_API_TOKEN!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, package: pkg, questions } = parsed.data;

    // Ensure user email is provided
    if (!email || email.trim() === "") {
      return NextResponse.json(
        { success: false, error: "User email is required" },
        { status: 400 }
      );
    }

    // --- Send Admin Email ---
    await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL!,
      To: process.env.POSTMARK_ADMIN!, // admin copy
      Subject: `New Contact Form Submission from ${name}`,
      TextBody: `Name: ${name}\nEmail: ${email}\nPackage: ${pkg}\nQuestions: ${questions}`,
    });

    // --- Send Confirmation Email to User ---
    await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL!,
      To: email,
      Subject: "📸 Thanks for contacting us!",
      TextBody: `Hi ${name},\n\nThank you for reaching out! We received your message.\n\nYour message:\nPackage: ${pkg}\nQuestions: ${questions}\n\n- The Team`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
