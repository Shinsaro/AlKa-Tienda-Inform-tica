var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index')(app);

 mongoose.connect('mongodb://localhost:27017/AlKaTiendaInformatica',function (err,res){
  if(!err)
    console.log('conectado a la base de datos');
  else
    console.log('error : ' + err);
});

module.exports = app;