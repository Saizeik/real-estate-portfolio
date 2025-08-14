import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, package: selectedPackage, questions, honey } = body;

    // Honeypot check
    if (honey && honey.trim() !== "") {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!name || !email || !selectedPackage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Sending email with data:", { name, email, selectedPackage, questions });

    // Send email via Resend
    await resend.emails.send({
      from: "Real Estate Inquiries <support@stephaniekayephotography.com>",
      to: "stephanie@stephaniekayephotography.com",
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Package:</strong> ${selectedPackage}</p>
        <p><strong>Message:</strong><br>${questions || "N/A"}</p>
      `,
    });

    console.log("Email sent successfully!");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[RESEND ERROR]", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}