// services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "code.guru@outlook.in",
    pass: "Ethicalhacker@**007",
  },
});

function sendEmail(to, subject, text) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({ from: "code.guru@outlook.in", to, subject, text }, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = { sendEmail };
