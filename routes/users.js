var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const bcrypt = require('bcrypt'); // Ensures bcrypt package is accessible

var db = mysql.createConnection({
  database: 'fitsync',
});

db.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as guest');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* ABOVE IS JUST SETUP CODE */

let cur_user = null; // hardcoded for testing - will change.

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var query = 'SELECT password FROM users WHERE username = ?';
  db.query(query, [username], function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      return res.status(401).send('User not found');
    }

      var storedHash = results[0].password;

      bcrypt.compare(password, storedHash, function(err, isMatch) {
        if (err) {
          console.error(err);
          return res.status(500).send('Error comparing passwords');
        }

        if (isMatch) {
          // req.session.username = username;
          res.send('Login successful');
          cur_user = username;
        } else {
          res.status(401).send('Invalid password');
        }
      });
  });
});

  async function HashPassword(PlainPassword) {
    const hash = await bcrypt.hash(PlainPassword, 13);
    return hash;
  }

  router.post('/registration', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    // Calls HashPassword function to hash password
    let hashedPassword = await HashPassword(password);
    console.log("the hashed password is " + hashedPassword);

    var checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkQuery, [username], function(err, results) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      var insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
      db.query(insertQuery, [username, hashedPassword, email], function(err) {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ message: 'Failed to register user' });
        }

        res.status(200).json({ message: 'Registration successful' });
      });
    });
  });



// SEND WORKOUTS TO SAVED_EXERCISES TABLE
router.post('/save_exercise', (req, res) => {
  const exercise = req.body;

  console.log("User, ", cur_user, ", wants to save exercise ", exercise);

  // MYSQL QUERIES GO HERE
  // DATA SHOULD BE SENT TO SAVED_EXERCISES TABLE

  res.status(200).send('Exercise received and would be saved here.'); // once queries in place, this will be nested in if statement

});

// GET A USERS SAVED WORKOUTS (bringing up list)
router.get('/retrieve_exercises', (req, res) => {

});

// DELETE A SAVED WORKOUT (initiated from list)
router.delete('/delete_exercise', (req, res) => {

});

// UPDATE PROFILE INFORMATION
router.patch('/amend_profile', (req, res) => {

});
module.exports = router;
