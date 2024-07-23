// router.js
const express = require("express");
const app = express();
const router = express.Router();
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const db = require("./config/db");


const port = process.env.PORT || 3000;

// Middleware
app.use(session({
  secret: "your secret key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // set to true if using https
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
