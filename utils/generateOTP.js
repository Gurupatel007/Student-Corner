// const otpGenerator = require('otp-generator');

// module.exports = () => {
//   // Generate a 6-digit OTP
//   return otpGenerator.generate(6, { upperCase: false, specialChars: false });
// };

// const otpGenerator = require('otp-generator');

// module.exports = () => {
//   // Generate a 6-digit OTP
//   return otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
// };

// const otpGenerator = require('otp-generator');
function generateNumericOTP(length) {
  const chars = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    otp += chars.charAt(randomIndex);
  }
  return otp;
}
module.exports = () => {
  // Generate a 6-digit numeric OTP
  // const numericOTP = otpGenerator.generate(6, { digits: true });

  // Example: Generate a 4-digit or 6-digit numeric OTP
  const numericOTP4 = generateNumericOTP(4);
  return numericOTP4;
};

