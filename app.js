console.log("Hello");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var upload = require('express-fileupload');
var cors = require('cors');

// DB
var MongoClient = require('mongodb').MongoClient;
var user = 'yoni';
// var password = 'ZwLv6Hrkkkq2';
var password = '1234';
var url = "mongodb://"+user+":"+password+"@localhost:27017/mydb";
//mongodb://username:password@localhost:27017/exampledatabase
global.globalDb;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Mongo Connected");
    globalDb = db.db("mydb");
    var myobj = { name: "Guns Show", location: "Highway 37", date: new Date() };
    // dbo.collection("events").insertOne(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });
});

console.log("Hello");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var eventsRouter = require('./routes/events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use(upload());
app.use(cors());


//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/events', eventsRouter);
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', function(req, res) {
    res.sendfile('./client/dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
