import { NextResponse } from "next/server";
import { z } from "zod";
import { ServerClient } from "postmark";

// Initialize Postmark client
const client = new ServerClient(process.env.POSTMARK_API_KEY!);

// Validation schema
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    // Send email via Postmark
    await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL!,
      To: process.env.POSTMARK_TO_EMAIL!,
      Subject: `New Contact Form Submission from ${name}`,
      TextBody: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      MessageStream: "outbound", // default stream
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
