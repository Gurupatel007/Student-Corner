const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook'
  auth: {
    user: 'gurupatel21@gnu.ac.in',
    pass: 'Ethicalhacker*@007',
  },
  secure: true
});

module.exports = (email, otp) => {
  const mailOptions = {
    from: 'gurupatel21@gnu.ac.in',
    to: email,
    subject: 'Your OTP for Email Verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
      // res.render('verifyOTP', { email, storedOTP: otp });
    }
  });
};
