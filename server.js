'use strict'
/* jshint node: true */
//*********************************************************//
//    Name: P4
//    Author: said mezhoud
//    GitHub: https://github.com/Waregalias
//    Description: Puissance 4 Application
//    version: .alpha 0.1.0
//*********************************************************//
// config include
var express       = require('express');
var app           = express();
var http          = require('http').Server(app);
var path          = require('path');
var routes        = require('./routes/routes');
var User          = require('./models/user');
var mongoose      = require('mongoose');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
let port = process.env.PORT || 3000;
// =======================
// === Express Config ====
// =======================
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.use('/controllers', express.static(__dirname + '/app/controllers'));
app.use('/public', express.static(__dirname + '/app/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
// =======================
// ======= Routes ========
// =======================
app.get('/login', routes.login);
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

http.listen(port, () => {console.log('\nPort:', port);});
