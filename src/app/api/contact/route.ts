// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { contactFormSchema, type ContactFormData } from "@/types/contact";
import { Client } from "postmark";

// Initialize Postmark client
const client = new Client(process.env.POSTMARK_API_TOKEN!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      // Return structured field errors
      const fieldErrors = parsed.error.format();
      return NextResponse.json(
        { success: false, errors: fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, package: pkg, questions } = parsed.data;

    // --- Send Admin Email ---
    await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL!, // your verified sender
      To: process.env.POSTMARK_ADMIN!,    // admin email
      Subject: `New Contact Form Submission from ${name}`,
      TextBody: `Name: ${name}\nEmail: ${email}\nPackage: ${pkg}\nQuestions: ${questions}`,
    });

    // --- Send User Confirmation Email (only if email is valid) ---
    if (email && email.trim() !== "") {
      await client.sendEmail({
        From: process.env.POSTMARK_FROM_EMAIL!,
        To: email,
        Subject: "📸 Thanks for contacting us!",
        TextBody: `Hi ${name},\n\nThank you for reaching out! We received your message and will get back to you shortly.\n\nYour message:\n${questions}\n\n- The Team`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
