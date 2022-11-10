var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var mongodb = require('mongodb')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var tennis = require("./models/tennis");

require('dotenv').config();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{
   useNewUrlParser: true,
   useUnifiedTopology: true
  });

var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tennisRouter = require('./routes/tennis');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tennis', tennisRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);

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
async function recreateDB(){
  // Delete everything
    await tennis.deleteMany();  
    let instance1 = new
    tennis({
      Player_Name:"Roger Federer",Player_Age :30,No_Of_Matches_Played:4
    });
    instance1.save( function(err,doc) {
        if(err) return console.error(err);
        console.log("First object saved")
      });

      let instance2 = new
    tennis({
      Player_Name:"Rafael Nadal",Player_Age :35,No_Of_Matches_Played:5
    
    });
    instance2.save( function(err,doc) {
        if(err) return console.error(err);
        console.log("Second object saved")
      });

      let instance3 = new
    tennis({
      Player_Name:"Andy Murray",Player_Age :25,No_Of_Matches_Played:6
    });
    instance3.save( function(err,doc) {
        if(err) return console.error(err);
        console.log("Third object saved")
      });
  }
  let reseed = true;
  if (reseed) { recreateDB();}

module.exports = app;
