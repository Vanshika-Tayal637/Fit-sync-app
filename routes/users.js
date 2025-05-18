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

    // clear password login **
    // var storedPassword = results[0].password;

    // if (password === storedPassword) {

    //   res.send('Login successful');
    // } else {
    //   res.status(401).send('Invalid password');

    // hashed password login **

      var storedHash = results[0].password;

      bcrypt.compare(password, storedHash, function(err, isMatch) {
        if (err) {
          console.error(err);
          return res.status(500).send('Error comparing passwords');
        }

        if (isMatch) {
          // req.session.username = username;
          res.send('Login successful');
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
  let HashedPassword = await HashPassword(password);
  console.log("the hashed password is " + HashedPassword);

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
    db.query(insertQuery, [username, HashedPassword, email], function(err) {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ message: 'Failed to register user' });
      }

      res.status(200).json({ message: 'Registration successful' });
    });
  });
});

// router.get('/home', function(req, res) {
//   if (!req.session || !req.session.username) {
//     return res.redirect('/');
//   }


module.exports = router;
