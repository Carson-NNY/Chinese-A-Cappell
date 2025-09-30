import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BREVO_API_URL = "https://api.brevo.com/v3";
const BREVO_HEADERS = {
  "api-key": process.env.BREVO_API_KEY!,
  "Content-Type": "application/json",
};

const createSubscriptionEmail = (email: string) => {
  return {
    sender: {
      name: "Columbia Chinese A Cappella",
      email: process.env.BREVO_SENDER_EMAIL!,
    },
    to: [{ email: email }],
    subject: "Welcome to Columbia Chinese A Cappella!",
    htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">Welcome to Columbia Chinese A Cappella!</h2>
            <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
            <ul>
                <li>Upcoming performances and concerts</li>
                <li>Audition information</li>
                <li>Cultural events and activities</li>
                <li>New music releases</li>
            </ul>
            <p>We're excited to share our musical journey with you!</p>
            <hr style="margin: 20px 0;">
            <p style="color: #7f8c8d; font-size: 12px;">
                Columbia University Chinese A Cappella<br>
                New York, NY 10027<br>
                Email: cca@columbia.edu
            </p>
        </div>
    `,
  };
};

const createAdminNotificationEmail = (email: string) => {
  return {
    sender: {
      name: "Columbia Chinese A Cappella",
      email: process.env.BREVO_SENDER_EMAIL!,
    },
    to: [{ email: process.env.ADMIN_EMAIL || process.env.BREVO_SENDER_EMAIL! }],
    subject: "New Newsletter Subscription",
    htmlContent: `
        <div style="font-family: Arial, sans-serif;">
            <h3>New Newsletter Subscription</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
    `,
  };
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        },
        { status: 500 }
      );
    }

    const listId = parseInt(process.env.BREVO_LIST_ID || "3");

    const contactData = {
      email: email,
      attributes: {
        FIRSTNAME: "",
        LASTNAME: "",
      },
      listIds: [listId],
      updateEnabled: true,
    };

    try {
      const response = await axios.post(
        `${BREVO_API_URL}/contacts`,
        contactData,
        {
          headers: BREVO_HEADERS,
        }
      );
      console.log(
        `Contact ${email} added to Brevo list ${listId} successfully`
      );
    } catch (contactError: any) {
      console.log(
        "Full error response:",
        JSON.stringify(contactError.response?.data, null, 2)
      );

      if (
        contactError.response?.status === 400 &&
        contactError.response?.data?.message?.includes("Contact already exist")
      ) {
        console.log(`Contact ${email} already exists, trying to update...`);

        try {
          const updateResponse = await axios.put(
            `${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`,
            {
              listIds: [listId],
              unlinkListIds: [],
            },
            {
              headers: BREVO_HEADERS,
            }
          );
          console.log(`Contact ${email} updated and added to list ${listId}`);
          console.log(
            "Update response:",
            JSON.stringify(updateResponse.data, null, 2)
          );
        } catch (updateError: any) {
          console.error(
            "Error updating contact:",
            JSON.stringify(updateError.response?.data, null, 2)
          );
          throw updateError;
        }
      } else {
        console.error(
          "Error adding contact to Brevo:",
          JSON.stringify(contactError.response?.data, null, 2)
        );
        throw contactError;
      }
    }

    const subscriberEmail = createSubscriptionEmail(email);
    await axios.post(`${BREVO_API_URL}/smtp/email`, subscriberEmail, {
      headers: BREVO_HEADERS,
    });

    const adminEmail = createAdminNotificationEmail(email);
    await axios.post(`${BREVO_API_URL}/smtp/email`, adminEmail, {
      headers: BREVO_HEADERS,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed! Check your email for confirmation.",
    });
  } catch (error: any) {
    console.error("Subscription error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process subscription. Please try again later.",
      },
      { status: 500 }
    );
  }
}
