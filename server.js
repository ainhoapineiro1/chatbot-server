import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

// Environment variables
const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, NUMBER_ID } = process.env;

// Handle incoming webhook messages
app.post("/webhook", async (req, res) => {
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (message?.type === "text") {
    const businessPhoneNumberId =
      req.body.entry[0].changes[0].value.metadata.phone_number_id;

    try {
      // Send a reply message
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v21.0/${businessPhoneNumberId}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          text: { body: "Echo: " + message.text.body },
        },
      });

      // Mark the message as read
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${businessPhoneNumberId}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id,
        },
      });
    } catch (error) {
      console.error("Error handling message:", error.response?.data || error.message);
    }
  }

  res.sendStatus(200);
});

// Webhook verification endpoint
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Default route
app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here. Refer to README.md for setup instructions.</pre>`);
});

// Default route
app.get("/hello", (req, res) => {
  res.send(`<pre>HELLO</pre>`);
});


// Start the server
app.listen(PORT || 3001, () => {
  console.log(`Server is listening on port ${PORT || 3001}`);
});
