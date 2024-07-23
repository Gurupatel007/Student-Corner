const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { isValidEmail, isValidMobileNumber } = require("../utils/validation");
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');
// Global variables
const upcomingEvents = [];
const upcomingHackthons = [];
const EnrolledEvents = [];
const EnrolledHackthons = [];

function loadEventData() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT e.*, ed.*
      FROM events e
      JOIN event_details ed ON e.id = ed.event_id
    `;

    db.query(query, (error, results) => {
      if (error) reject(error);

      // console.log(results);
      const eventData = results.map(row => ({
        id: row.id,
        deadlineDate: row.deadlineDate,
        eventName: row.eventName,
        logo: row.logo,
        location: row.location,
        month: row.month,
        day: row.day,
        moreDetails: {
          eventid: row.eventid,
          img: row.img,
          startingTime: row.startingTime,
          endingTime: row.endingTime,
          description: row.description,
          age: row.age,
          country: row.country
        }
      }));

      upcomingEvents.push(...eventData);
      resolve();
    });
  });
}

function loadHackathonData() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        h.id, h.deadlineDate, h.eventName, h.logo, h.location, h.month, h.day,
        hd.eventid, hd.img, hd.startingTime, hd.endingTime, hd.description, hd.age, hd.country
      FROM hackathons h
      JOIN hackathon_details hd ON h.id = hd.hackathon_id
    `;

    db.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      // console.log(results);

      if (results && results.length > 0) {
        const hackathonData = results.map(row => ({
          id: row.id,
          deadlineDate: row.deadlineDate,
          eventName: row.eventName,
          logo: row.logo,
          location: row.location,
          month: row.month,
          day: row.day,
          moreDetails: {
            eventid: row.eventid,
            img: row.img,
            startingTime: row.startingTime,
            endingTime: row.endingTime,
            description: row.description,
            age: row.age,
            country: row.country
          }
        }));

        upcomingHackthons.push(...hackathonData);
      }

      resolve();
    });
  });
}


function loadEnrolledEvents(userEmail) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT ue.*, e.eventName, e.deadlineDate, e.location, ed.img
    FROM user_enrollments ue
    JOIN events e ON ue.event_id = e.id
    JOIN event_details ed ON e.id = ed.event_id
    WHERE ue.user_email = ? AND ue.event_type = "event"
    `;
    console.log('Loading enrolled events for user:', userEmail);
    db.query(query, [userEmail], (error, results) => {
      if (error) {
        console.error('Error loading enrolled events:', error);
        reject(error);
        return;
      }
      const enrolledEvents = results.map(row => ({
        id: row.event_id,
        type: row.event_type,
        name: row.eventName,
        location: row.location,
        image: row.img,
        deadline: row.deadlineDate,
        status: row.status
      }));
      EnrolledEvents.length = 0;
      EnrolledEvents.push(...enrolledEvents);
      // console.log('Enrolled events:', EnrolledEvents);
      resolve(enrolledEvents);
    });
  });
}


function loadEnrolledHackathons(userEmail) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ue.*, h.eventName, h.deadlineDate, h.location, hd.img
      FROM user_enrollments ue
      JOIN hackathons h ON ue.event_id = h.id
      JOIN hackathon_details hd ON h.id = hd.hackathon_id
      WHERE ue.user_email = ? AND ue.event_type = "hackathon"
    `;
    console.log('Loading enrolled hackathons for user:', userEmail);
    db.query(query, [userEmail], (error, results) => {
      if (error) {
        console.error('Error loading enrolled hackathons:', error);
        reject(error);
        return;
      }

      // console.log('Enrolled hackathons query results:', results);
      const enrolledHackathons = results.map(row => ({
        id: row.event_id,
        type: row.event_type,
        name: row.eventName,
        deadline: row.deadlineDate,
        location: row.location,
        image: row.img
      }));

      EnrolledHackthons.length = 0; // Clear existing data
      EnrolledHackthons.push(...enrolledHackathons);
      // console.log('Enrolled hackathons:', EnrolledHackthons);
      resolve(enrolledHackathons);
    });
  });
}



