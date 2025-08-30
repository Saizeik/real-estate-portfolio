// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactFormSchema, type ContactFormData } from "@/types/contact";
import postmark from "postmark";

// Initialize Postmark client (use Server API Token from Postmark dashboard)
const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate against your schema
    const parsed = contactFormSchema.parse(body) as ContactFormData;

    // Prevent spam via hidden honey field
    if (parsed.honey) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Email to the user (confirmation copy)
    const clientEmail = {
      From: "support@stephaniekayephotography.com", // must be verified in Postmark
      To: parsed.email,
      Subject: "📸 Thanks for contacting Stephanie Kaye Photography!",
      TextBody: `Hi ${parsed.name},

Thank you for reaching out about the ${parsed.package} package.
We’ll be in touch soon!`,
    };

    // Email to admin (notification)
    const adminEmail = {
      From: "support@stephaniekayephotography.com", // must be verified in Postmark
      To: "nathan@stephaniekayephotography.com",
      Subject: `New inquiry from ${parsed.name}`,
      TextBody: `Name: ${parsed.name}
Email: ${parsed.email}
Package: ${parsed.package}
Questions: ${parsed.questions || "None"}`,
    };

    // Try sending both at once
    const [clientRes, adminRes] = await Promise.allSettled([
      client.sendEmail(clientEmail),
      client.sendEmail(adminEmail),
    ]);

    return NextResponse.json(
      { success: true, clientRes, adminRes },
      { status: 200 }
    );
  } catch (error: any) {
    // Postmark often nests errors under Error.details or Error.message
    console.error(
      "Error in /api/contact:",
      error?.message || error?.ErrorCode || error
    );

    return NextResponse.json(
      { success: false, error: error?.message || error },
      { status: 500 }
    );
  }
}
