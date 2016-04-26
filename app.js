var express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
expressSession = require('express-session'),
flash = require('connect-flash'),
passport = require('passport'),
multipart = require('connect-multiparty');
var app = express();


// view engine setup
/*app.set('views', path.join(__dirname, 'views'));*/
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multipart());

// Express Session
app.use(expressSession({secret: 'AlKaTiendaInformatica',resave: true,saveUninitialized: true,}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require('./routes/controller')(app,passport);
require('./routes/passport')(passport);

 mongoose.connect('mongodb://localhost:27017/AlKaTiendaInformatica',function (err,res){
  if(!err)
    console.log('Conectado a la base de datos AlKaTiendaInformatica');
  else
    console.log('error : ' + err);
});

module.exports = app;