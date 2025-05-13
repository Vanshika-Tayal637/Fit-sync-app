var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.use(express.static(path.join(__dirname, 'public')));


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/Users/gryff/Documents/University of Adelaide/2025 S1/Web & Database Computing/Practicals/Repositories/25S1_WDC_UG_Groups_52/public/index.html'));
});

module.exports = router;
