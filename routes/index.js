var express = require('express');
var router = express.Router();
var path = require('path');

// GET login page
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});


// router function which waits for registration requests.
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log(`Received: ${username}`);

    // Hash password code go here:



    let database_response = false;

    // INSERT CODE TO PUT INTO DATABASE. Switch to true once success received.


    if(database_response === true){
      res.status(200).json({ message: "Registration successful!" });

    }
    else {
    res.status(500).json({message: "Unsuccessful"});
    }

});

module.exports = router;
