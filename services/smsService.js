// services/smsService.js
const twilio = require("twilio");

const accountSid = "AC24848a8592f93068fc9c8c93e1244e3c";
const authToken = "090df834325cf6218dca5088d045e2bd";
const client = new twilio(accountSid, authToken);

function sendSMS(to, body) {
  return client.messages.create({
    body,
    from: "+12563635932",
    to,
  });
}

module.exports = { sendSMS };
