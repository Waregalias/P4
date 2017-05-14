"use strict";
/* jshint node: true */
/* Users Routes Page. */
var express 			= require('express');
var app						= express();
var router 				= express.Router();
var passport 			= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User 					= require('../models/user');
var session       = require('express-session');

// =======================
// ========= GET =========
// =======================
router.get('/login', function(req, res){
	res.render('login');
});
router.get('/register', function(req, res){
	res.render('register');
});

// =======================
// ======== POST =========
// =======================
// router.post('/login', passport.authenticate('local', {
// 	successRedirect:'/',
// 	failureRedirect:'/users/login',
// 	failureFlash: true}), function(req, res) {
// 		res.redirect('/');
//   }
// );
router.post('/login', passport.authenticate('local'),
  function(req, res) {
		res.cookie('connect.usr', req.user.username); // no session
    res.redirect('/');
  });
router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	req.checkBody('username', 'Identifiant invalide').notEmpty();
	req.checkBody('password', 'Mot de passe invalide').notEmpty();
	req.checkBody('password2', 'Les mots de passe sont différents').equals(req.body.password);
	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			username: username,
			password: password
		});
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
		req.flash('success_msg', 'Inscription réussi, vous pouvez vous connecter.');
		res.redirect('/users/login');
	}
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'Vous êtes déconnecté.');
	res.redirect('/users/login');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Utilisateur inconnu'});
   	}
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Mot de passe incorrect'});
   		}
   	});
   });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
