var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var readers = require('./routes/readers');
var borrows = require('./routes/borrows');
var questions = require('./routes/questions');
var bookreaders = require('./routes/bookreaders');
var posts = require('./routes/posts');
var statistics = require('./routes/statistics');

console.log('app.js begins:')
// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'temp1234',
//   database : 'test'
// });

// connection.connect();

// connection.query('SELECT * from test.readers', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0]);
// });

// connection.end();



var app = express();
app.use(cors());
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'pub2')));

app.use('/', routes);
app.use('/users', users);
app.use('/books', books);
app.use('/readers', readers);
app.use('/borrows', borrows);
app.use('/questions', questions);
app.use('/bookreaders', bookreaders);
app.use('/posts', posts);
app.use('/statistics', statistics);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;