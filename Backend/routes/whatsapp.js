const express = require('express');
const twilio = require('twilio');
const User = require('../models/Users.js');
const Message = require('../models/Messages.js');
const router = express.Router();

require('dotenv').config();

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send a message through WhatsApp via Twilio
router.post('/send-message', async (req, res) => {
  const { to, message, mediaUrl } = req.body;

  try {
    // Send message through Twilio
    let response;
    if (mediaUrl) {
      response = await client.messages.create({
        body: message,
        from: `whatsapp:+14155238886`,
        to: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
        mediaUrl: mediaUrl,
      });
    } else {
      response = await client.messages.create({
        body: message,
        from: `whatsapp:+14155238886`,
        to: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      });
    }

    // Save the message to the database
    const newMessage = new Message({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to,
      message,
      mediaUrl,
    });
    await newMessage.save();

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 345');
  }
});

// Webhook to receive incoming messages via Twilio
router.post('/webhook', async (req, res) => {
  const { From, Body } = req.body;

  try {
    // Save the received message to the database
    const newMessage = new Message({
      from: From.replace('whatsapp:', ''),
      to: process.env.TWILIO_WHATSAPP_NUMBER,
      message: Body,
    });
    await newMessage.save();

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
