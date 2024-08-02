const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { isValidEmail, isValidMobileNumber } = require("../utils/validation");
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');
const generateNumericOTP = require('../utils/generateOTP');
// Global variables
const upcomingEvents = [];
const upcomingHackthons = [];
const EnrolledEvents = [];
const EnrolledHackthons = [];
const PastEnrolledEvents = [];
const PastEnrolledHackthons = [];
const otps = {};

function loadEventData() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM events where status='active'
    `;

    db.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const eventData = results.map(row => ({
        id: row.id,
        deadlineDate: row.deadlineDate,
        eventName: row.eventName,
        logo: row.logo,
        location: row.location,
        month: row.month,
        day: row.day,
        status: row.status,
        moreDetails: {
          img: row.img,
          startingTime: row.startingTime,
          endingTime: row.endingTime,
          description: row.description,
          age: row.age,
          country: row.country
        }
      }));

      upcomingEvents.push(...eventData);
      // console.log(upcomingEvents);
      resolve();
    });
  });
}

function loadHackathonData() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM hackathons where status='active'
    `;

    db.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      if (results && results.length > 0) {
        const hackathonData = results.map(row => ({
          id: row.id,
          deadlineDate: row.deadlineDate,
          eventName: row.eventName,
          logo: row.logo,
          location: row.location,
          month: row.month,
          day: row.day,
          status : row.status,
          moreDetails: {
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
  SELECT ee.*, e.eventName, e.deadlineDate, e.location, e.img, e.day, e.month
  FROM enrolled_events ee
  JOIN events e ON ee.event_id = e.id
  WHERE ee.user_email = ? AND status='active'
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
        name: row.eventName,
        location: row.location,
        image: row.img,
        deadline: row.deadlineDate,
        status: row.status,
        day : row.day,
        month : row.month
      }));
      EnrolledEvents.length = 0;
      EnrolledEvents.push(...enrolledEvents);
      // console.log(EnrolledEvents);
      resolve(enrolledEvents);
    });
  });
}

function loadEnrolledHackathons(userEmail) {
  return new Promise((resolve, reject) => {
    const query = `
  SELECT eh.*, h.eventName, h.deadlineDate, h.location, h.img
  FROM enrolled_hackathons eh
  JOIN hackathons h ON eh.hackathon_id = h.id
  WHERE eh.user_email = ? AND status='active'
`;

    console.log('Loading enrolled hackathons for user:', userEmail);
    db.query(query, [userEmail], (error, results) => {
      if (error) {
        console.error('Error loading enrolled hackathons:', error);
        reject(error);
        return;
      }
      const enrolledHackathons = results.map(row => ({
        id: row.hackathon_id,
        name: row.eventName,
        deadline: row.deadlineDate,
        location: row.location,
        image: row.img
      }));

      EnrolledHackthons.length = 0; // Clear existing data
      EnrolledHackthons.push(...enrolledHackathons);
      resolve(enrolledHackathons);
    });
  });
}

async function loadPastEnrolledEvents(userEmail) {
  console.log('Loading past enrolled events for user:', userEmail);
  
  const query = `
  SELECT 
    events.id, 
    events.deadlineDate, 
    events.eventName, 
    events.logo, 
    events.location, 
    events.month, 
    events.day, 
    events.img, 
    events.startingTime, 
    events.endingTime, 
    events.description, 
    events.age, 
    events.country, 
    events.status,
    enrolled_events.user_email, 
    enrolled_events.enrollment_date
FROM 
    events
INNER JOIN 
    enrolled_events 
ON 
    events.id = enrolled_events.event_id
WHERE 
    events.status = 'past';

  `;

  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [userEmail], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
          return;
        }

        console.log('Query executed successfully');
        console.log('Number of results:', results.length);
        // console.log(results);
        const pastEnrolledEvents = results.map(row => ({
          id: row.id,
          name: row.eventName,
          location: row.location,
          image: row.img,
          deadline: row.deadlineDate,
          status: row.status,
          day: row.day,
          month: row.month
        }));
        PastEnrolledEvents.length = 0;
        PastEnrolledEvents.push(...pastEnrolledEvents);
        resolve(pastEnrolledEvents);
      });
    });
  } catch (error_1) {
    console.error('Error loading past enrolled events:', error_1);
    throw error_1;
  }
}

