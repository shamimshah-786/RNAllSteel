import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 *
 * Expects JSON:
 * {
 *   name, email, phone, service, message, website(honeypot)
 * }
 *
 * Environment variables required:
 * - SMTP_HOST
 * - SMTP_PORT (number)
 * - SMTP_USER
 * - SMTP_PASS
 * - CONTACT_TO_EMAIL   (the destination email where you want to receive messages)
 * - SMTP_FROM_EMAIL    (optional; used as From header, e.g., 'no-reply@yourdomain.com')
 *
 * Notes:
 * - Keep credentials in your environment (e.g., Vercel dashboard, .env for local dev).
 * - This route uses Next.js App Router route handler (route.js).
 */

function safeString(v) {
  if (!v && v !== 0) return '';
  return String(v).trim();
}

export async function POST(req) {
  try {
    const body = await req.json();

    const name = safeString(body.name);
    const email = safeString(body.email);
    const phone = safeString(body.phone);
    const service = safeString(body.service);
    const message = safeString(body.message);
    const website = safeString(body.website); // honeypot

    // basic server-side validation
    if (website) {
      // honeypot filled -> likely spam
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    if (!name || !phone || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // limit sizes
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    // prepare email content (HTML + plaintext)
    const subject = `New contact request: ${service} — ${name}`;
    const text = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message:
${message}
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
          New Contact Request - RN Steel Works
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151; width: 100px;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 8px;">${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151;">Phone:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151;">Service:</td>
              <td style="padding: 8px;">${service || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #1e40af;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Message:</h3>
          <p style="margin: 0; white-space: pre-line;">${message}</p>
        </div>

        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          Sent from RN Steel Works Contact Form • ${new Date().toLocaleString('en-IN')}
        </div>
      </div>
    `;
    // Read SMTP config from env
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      SMTP_FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error('Missing SMTP environment variables');
      return NextResponse.json({ error: 'Server not configured to send email' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465, // true for port 465, false for others
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: SMTP_FROM_EMAIL || `"RN All Steel" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      subject,
      text,
      html,
      replyTo: email || undefined,
    };

    // send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}