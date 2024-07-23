const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "createaccount",
  port: "3307",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = db;
