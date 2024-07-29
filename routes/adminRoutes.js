const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });




// Admin login route
router.get('/login', (req, res) => {
  res.render('adminLogin');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

router.get('/users/add', (req, res) => {
  res.render('addUser');
});

router.get('/events/add', (req, res) => {
  res.render('addEvent');
});

router.get('/hackathons/add', (req, res) => {
  res.render('addHackathon');
});





// admin login route
router.post('/login', async (req, res) => {
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

// Admin dashboard route
router.get('/dashboard', (req, res) => {
  db.query('SELECT * FROM accounts', (err, userCountResult) => {
    if (err) {
      console.error('Error fetching user count:', err);
      return res.status(500).send('An error occurred while loading the dashboard');
    }
    
    db.query('SELECT * FROM events', (err, eventCountResult) => {
      if (err) {
        console.error('Error fetching event count:', err);
        return res.status(500).send('An error occurred while loading the dashboard');
      }
      
      db.query('SELECT * FROM hackathons', (err, hackathonCountResult) => {
        if (err) {
          console.error('Error fetching hackathon count:', err);
          return res.status(500).send('An error occurred while loading the dashboard');
        }
        
        const userCount = userCountResult.length;
        const eventCount = eventCountResult.length;
        const hackathonCount = hackathonCountResult.length;
        
        // if(req.session.admin){
          res.render('adminDashboard', { userCount, eventCount, hackathonCount });
        // }else{
          // res.redirect('/admin/login');
        // }
      });
    });
  });
});

router.post('/users/add', (req, res) => {
  const { name, phonenumber, email, dob, gender, password } = req.body;
  const sql = 'INSERT INTO accounts (name, phonenumber, email, dob, gender, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, phonenumber, email, dob, gender, password], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Error adding user');
    } else {

      // res.redirect('/admin/dashboard');
      res.status(200).json({ message: 'User added successfully' });
    }
  });
});


// Update your route to handle file uploads

router.post('/events/add', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'img', maxCount: 1 }]), (req, res) => {
  const { eventName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country } = req.body;
  const logoPath = req.files['logo'] ? '/images/uploads/' + req.files['logo'][0].filename : null;
  const imgPath = req.files['img'] ? '/images/uploads/' + req.files['img'][0].filename : null;
  const eventid = uuidv4();

  const eventSql = 'INSERT INTO events (id, deadlineDate, eventName, logo, location, month, day, img, startingTime, endingTime, description, age, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(eventSql, [eventid, deadlineDate, eventName, logoPath, location, month, day, imgPath, startingTime, endingTime, description, age, country], (err, result) => {
    if (err) {
      console.error('Error adding event:', err);
      res.status(500).send('Error adding event');
    } else {
      res.status(200).json({ message: 'Event added successfully' });
    }
  });
});


router.post('/hackathons/add', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'img', maxCount: 1 }]), (req, res) => {
  const { eventName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country } = req.body;
  const logoPath = req.files['logo'] ? '/images/uploads/' + req.files['logo'][0].filename : null;
  const imgPath = req.files['img'] ? '/images/uploads/' + req.files['img'][0].filename : null;
  const eventid = uuidv4();

  // Assuming the new 'hackathons' table now includes all details
  const hackathonSql = 'INSERT INTO hackathons (id, eventName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country, logo, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(hackathonSql, [eventid, eventName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country, logoPath, imgPath], (err, result) => {
    if (err) {
      console.error('Error adding hackathon:', err);
      res.status(500).json({ error: 'Error adding hackathon' });
    } else {
      res.status(200).json({ message: 'Hackathon added successfully' });
    }
  });
});


// Admin users management route
router.get('/users', (req, res) => {
  db.query('SELECT * FROM accounts', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('An error occurred while fetching users');
    }
    // console.log(results);
    res.render('adminUsers', { users: results });
  });
  // res.render('adminUsers');
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Fetch user data from the database
  db.query('SELECT * FROM accounts WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('An error occurred while fetching user');
    }
    const user = results[0];
    res.json(user);
  });
});



router.post('/users/:id/edit', express.json(), (req, res) => {
  const userId = req.params.id;
  const { name, phonenumber, email, dob, gender, password } = req.body;

  console.log("Received data:", req.body);  // Log received data

  const updateQuery = 'UPDATE accounts SET name = ?, phonenumber = ?, email = ?, dob = ?, gender = ?, password = ? WHERE id = ?';

  db.query(updateQuery, [name, phonenumber, email, dob, gender, password, userId], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ success: false, message: 'An error occurred while updating user' });
    }
    console.log("Update successful. Results:", results);  // Log update results
    res.status(200).json({ success: true, message: 'User updated successfully' });
  });
});

