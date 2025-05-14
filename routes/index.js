var express = require('express');
var router = express.Router();
var path = require('path');

const bcrypt = require('bcrypt'); //ensures bcrypt package is accessible

// GET login page
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// accessing database connection
router.get('/result', function(req, res){
  req.pool.getConnection(function(err,connection){
    if(err) {
      res.sendStatus(500);
      return;
    }
  });
});

// Hashing Function - Async as it uses await
async function HashPassword(PlainPassword) {
  const hash = await bcrypt.hash(PlainPassword, 13);
  return hash;

}

// router function which waits for registration requests.
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    console.log(`Received: ${username}`);

    // Calls HashPassword function to hash password
    let HashedPassword = await HashPassword(password);
    console.log("the hashed password is " + HashedPassword);

    let database_response = false;

    // Query commands to send data to database. (send HashedPassword, not password)

    // If done successfully, switch database_response to true so reply is sent back to client.

    if(database_response === true){
      res.status(200).json({ message: "Registration successful!" });
    }else {
    res.status(500).json({ message: "Unsuccessful" });
    }

});

module.exports = router;
