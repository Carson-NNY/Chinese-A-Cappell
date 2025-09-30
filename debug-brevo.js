const axios = require("axios");
require("dotenv").config({ path: ".env.local" });

const BREVO_API_URL = "https://api.brevo.com/v3";
const BREVO_HEADERS = {
  "api-key": process.env.BREVO_API_KEY,
  "Content-Type": "application/json",
};

async function debugBrevoSetup() {
  console.log("🔍 Debugging Brevo Setup...\n");

  console.log("📝 Environment Variables:");
  console.log(
    `BREVO_API_KEY: ${process.env.BREVO_API_KEY ? "✅ Set" : "❌ Missing"}`
  );
  console.log(`BREVO_SENDER_EMAIL: ${process.env.BREVO_SENDER_EMAIL}`);
  console.log(`BREVO_LIST_ID: ${process.env.BREVO_LIST_ID}`);
  console.log("");

  if (!process.env.BREVO_API_KEY) {
    console.log(
      "❌ Please set up your .env.local file with your Brevo credentials"
    );
    return;
  }

  try {
    console.log("🔗 Testing Brevo API connection...");
    const accountResponse = await axios.get(`${BREVO_API_URL}/account`, {
      headers: BREVO_HEADERS,
    });
    console.log("✅ Connected to Brevo successfully");
    console.log(
      `Account: ${accountResponse.data.firstName} ${accountResponse.data.lastName}`
    );
    console.log("");

    console.log("📋 Your Brevo Contact Lists:");
    const listsResponse = await axios.get(`${BREVO_API_URL}/contacts/lists`, {
      headers: BREVO_HEADERS,
    });

    if (listsResponse.data.lists && listsResponse.data.lists.length > 0) {
      listsResponse.data.lists.forEach((list) => {
        console.log(
          `  List ID: ${list.id} | Name: "${list.name}" | Contacts: ${
            list.totalBlacklisted + list.totalSubscribers
          }`
        );
      });
    } else {
      console.log("  No contact lists found");
    }
    console.log("");

    const listId = process.env.BREVO_LIST_ID;
    if (listId) {
      console.log(`🎯 Checking List ID ${listId}:`);
      try {
        const listResponse = await axios.get(
          `${BREVO_API_URL}/contacts/lists/${listId}`,
          {
            headers: BREVO_HEADERS,
          }
        );
        console.log(`✅ List "${listResponse.data.name}" found`);
        console.log(
          `   Total contacts: ${
            listResponse.data.totalBlacklisted +
            listResponse.data.totalSubscribers
          }`
        );
        console.log(`   Subscribers: ${listResponse.data.totalSubscribers}`);
        console.log("");

        console.log(`📧 Recent contacts in list ${listId}:`);
        const contactsResponse = await axios.get(
          `${BREVO_API_URL}/contacts?listIds=${listId}&limit=10`,
          {
            headers: BREVO_HEADERS,
          }
        );

        if (
          contactsResponse.data.contacts &&
          contactsResponse.data.contacts.length > 0
        ) {
          contactsResponse.data.contacts.forEach((contact) => {
            console.log(`  📩 ${contact.email} (ID: ${contact.id})`);
          });
        } else {
          console.log("  No contacts found in this list");
        }
      } catch (listError) {
        console.log(`❌ List ID ${listId} not found or not accessible`);
        console.log(
          "Available lists shown above - please check your BREVO_LIST_ID"
        );
      }
    }
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

debugBrevoSetup();
