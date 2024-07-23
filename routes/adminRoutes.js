const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const router = express.Router();

// Admin login route
router.get('/login', (req, res) => {
  res.render('adminLogin');
});

// Admin dashboard route
router.get('/dashboard', (req, res) => {
  res.render('adminDashboard');
});

// Admin users management route
router.get('/users', (req, res) => {
  res.render('adminUsers');
});

// Admin events management route
router.get('/events', (req, res) => {
  res.render('adminEvents');
});

// Admin hackathons management route
router.get('/hackathons', (req, res) => {
  res.render('adminHackathons');
});

// admin login route
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    db.query('SELECT * FROM admins WHERE username = ?', [username], (error, results, fields) => {
      if (error) {
        console.error('Database query error:', error);
        return res.render('adminLogin', { error: 'An error occurred. Please try again.' });
      }

      const admin = results[0];
      if (admin && admin.password) {
        // Proceed with password comparison
        bcrypt.compare(password, admin.password, (error, result) => {
          if (error) {
            console.error('Error during password comparison:', error);
            return res.render('adminLogin', { error: 'An error occurred. Please try again.' });
          }

          if (result) {
            // Passwords match
            req.session.admin = admin;
            res.redirect('/admin/dashboard');
          } else {
            // Passwords don't match
            res.render('adminLogin', { error: 'Invalid credentials' });
          }
        });
      } else {
        res.render('adminLogin', { error: 'Invalid credentials' });
      }
    });

  } catch (error) {
    console.error('Error during admin login:', error);
    res.render('adminLogin', { error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