router.post('/users/:id/delete', (req, res) => {
  const userEmail = req.params.id;
  const deleteQuery = 'DELETE FROM accounts WHERE email = ?';

  db.query(deleteQuery, [userEmail], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ success: false, message: 'An error occurred while deleting user' });
    }
    console.log("Delete successful. Results:", results);  // Log delete results
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

// Admin events management route
router.get('/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).send('An error occurred while fetching events');
    }
    // console.log(results);
    res.render('adminEvents', { events: results });
  });
});

router.get('/events/:id', (req, res) => {
  const eventId = req.params.id;
  // Fetch event data from the database
  db.query('SELECT * FROM events WHERE id = ?', [eventId], (err, results) => {
    if (err) {
      console.error('Error fetching event:', err);
      return res.status(500).send('An error occurred while fetching event');
    }
    const event = results[0];
    console.log(event);
    res.json(event);
  });
});

router.post('/events/:id/edit', express.json(), (req, res) => {
  const eventId = req.params.id;
  const { eventName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country } = req.body;

  console.log("Received data:", req.body);  // Log received data

  const updateQuery = 'UPDATE events SET eventName = ?, deadlineDate = ?, location = ?, month = ?, day = ?, startingTime = ?, endingTime = ?, description = ?, age = ?, country = ? WHERE id = ?';

  db.query(updateQuery, [eventName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country, eventId], (err, results) => {
    if (err) {
      console.error('Error updating event:', err);
      return res.status(500).json({ success: false, message: 'An error occurred while updating event' });
    }
    console.log("Update successful. Results:", results);  // Log update results
    res.status(200).json({ success: true, message: 'Event updated successfully' });
  });
});

router.post('/events/:id/delete', (req, res) => {
  const eventId = req.params.id;
  const deleteQuery = 'DELETE FROM events WHERE id = ?';

  db.query(deleteQuery, [eventId], (err, results) => {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ success: false, message: 'An error occurred while deleting event' });
    }
    console.log("Delete successful. Results:", results);  // Log delete results
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  });
});

// Admin hackathons management route
router.get('/hackathons', (req, res) => {
  db.query('SELECT * FROM hackathons', (err, results) => {
    if (err) {
      console.error('Error fetching hackathons:', err);
      return res.status(500).send('An error occurred while fetching hackathons');
    }
    // console.log(results);
    res.render('adminHackathons', { hackathons: results });
  });
});

router.get('/hackathons/:id', (req, res) => {
  const hackathonId = req.params.id;
  // Fetch hackathon data from the database
  db.query('SELECT * FROM hackathons WHERE id = ?', [hackathonId], (err, results) => {
    if (err) {
      console.error('Error fetching hackathon:', err);
      return res.status(500).send('An error occurred while fetching hackathon');
    }
    const hackathon = results[0];
    // console.log(hackathon);
    res.json(hackathon);
  });
});

router.post('/hackathons/:id/edit', express.json(), (req, res) => {
  const hackathonId = req.params.id;
  const { hackathonName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country } = req.body;

  console.log("Received data:", req.body);  // Log received data

  const updateQuery = 'UPDATE hackathons SET eventName = ?, deadlineDate = ?, location = ?, month = ?, day = ?, startingTime = ?, endingTime = ?, description = ?, age = ?, country = ? WHERE id = ?';

  db.query(updateQuery, [hackathonName, deadlineDate, location, month, day, startingTime, endingTime, description, age, country, hackathonId], (err, results) => {
    if (err) {
      console.error('Error updating hackathon:', err);
      return res.status(500).json({ success: false, message: 'An error occurred while updating hackathon' });
    }
    console.log("Update successful. Results:", results);  // Log update results
    res.status(200).json({ success: true, message: 'Hackathon updated successfully' });
  });
});

router.post('/hackathons/:id/delete', (req, res) => {
  const hackathonId = req.params.id;
  const deleteQuery = 'DELETE FROM hackathons WHERE id = ?';

  db.query(deleteQuery, [hackathonId], (err, results) => {
    if (err) {
      console.error('Error deleting hackathon:', err);
      return res.status(500).json({ success: false, message: 'An error occurred while deleting hackathon' });
    }
    console.log("Delete successful. Results:", results);  // Log delete results
    res.status(200).json({ success: true, message: 'Hackathon deleted successfully' });
  });
});

module.exports = router;