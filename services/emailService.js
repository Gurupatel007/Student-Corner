// services/emailService.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

function sendEmail(to, subject, text) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({ from: process.env.from, to, subject, text }, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = { sendEmail };