// Load data when the server starts
// Load data when the server starts
Promise.all([loadEventData(), loadHackathonData()])
  .then(() => {
    console.log('All data loaded successfully');
  })
  .catch((error) => {
    console.error('Error loading data:', error);
  });



// Use this function to refresh data as needed
function refreshData(userEmail) {
  upcomingEvents.length = 0;
  upcomingHackthons.length = 0;
  return Promise.all([
    loadEventData(),
    loadHackathonData(),
    loadEnrolledEvents(userEmail),
    loadEnrolledHackathons(userEmail)
  ]);
}

// Routes
router.get("/", (req, res) => {
    const isAuthenticated = req.session.user ? true : false;
  res.render('landing', { isAuthenticated });
});

router.get("/signin", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("register");
});

router.get("/forgot-password", (req, res) => {
  res.render("forgotpass");
});

router.get('/newpass', (req, res) => {
  res.render('newpass');
});

router.get("/newPass", (req, res) => {
  res.render("newpass");
});

router.get('/events', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    res.render('events', { upcomingEvents });
  }
});

router.get('/hackathons', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    res.render('hackathon', { upcomingHackthons });
  }
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    res.redirect("/signin");
  } else {
    const user = req.session.user;
    Promise.all([
      loadEnrolledEvents(user.email),
      loadEnrolledHackathons(user.email)
    ])
    .then(([enrolledEvents, enrolledHackathons]) => {
      res.render("dashboard", { 
        accounts: user, 
        upcomingEvents, 
        upcomingHackthons, 
        EnrolledEvents: enrolledEvents, 
        EnrolledHackthons: enrolledHackathons 
      });
    })
    .catch(error => {
      console.error('Error loading user data:', error);
      res.status(500).send('An error occurred while loading user data');
    });
  }
});

router.post("/register", (req, res) => {
  console.log("req.body:", req.body);
  const { name, email, phonenumber, dob, gender, password } = req.body;

  const sql = "INSERT INTO accounts (name, email, phonenumber, dob, gender, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phonenumber, dob, gender, password], (err, result) => {
    if (err) {
      console.error("MySQL query error: " + err.message);
      res.send("Registration failed. Please try again.");
    } else {
      res.send({ status: 'success' });
    }
  });
});

