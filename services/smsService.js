// services/smsService.js
const twilio = require("twilio");

const accountSid = "AC24848a8592f93068fc9c8c93e1244e3c";
const authToken = "e215b9672cae55971f203d116a33eefc";
const client = new twilio(accountSid, authToken);

function sendSMS(to, body) {
  return client.messages.create({
    body,
    from: "+12563635932",
    to,
  });
}

module.exports = { sendSMS };
