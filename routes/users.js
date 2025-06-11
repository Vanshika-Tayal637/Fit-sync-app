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

  var query = 'SELECT user_id, password FROM users WHERE username = ?';
  db.query(query, [username], function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      return res.status(401).send('User not found');
    }

    var storedHash = results[0].password;
    var userId = results[0].user_id;

    bcrypt.compare(password, storedHash, function(err, isMatch) {
      if (err) {
        console.error(err);
        return res.status(500).send('Error comparing passwords');
      }

      if (isMatch) {
        req.session.user_id = userId;
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
      db.query(insertQuery, [username, hashedPassword, email], function(err, result) {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ message: 'Failed to register user' });
        }
        req.session.user_id = result.insertId;
        res.status(200).json({ message: 'Registration successful' });
      });
    });
  });

// SAVE EXERCISE DATA TO SAVED_EXERCISES AND EXERCISES TABLES
router.post('/save_exercise', (req, res) => {
  const { user_id } = req.session;
  const exercise = req.body; // entire workout
  const exercise_id = exercise.id;

  console.log("User", user_id, "wants to save exercise", exercise_id);

  if (!user_id) return res.status(401).send('Not logged in.');
  if (!exercise_id) return res.status(400).send('No exercise ID.');

  // ─── 1) Upsert into your `exercises` table
  const upsertExercise = `
    INSERT IGNORE INTO exercises
      (exercise_id, name, body_part, target_muscle, equipment, gif_url, instructions)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    upsertExercise,
    [
      exercise.id,
      exercise.name,
      exercise.bodyPart,
      exercise.target,
      exercise.equipment,
      exercise.gifUrl,
      JSON.stringify(exercise.instructions)
    ],
    (err) => {
      if (err) {
        console.error('Error saving to exercises:', err);
        return res.status(500).send('Failed to save exercise data.');
      }

      // Linking exercise to user_id in saved_exercises:
      const saveQuery = `
        INSERT INTO saved_exercises (user_id, exercise_id)
        VALUES (?, ?)
      `;
      db.query(saveQuery, [user_id, exercise_id], (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY')
            return res.status(400).send('Already saved.');
          console.error('Error saving to saved_exercises:', err);
          return res.status(500).send('Server error.');
        }
        res.send('Exercise saved.');
      });
    }
  );
});



// GET A USERS SAVED WORKOUTS (bringing up list)
router.get('/retrieve_exercises', (req, res) => {
  console.log("Retrieving exercises for ", cur_user);



});

// DELETE A SAVED WORKOUT (initiated from list)
router.delete('/delete_exercise', (req, res) => {

});

// UPDATE PROFILE INFORMATION
router.patch('/amend_profile', (req, res) => {

});
module.exports = router;
