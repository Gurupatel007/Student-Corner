const express = require('express');
const sendEmail = require('./sendEmail');
const generateOTP = require('./generateOTP');

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to generate and send OTP
// app.get('/send-otp', (req, res) => {
//   const email = 'certifiedguru44@gmail.com'; // Replace with the recipient's email
//   const otp = generateOTP();
//   sendEmail(email, otp);
//   res.send('OTP sent to your email.');
// });

// --------------------------------------------------------------------------------------------------

// In your main application file (app.js)
const otpValidityDuration = 2 * 60 * 1000; // 5 minutes in milliseconds

// Create an object to store OTPs and their creation time
const otps = {};

app.get('/send-otp', (req, res) => {
  const email = 'certifiedguru44@gmail.com'; // Replace with the recipient's email
  const otp = generateOTP();
  otps[email] = {
    otp,
    createdAt: Date.now(),
  };
  sendEmail(email, otp);
  res.send('OTP sent to your email.');
});

app.get('/verify-otp', (req, res) => {
  const email = 'certifiedguru44@gmail.com'; // Replace with the recipient's email
  const userOTP = req.query.otp; // Get the OTP provided by the user

  if (otpIsValid(email, userOTP)) {
    res.send('OTP is valid.');
  } else {
    res.send('Invalid OTP or expired.');
  }
});

function otpIsValid(email, userOTP) {
  const storedOTP = otps[email];
  if (!storedOTP) {
    return false; // OTP not found
  }

  const currentTime = Date.now();
  const elapsedTime = currentTime - storedOTP.createdAt;

  if (elapsedTime <= otpValidityDuration && storedOTP.otp === userOTP) {
    delete otps[email]; // Remove the used OTP
    return true;
  }

  return false;
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;