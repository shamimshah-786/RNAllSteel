import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * - Receives: { name, email, phone, service, message, website (honeypot) }
 * - Sends a nicely formatted HTML email using nodemailer
 *
 * Required environment variables (set in your hosting env or .env.local):
 *   SMTP_HOST
 *   SMTP_PORT
 *   SMTP_USER
 *   SMTP_PASS
 *   CONTACT_TO_EMAIL   (destination email)
 *   SMTP_FROM_EMAIL    (optional; used as From header)
 *
 * Note: Do NOT expose these variables to the client. This file runs on the server.
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

    // honeypot => reject quietly
    if (website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // required fields
    if (!name || !phone || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // limit message length
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      SMTP_FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error('SMTP environment variables missing');
      return NextResponse.json({ error: 'Email not configured on server' }, { status: 500 });
    }

    // create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465, // true for 465
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // plain text fallback
    const text = [
      `Service: ${service}`,
      `Name: ${name}`,
      `Email: ${email || '—'}`,
      `Phone: ${phone}`,
      '',
      `Message:`,
      `${message}`,
      '',
      `Received: ${new Date().toLocaleString()}`,
    ].join('\n');

    // nice HTML template (responsive, simple)
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial; color:#0f172a; line-height:1.4;">
        <div style="max-width:700px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #e6eef8">
          <div style="background:linear-gradient(90deg,#0369a1,#0ea5a9);padding:20px;color:white;">
            <h2 style="margin:0;font-size:18px;font-weight:700;">New Quote Request — ${service}</h2>
            <p style="margin:6px 0 0 0;font-size:13px;opacity:0.95">From: ${name} — received ${new Date().toLocaleString()}</p>
          </div>

          <div style="padding:18px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
              <tr>
                <td style="padding:8px 0;font-weight:600;width:110px;color:#334155">Name</td>
                <td style="padding:8px 0;color:#0f172a">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-weight:600;color:#334155">Phone</td>
                <td style="padding:8px 0;color:#0f172a">${phone}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-weight:600;color:#334155">Email</td>
                <td style="padding:8px 0;color:#0f172a">${email || '—'}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-weight:600;color:#334155">Service</td>
                <td style="padding:8px 0;color:#0f172a">${service}</td>
              </tr>
            </table>

            <div style="padding:12px;background:#f8fafc;border-radius:8px;border:1px solid #eef2ff;color:#0f172a;">
              <strong style="display:block;margin-bottom:6px;color:#0f172a">Message</strong>
              <div style="white-space:pre-wrap;font-size:14px;color:#0f172a">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </div>

            <div style="margin-top:14px;font-size:12px;color:#64748b">
              <p style="margin:0">This message was sent from the website contact form.</p>
            </div>
          </div>

          <div style="background:#f1f5f9;padding:12px;text-align:center;font-size:12px;color:#94a3b8">
            RN All Steel Fabrication — Mumbai & Thane
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: SMTP_FROM_EMAIL || `"RN All Steel" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      subject: `Quote Request: ${service} — ${name}`,
      text,
      html,
      replyTo: email || undefined,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Your request has been sent. We will contact you soon.' }, { status: 200 });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}