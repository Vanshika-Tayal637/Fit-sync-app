var express = require('express');
var router = express.Router();
var path = require('path');

// const bcrypt = require('bcrypt'); // Ensures bcrypt package is accessible

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

module.exports = router;
