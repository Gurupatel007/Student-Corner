// services/smsService.js
const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = new twilio(accountSid, authToken);

function sendSMS(to, body) {
  return client.messages.create({
    body,
    from: "+12563635932",
    to,
  });
}

module.exports = { sendSMS };
