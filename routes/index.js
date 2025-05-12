var express = require('express');
var router = express.Router();
var path = require('path');

// GET login page
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received registration:', { username, email, password });

  // Add database logic here later

  // For now, just respond with success if username isn't empty
  if (username !== "") {
    res.send("Registration received :)");
  }

});

module.exports = router;