function loadPastEnrolledHackathons(userEmail) {
  try {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
    hackathons.id, 
    hackathons.deadlineDate, 
    hackathons.eventName, 
    hackathons.logo, 
    hackathons.location, 
    hackathons.month, 
    hackathons.day, 
    hackathons.img, 
    hackathons.startingTime, 
    hackathons.endingTime, 
    hackathons.description, 
    hackathons.age, 
    hackathons.country, 
    hackathons.status,
    enrolled_hackathons.user_email, 
    enrolled_hackathons.enrollment_date
FROM 
    hackathons
INNER JOIN 
    enrolled_hackathons 
ON 
    hackathons.id = enrolled_hackathons.hackathon_id
WHERE 
    hackathons.status = 'past';
      `;
      
      db.query(query, [userEmail], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
          return;
        }
        
        console.log('Query executed successfully');
        console.log('Number of results:', results.length);
        // console.log(results);
        
        const pastEnrolledHackathons = results.map(row => ({
          id: row.id,
          name: row.eventName,
          location: row.location,
          image: row.img,
          deadline: row.deadlineDate,
          status: row.status , 
          day : row.day,
          month : row.month
        }));

        PastEnrolledHackthons.length = 0;
        PastEnrolledHackthons.push(...pastEnrolledHackathons);
        console.log(PastEnrolledHackthons)
        resolve(pastEnrolledHackathons);
      });
    });
  } catch (error) {
    console.error('Promise rejected:', error);
    throw error;
  }
}



// Load data when the server starts
Promise.all([loadEventData(), loadHackathonData(),loadPastEnrolledEvents(),loadPastEnrolledHackathons ()])
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
    loadEnrolledHackathons(userEmail),
    loadPastEnrolledEvents(userEmail),
    loadPastEnrolledHackathons(userEmail)
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

router.get('/my-events', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    res.render('enrolled_events', { EnrolledEvents, PastEnrolledEvents });
  }
});

router.get('/my-hackathons', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    res.render('enrolled_hackathons', { EnrolledHackthons , PastEnrolledHackthons });
  }
});


router.post('/profile/edit', (req, res) => {
  const { name, email, phonenumber, gender, dob, password } = req.body;
  console.log(req.body);
  const sql = 'UPDATE accounts SET name = ?, email = ?, phonenumber = ?, gender = ?, dob = ?, password = ? WHERE email = ?';
  db.query(sql, [name, email, phonenumber, gender, dob, password, req.session.user.email], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ status: 'error', message: 'An error occurred while updating user data' });
    } else {
      console.log(result);
      res.status(200).json({ status: 'success', message: 'Profile updated successfully.' });
    }
  });
});

router.get('/events', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    const userEmail = req.session.user.email;

  // Fetch all events
  const fetchEventsQuery = 'SELECT * FROM events where status="active"';
  db.query(fetchEventsQuery, (eventsError, eventsResults) => {
    if (eventsError) {
      console.error(eventsError);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch events' });
    }

    // Fetch user's enrolled events
    const fetchEnrollmentsQuery = 'SELECT event_id FROM enrolled_events WHERE user_email = ?';
    db.query(fetchEnrollmentsQuery, [userEmail], (enrollmentsError, enrollmentsResults) => {
      if (enrollmentsError) {
        console.error(enrollmentsError);
        return res.status(500).json({ status: 'error', message: 'Failed to fetch enrollments' });
      }

      // Create a set of enrolled event IDs for quick lookup
      const enrolledEventIds = new Set(enrollmentsResults.map(enrollment => enrollment.event_id));

      // Add isEnrolled property to each event
      const upcomingEvents = eventsResults.map(event => ({
        ...event,
        isEnrolled: enrolledEventIds.has(event.id)
      }));

      // Render the template with the upcomingEvents data
      res.render('events', { upcomingEvents });
    });
  });
}});

router.get('/hackathons', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    const userEmail = req.session.user.email;

    // Fetch all hackathons
    const fetchHackathonsQuery = 'SELECT * FROM hackathons where status="active"';
    db.query(fetchHackathonsQuery, (hackathonsError, hackathonsResults) => {
      if (hackathonsError) {
        console.error(hackathonsError);
        return res.status(500).json({ status: 'error', message: 'Failed to fetch hackathons' });
      }

      // Fetch user's enrolled hackathons
      const fetchEnrollmentsQuery = 'SELECT hackathon_id FROM enrolled_hackathons WHERE user_email = ?';
      db.query(fetchEnrollmentsQuery, [userEmail], (enrollmentsError, enrollmentsResults) => {
        if (enrollmentsError) {
          console.error(enrollmentsError);
          return res.status(500).json({ status: 'error', message: 'Failed to fetch enrollments' });
        }

        // Create a set of enrolled hackathon IDs for quick lookup
        const enrolledHackathonIds = new Set(enrollmentsResults.map(enrollment => enrollment.hackathon_id));

        // Add isEnrolled property to each hackathon
        const upcomingHackthons = hackathonsResults.map(hackathon => ({
          ...hackathon,
          isEnrolled: enrolledHackathonIds.has(hackathon.id)
        }));

        res.render('hackathon', { upcomingHackthons });
      });
    });
  }
});


router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    res.redirect("/signin");
  } else {
    const user = req.session.user;
    Promise.all([
      loadEnrolledEvents(user.email),
      loadEnrolledHackathons(user.email),
    ])
      .then(([enrolledEvents, enrolledHackathons]) => {
        res.render("dashboard", {
          accounts: user,  // Change this line
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

router.get('/edit-profile', (req, res) => {
  const sql = 'SELECT * FROM accounts WHERE email = ?';
  db.query(sql, [req.session.user.email], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('An error occurred while fetching user data');
    } else {
      const user = result[0];
      // console.log(user);
      res.render('edit-profile', { user });
    }
  });
});





router.get('/pastEvents', (req, res) => {
    db.query('SELECT * FROM events WHERE status = "past"', (error, results) => {
      if (error) {
        console.error('Error loading past events:', error);
        res.status(500).send('An error occurred while fetching past events');
      }else{
        console.log(results);
        res.render('pastEvents', { pastEvents: results });
      }
  });
});

router.get('/pastHackathons', (req, res) => {
    db.query('SELECT * FROM hackathons WHERE status = "past"', (error, results) => {
      if (error) {
        console.error('Error loading past hackathons:', error);
        res.status(500).send('An error occurred while fetching past hackathons');
      }else{
        res.render('pastHackathons', { pastHackathons: results });
      }
  });
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
          res.send({
            status: 'error',
            message: `Failed to update password for ${identifierType}. Please try again.`
          });
        } else {
          res.send({ status: 'success' });
        }
      });
    } else {
      res.send({
        status: 'error',
        message: "Invalid input. Please enter either an email or mobile number."
      });
    }
  }
});


router.get('/event/:id', (req, res) => {
  if (!req.session.user) {
    // return res.status(401).json({ status: 'error', message: 'User not logged in' });
    res.redirect('/signin');
  }else{

  const eventId = req.params.id;
  const userEmail = req.session.user.email;

  // Fetch all events
  const fetchEventsQuery = 'SELECT * FROM events';
  db.query(fetchEventsQuery, (eventsError, eventsResults) => {
    if (eventsError) {
      console.error(eventsError);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch events' });
    }

    // Fetch user's enrolled events
    const fetchEnrollmentsQuery = 'SELECT event_id FROM enrolled_events WHERE user_email = ?';
    db.query(fetchEnrollmentsQuery, [userEmail], (enrollmentsError, enrollmentsResults) => {
      if (enrollmentsError) {
        console.error(enrollmentsError);
        return res.status(500).json({ status: 'error', message: 'Failed to fetch enrollments' });
      }

      // Create a set of enrolled event IDs for quick lookup
      const enrolledEventIds = new Set(enrollmentsResults.map(enrollment => enrollment.event_id));

      // Find the event details
      const eventDetails = eventsResults.find(event => event.id === eventId);

      if (!eventDetails) {
        return res.status(404).send('Event not found');
      }

      // Add isEnrolled property to the event details
      eventDetails.isEnrolled = enrolledEventIds.has(eventDetails.id);

      // Get three random related events
      const relatedEvents = eventsResults
        .filter(event => event.id !== eventId)
        .map(event => ({
          ...event,
          isEnrolled: enrolledEventIds.has(event.id)
        }))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      console.log(eventDetails);
      res.render('eventDetails', { eventDetails, relatedEvents });
    });
  });
}});


router.get('/hackathon/:id', (req, res) => {
  if (!req.session.user) {
    // return res.status(401).json({ status: 'error', message: 'User not logged in' });
    res.redirect('/signin');
  } else{

  const hackathonId = req.params.id;
  const userEmail = req.session.user.email;

  // Fetch all hackathons
  const fetchHackathonsQuery = 'SELECT * FROM hackathons';
  db.query(fetchHackathonsQuery, (hackathonsError, hackathonsResults) => {
    if (hackathonsError) {
      console.error(hackathonsError);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch hackathons' });
    }

    // Fetch user's enrolled hackathons
    const fetchEnrollmentsQuery = 'SELECT hackathon_id FROM enrolled_hackathons WHERE user_email = ?';
    db.query(fetchEnrollmentsQuery, [userEmail], (enrollmentsError, enrollmentsResults) => {
      if (enrollmentsError) {
        console.error(enrollmentsError);
        return res.status(500).json({ status: 'error', message: 'Failed to fetch enrollments' });
      }

      // Create a set of enrolled hackathon IDs for quick lookup
      const enrolledHackathonIds = new Set(enrollmentsResults.map(enrollment => enrollment.hackathon_id));

      // Find the hackathon details
      const hackathonDetails = hackathonsResults.find(hackathon => hackathon.id === hackathonId);
      if (!hackathonDetails) {
        return res.status(404).send('Hackathon not found');
      }

      // Add isEnrolled property to the hackathon details
      hackathonDetails.isEnrolled = enrolledHackathonIds.has(hackathonDetails.id);

      // Get three random related hackathons
      const relatedHackathons = hackathonsResults
        .filter(hackathon => hackathon.id !== hackathonId)
        .map(hackathon => ({
          ...hackathon,
          isEnrolled: enrolledHackathonIds.has(hackathon.id)
        }))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
        console.log(hackathonDetails);
      res.render('hackathonDetails', { hackathonDetails, relatedHackathons });
    });
  });
}});


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
    } else {
      // Re-fetch the user from the database after updating
      db.query(`SELECT * FROM accounts WHERE email = ? OR phonenumber = ?`, [userEmail, userPhone], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred while fetching the updated user details.');
        } else {
          const updatedUser = results[0];
          req.session.user = updatedUser;
          res.redirect('/dashboard');
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


router.post('/enroll', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  }

  const { eventId, eventType } = req.body;
  const userEmail = req.session.user.email;
  const enrolledAt = new Date(); // Get the current date and time

  let checkQuery, enrollQuery;
  if (eventType === 'event') {
    checkQuery = 'SELECT * FROM enrolled_events WHERE user_email = ? AND event_id = ?';
    enrollQuery = 'INSERT INTO enrolled_events (user_email, event_id, enrollment_date) VALUES (?, ?, ?)';
  } else if (eventType === 'hackathon') {
    checkQuery = 'SELECT * FROM enrolled_hackathons WHERE user_email = ? AND hackathon_id = ?';
    enrollQuery = 'INSERT INTO enrolled_hackathons (user_email, hackathon_id, enrollment_date) VALUES (?, ?, ?)';
  } else {
    return res.status(400).json({ status: 'error', message: 'Invalid event type' });
  }

  db.query(checkQuery, [userEmail, eventId], (checkError, checkResults) => {
    if (checkError) {
      console.error(checkError);
      return res.status(500).json({ status: 'error', message: 'Failed to check enrollment' });
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ status: 'error', message: 'You are already enrolled in this event' });
    }

    db.query(enrollQuery, [userEmail, eventId, enrolledAt], (enrollError, enrollResults) => {
      if (enrollError) {
        console.error(enrollError);
        return res.status(500).json({ status: 'error', message: 'Failed to enroll' });
      }
      res.json({ status: 'success', message: 'Enrolled successfully' });
    });
  });
});


router.post('/unenroll', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  }

  const { eventId, eventType } = req.body;
  const userEmail = req.session.user.email;

  const unenrollQuery = 'DELETE FROM enrolled_events WHERE event_id = ? AND user_email = ?';
  db.query(unenrollQuery, [eventId, userEmail], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Failed to unenroll from event' });
    }

    res.json({ status: 'success', message: 'Successfully unenrolled from event' });
  });
});

router.post('/unenroll/:id', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signin');
  }

  const hackathonId = req.params.id;
  const userEmail = req.session.user.email;

  const unenrollQuery = 'DELETE FROM enrolled_hackathons WHERE hackathon_id = ? AND user_email = ?';
  db.query(unenrollQuery, [hackathonId, userEmail], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Failed to unenroll from hackathon' });
    }

    res.json({ status: 'success', message: 'Successfully unenrolled from hackathon' });
  });
});



module.exports = router;

