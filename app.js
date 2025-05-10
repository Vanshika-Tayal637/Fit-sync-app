var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Use logger and parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up the route handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;