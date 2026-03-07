import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BREVO_API_URL = "https://api.brevo.com/v3";
const BREVO_HEADERS = {
  "api-key": process.env.BREVO_API_KEY!,
  "Content-Type": "application/json",
};

const createDonorNotificationEmail = (contactInfo: string) => {
  return {
    sender: {
      name: "Columbia Chinese A Cappella",
      email: process.env.BREVO_SENDER_EMAIL!,
    },
    to: [
      { email: process.env.DONATE_EMAIL || process.env.BREVO_SENDER_EMAIL! },
    ],
    subject: "New Donation Inquiry",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">New Donation Inquiry</h2>
        <p>Someone has expressed interest in donating to Columbia Chinese A Cappella.</p>
        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 16px; font-weight: bold; color: #2c3e50;">Contact Info:</td>
            <td style="padding: 8px 16px;">${contactInfo}</td>
          </tr>
          <tr>
            <td style="padding: 8px 16px; font-weight: bold; color: #2c3e50;">Date:</td>
            <td style="padding: 8px 16px;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        <p>Please reach out to this person at your earliest convenience.</p>
        <hr style="margin: 20px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          This is an automated notification from the CUCAC website donation page.
        </p>
      </div>
    `,
  };
};

export async function POST(request: NextRequest) {
  try {
    const { contactInfo } = await request.json();

    if (!contactInfo || !contactInfo.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide your contact information." },
        { status: 400 }
      );
    }

    if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 }
      );
    }

    const emailData = createDonorNotificationEmail(contactInfo.trim());
    await axios.post(`${BREVO_API_URL}/smtp/email`, emailData, {
      headers: BREVO_HEADERS,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch soon.",
    });
  } catch (error: any) {
    console.error(
      "Donate notification error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
