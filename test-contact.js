const axios = require("axios");
require("dotenv").config({ path: ".env.local" });

const BREVO_API_URL = "https://api.brevo.com/v3";
const BREVO_HEADERS = {
  "api-key": process.env.BREVO_API_KEY,
  "Content-Type": "application/json",
};

async function testAddContact() {
  const testEmail = "test@example.com";
  const listId = parseInt(process.env.BREVO_LIST_ID);

  console.log(`🧪 Testing: Adding ${testEmail} to list ${listId}`);

  const contactData = {
    email: testEmail,
    attributes: {
      FIRSTNAME: "Test",
      LASTNAME: "User",
    },
    listIds: [listId],
    updateEnabled: true,
  };

  console.log("📤 Sending data:", JSON.stringify(contactData, null, 2));

  try {
    const response = await axios.post(
      `${BREVO_API_URL}/contacts`,
      contactData,
      {
        headers: BREVO_HEADERS,
      }
    );

    console.log(
      "✅ Success! Response:",
      JSON.stringify(response.data, null, 2)
    );

    console.log("\n🔍 Checking if contact was added to list...");
    const contactsResponse = await axios.get(
      `${BREVO_API_URL}/contacts?listIds=${listId}&limit=10`,
      {
        headers: BREVO_HEADERS,
      }
    );

    console.log("📋 Contacts in list:");
    if (
      contactsResponse.data.contacts &&
      contactsResponse.data.contacts.length > 0
    ) {
      contactsResponse.data.contacts.forEach((contact) => {
        console.log(`  📧 ${contact.email} (ID: ${contact.id})`);
      });
    } else {
      console.log("  ❌ No contacts found in list");
    }
  } catch (error) {
    console.error("❌ Error:", JSON.stringify(error.response?.data, null, 2));
  }
}

testAddContact();
