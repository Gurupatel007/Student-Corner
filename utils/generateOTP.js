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
  const numericOTP4 = generateNumericOTP(4);
  return numericOTP4;
};

