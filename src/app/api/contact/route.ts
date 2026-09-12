import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, website, service, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ error: "Message must be at least 5 characters long." }, { status: 400 });
    }

    const emailTo = process.env.EMAIL_TO || "sunilbohara3000@gmail.com";
    const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_SERVICE_API_KEY;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #059669; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">New SEO Consultation Enquiry</h2>
        <p style="font-size: 14px; color: #475569;">You have received a new consultation request through your portfolio website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px; color: #1e293b;">Client Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e293b;">Client Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e293b;">Website / Company:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;">${escapeHtml(website || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e293b;">Requested Service:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #059669; font-weight: 600;">${escapeHtml(service || "General SEO Consultation")}</td>
          </tr>
        </table>

        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h4 style="margin-top: 0; color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message Details:</h4>
          <p style="white-space: pre-line; color: #334155; font-size: 14px; line-height: 1.6; margin-bottom: 0;">${escapeHtml(message)}</p>
        </div>

        <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; text-align: center;">
          Sent from Sunil Kumar Bohara — SEO Executive Portfolio Website
        </p>
      </div>
    `;

    // If SMTP credentials are configured, dispatch via Nodemailer
    if (emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: emailTo,
        subject: `New SEO Enquiry from ${name} [${service || "SEO"}]`,
        html: emailHtml,
      });

      return NextResponse.json({ success: true, message: "Enquiry sent directly to Sunil's inbox." });
    }

    // Dev/Local fallback when environment credentials are not yet supplied
    console.log("=== [CONTACT FORM ENQUIRY RECEIVED] ===");
    console.log({ name, email, website, service, message, recipient: emailTo });
    console.log("To activate live Gmail transport, configure EMAIL_USER and EMAIL_PASS in .env.local");

    return NextResponse.json({
      success: true,
      mode: "simulated",
      message: "Enquiry recorded successfully! (Configure EMAIL_USER and EMAIL_PASS for live SMTP dispatch)",
    });
  } catch (err: any) {
    console.error("Error processing contact form:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process enquiry. Please try again or email directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
