import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

function rateLimit(ip: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const currentTime = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
    return { allowed: true };
  }

  if (currentTime - record.lastRequest > windowMs) {
    // Reset count and timestamp after window expires
    rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
    return { allowed: true };
  }

  if (record.count >= limit) {
    return { allowed: false, retryAfter: (windowMs - (currentTime - record.lastRequest)) / 1000 };
  }

  record.count += 1;
  rateLimitMap.set(ip, record);
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  // Get IP address (common behind proxies)
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // Apply rate limiting
  const limitResult = rateLimit(ip);
  if (!limitResult.allowed) {
    const retrySeconds = limitResult.retryAfter ?? 0;
    return NextResponse.json(
      { error: `Too many requests. Try again in ${Math.ceil(retrySeconds)} seconds.` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, package: selectedPackage, questions, honey } = body;

    // Honeypot field check for spam
    if (honey && honey.trim() !== "") {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!name || !email || !selectedPackage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email via Resend
    await resend.emails.send({
      from: 'Real Estate Inquiries <support@stephaniekayephotography.com>',
      to: 'stephanie@stephaniekayephotography.com', // Change to your receiving email
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Package:</strong> ${selectedPackage}</p>
        <p><strong>Message:</strong><br>${questions || 'N/A'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[RESEND ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}