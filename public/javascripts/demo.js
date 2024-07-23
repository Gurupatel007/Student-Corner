function generateNumericOTP(length) {
    const chars = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars.charAt(randomIndex);
    }
    return otp;
  }
  
  // Example: Generate a 4-digit or 6-digit numeric OTP
  const numericOTP4 = generateNumericOTP(4);
  const numericOTP6 = generateNumericOTP(6);
  
  console.log(numericOTP4);
  console.log(numericOTP6);
  