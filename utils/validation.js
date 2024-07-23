// utils/validation.js
function isValidEmail(input) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(input);
  }
  
  function isValidMobileNumber(input) {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(input);
  }
  
  module.exports = { isValidEmail, isValidMobileNumber };
  