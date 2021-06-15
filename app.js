if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//import express handlebars
var expressHbs=require('express-handlebars');
//import mongoose
var mongoose=require('mongoose');
//import express session
var session=require('express-session');
//import passport
var passport=require('passport');
//import flash
var flash=require('connect-flash');
//import express-validator
// var validator=require('express-validator');
// const { body, validationResult } = require('express-validator');

// import connect-mongo
const MongoStore = require('connect-mongo');

//import stipre keys
const keys=require('./config/keys');
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

//import stripe payment gateway

const stripe = require('stripe')(keys.stripeSecretKey)



var routes = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();


mongoose.connect(keys.mongoURI,{useNewUrlParser:true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on("error",(err)=>console.error(error));
db.once('open',()=>console.log('Connected to Database ...'));

//run config-passport.js
require('./config/passport')

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs'}));
var Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.engine('.hbs', expressHbs({defaultLayout:'layout', extname:'.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}));

//set view engine to .hbs
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//use express-validator
// app.use(validator());

app.use(cookieParser());
//use express-session
// app.use(session({
//   secret:'mysupersecret',
//   resave:false,
//   saveUninitialized:false
// }));
app.use(session({
  secret:'mysupersecret',
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  // store: MongoStore.create({ mongoUrl: 'mongodb://localhost/shopping' }),
  cookie:{maxAge:180*60*1000}  // expired in 3 hour
}));
//use flash
app.use(flash());
//use passport.initialize
app.use(passport.initialize());
//use passport.session
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  next();
});

app.use('/user', userRoutes);
app.use('/', routes);


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
