'use strict'
/* jshint node: true */
/* jshint esversion:6*/
//*********************************************************//
//    Name: P4
//    Author: said mezhoud
//    GitHub: https://github.com/Waregalias
//    Description: Puissance 4 Application
//    version: .alpha 0.1.0
//*********************************************************//
var express           = require('express');
var app               = express();
var http              = require('http').Server(app);
var path              = require('path');
var index             = require('./routes/index');
var auth              = require('./routes/auth');
var config            = require('./config');

var mongo             = require('mongodb');
var mongoose          = require('mongoose');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var bodyParser        = require('body-parser');
var cookieParser      = require('cookie-parser');
var exphbs            = require('express-handlebars');
var expressValidator  = require('express-validator');
var flash             = require('connect-flash');
var session           = require('express-session');
// =======================
// ===== App Config ======
// =======================
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'secret',saveUninitialized: true,resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;
    while(namespace.length){ formParam += '[' + namespace.shift() + ']'; }
    return { param : formParam, msg   : msg, value : value };
  }
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// =======================
// ======= Routes ========
// =======================
app.use('/', index);
app.use('/auth', auth);

http.listen(app.get('port'), () => {console.log('\nPort:', app.get('port'));});
