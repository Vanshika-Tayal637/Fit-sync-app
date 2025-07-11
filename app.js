var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'fitsync'
});

var app = express();

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');


const session = require('express-session');

app.use(session({
  secret: 'ajd9283js!#LK@pwjwqz398sjqpq$!#zjx',
  resave: false,
  saveUninitialized: false
}));

// Middleware to attach db pool
app.use(function(req, res, next){
    req.pool = dbConnectionPool;
    next();
});

// Use logger and parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