router.post("/login", (req, res) => {
  const identifier = req.body.identifier;
  const password = req.body.password;

  const isEmail = isValidEmail(identifier);
  const isMobile = isValidMobileNumber(identifier);

  console.log("identifier: " + identifier);
  console.log("password: " + password);
  console.log("isEmail: " + isEmail);
  if (isEmail || isMobile) {
    let sql, identifierType;

    if (isEmail) {
      sql = "SELECT * FROM accounts WHERE email = ? AND password = ?";
      identifierType = "email";
    } else {
      sql = "SELECT * FROM accounts WHERE phonenumber = ? AND password = ?";
      identifierType = "phone number";
    }

    db.query(sql, [identifier, password], (err, result) => {
      if (err) {
        console.log("MySQL query error: " + err.message);
        res.send("Login failed. Please try again.");
      } else {
        if (result.length > 0) {
          const user = result[0];
                    if (user.password === password) {
            req.session.user = user; // Store user data in session
            res.send({ status: 'success' });
          } else {
            res.send({ status: 'error', message: 'Incorrect password.' });
          }
        } else {
          res.send({ status: 'error', message: `User with ${identifierType} not found or Password Incorrect.` });
        }
      }
    });
  } else {
    res.send({ status: 'error', message: 'Invalid input. Please enter either an email or phone number.' });
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

router.post("/send-otp", (req, res) => {
    const identifier = req.body.identifier;
  
    if (isValidEmail(identifier)) {
      // It's an email, perform email-related logic
      const sql = "SELECT * FROM accounts WHERE email = ?";
      db.query(sql, [identifier], (err, rows) => {
        if (err) {
          console.error(err);
          res.send("An error occurred while checking the email.");
        } else if (rows.length > 0) {
          const otp = generateNumericOTP(6);
          otps[identifier] = {
            otp,
            createdAt: Date.now(),
          };
          
          sendEmail(identifier, "Your OTP for Email Verification", `Your OTP is: ${otp}`)
            .then(() => {
              res.render("otp", { identifier, storedOTP: otp });
            })
            .catch((error) => {
              console.error(error);
              res.send("Failed to send OTP. Please try again.");
            });
        } else {
          res.send("No such email found in the database. Please sign up.");
        }
      });
    } else if (isValidMobileNumber(identifier)) {
      // It's a mobile number, perform mobile-related logic
      const sql = "SELECT * FROM accounts WHERE phonenumber = ?";
      db.query(sql, [identifier], (err, rows) => {
        if (err) {
          console.error(err);
          res.send("An error occurred while checking the phone number.");
        } else if (rows.length > 0) {
          const otp = generateNumericOTP(6);
          otps[identifier] = {
            otp,
            createdAt: Date.now(),
          };
          
          sendSMS("+91" + identifier, `Your OTP is: ${otp}`)
            .then(() => {
              res.render("otp", { identifier, storedOTP: otp });
            })
            .catch((error) => {
              console.error(error);
              res.send("Failed to send SMS OTP. Please try again.");
            });
        } else {
          res.send("No such phone number found in the database. Please sign up.");
        }
      });
    } else {
      res.send("Invalid input. Please enter either an email or mobile number.");
    }
  });

  // ---------------------------VERIFY OTP--------------------------
  
  // Import necessary modules and setup the router
  
  // Handle the POST request for OTP verification
  router.post("/verify-otp", (req, res) => {
    const identifier = req.body.identifier;
    const userOTP = req.body.otp;
    const storedOTP = req.body.storedOTP;
  
    if (otpIsValid(identifier, userOTP)) {
      // OTP verification successful
      res.render("newpass", { identifier }); // Redirect to password reset page
    } else {
      console.log("Invalid OTP or expired. Please try again.");
      res.send("Invalid OTP or expired. Please try again.");
    }
  });
  
  // Function to verify OTP
  
  const otpValidityDuration = 2 * 60 * 1000; // 2 minutes in milliseconds
  
  function otpIsValid(identifier, userOTP) {
    const storedOTP = otps[identifier];
    if (!storedOTP) {
      console.log("OTP not found");
      return false; // OTP not found
    }
  
    const currentTime = Date.now();
    const elapsedTime = currentTime - storedOTP.createdAt;
  
    if (elapsedTime <= otpValidityDuration && storedOTP.otp === userOTP) {
      console.log("OTP is valid");
      delete otps[identifier]; // Remove the used OTP
      return true;
    } else {
      console.log("OTP is invalid or expired");
      return false;
    }
  }
  
  // ---------------------------------RESET PASSWORD---------------------------
  
  // Handle the POST request to update the password after OTP verification
  router.post("/update-password", (req, res) => {
    const identifier = req.body.identifier;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
  
    if (newPassword !== confirmPassword) {
      res.send({
        status: 'error',
        message: "New password and confirmation password do not match. Please try again."
      });
    } else {  
      const isEmail = isValidEmail(identifier);
      const isMobile = isValidMobileNumber(identifier);
  
      if (isEmail || isMobile) {
        const sql = isEmail
          ? "UPDATE accounts SET password = ? WHERE email = ?"
          : "UPDATE accounts SET password = ? WHERE phonenumber = ?";
  
        const identifierType = isEmail ? "email" : "phone number";
  
        db.query(sql, [newPassword, identifier], (err, result) => {
          if (err) {
            console.log("MySQL query error: " + err.message);
            // res.send(
            //   `Failed to update password for ${identifierType}. Please try again.`
            // );
            res.send({
              status: 'error',
              message: `Failed to update password for ${identifierType}. Please try again.`
            });
          } else {
            res.send({ status: 'success' });
          }
        });
      } else {
        // res.send("Invalid input. Please enter either an email or mobile number.");
        res.send({
          status: 'error',
          message: "Invalid input. Please enter either an email or mobile number."
        });
      }
    }
  });
  
  // particular Event details
  router.get('/event/:id', (req, res) => {
    const eventId = req.params.id;
    console.log(eventId);
    const eventDetails = upcomingEvents.find(event => event.moreDetails.eventid === eventId);
  
    if (!eventDetails) {
      return res.status(404).send('Event not found');
    }
  
    // Get three random related events
    const relatedEvents = upcomingEvents.filter(event => event.moreDetails.eventid !== eventId).sort(() => 0.5 - Math.random()).slice(0, 3);
  
    res.render('eventDetails', { eventDetails, relatedEvents });
  });
  
  router.get('/hackathon/:id', (req, res) => {
    const hackathonId = req.params.id;
    const hackathonDetails = upcomingHackthons.find(hackathon => hackathon.moreDetails.eventid === hackathonId);
    if (!hackathonDetails) {
      res.status(404).send('Hackathon not found');
      return;
    }
  
    // For simplicity, assume related upcomingHackthons are the first 3 upcomingHackthons in the list
    // const relatedupcomingHackthons = upcomingHackthons.slice(0, 3);
    const relatedHackathons = upcomingHackthons.filter(hackathon => hackathon.moreDetails.eventid !== hackathonId).sort(() => 0.5 - Math.random()).slice(0, 3)
  
    res.render('hackathonDetails', { hackathonDetails, relatedHackathons });
  });
  
  // --------------------------------------- update USER DETAILS ---------------------------------
  
  router.post('/updateDetails', (req, res) => {
    const { name, email, phone, dob, gender } = req.body;
  
    // Assuming the user is identified by email or phone number
    const userEmail = req.body.email;
    const userPhone = req.body.phone;
  
    const query = `UPDATE accounts SET name = ?,email= ?,phonenumber=?, dob = ?, gender = ? WHERE email = ? OR phonenumber = ?`;
  
    db.query(query, [name, email, phone, dob, gender, userEmail, userPhone], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the user details.');
        // res.status(500).json({ status: 'error', message: 'An error occurred while updating the user details.' });
      } else {
        // Re-fetch the user from the database after updating
        db.query(`SELECT * FROM accounts WHERE email = ? OR phonenumber = ?`, [userEmail, userPhone], (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send('An error occurred while fetching the updated user details.');
            // res.status(500).json({ status: 'error', message: 'An error occurred while fetching the updated user details.' });
          } else {
            const updatedUser = results[0];
            req.session.user = updatedUser;
            // Render the dashboard page with the updated user
            // res.render('dashboard', { accounts: updatedUser });
            res.redirect('/dashboard');
            // res.status(200).json({ status: 'success', message: 'Profile updated successfully.' });
          }
        });
      }
    });
  });
  
  // ------------------------- subscribe to newsletter ----------------------------
  router.post('/subscribe', (req, res) => {
    const email = req.body.email;
    const sql = 'INSERT INTO newsletters (email) VALUES (?)';
  
    db.query(sql, email, (err, result) => {
      if (err) throw err;
      console.log('Record inserted');
      // res.redirect('/');
      res.send({ status: 'success' });
    });
  });
  
  // ---------------- enrollments ---------------------
  router.post('/enroll', (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ status: 'error', message: 'User not logged in' });
    }
  
    const { eventId, eventType } = req.body;
    const userEmail = req.session.user.email;
  
    const query = 'INSERT INTO user_enrollments (user_email, event_id, event_type) VALUES (?, ?, ?)';
    db.query(query, [userEmail, eventId, eventType], (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ status: 'error', message: 'You are already enrolled in this event' });
        }
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Failed to enroll' });
      }
      res.json({ status: 'success', message: 'Enrolled successfully' });
    });
  });

module.exports = router;

