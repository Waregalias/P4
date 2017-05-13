"use strict";
/* jshint node: true */
/* Index Routes Page. */
var express = require('express');
var router  = express.Router();

router.get('/', ensureAuthenticated, function(req, res) {
	res.render('home');
});

router.get('/home', function(req, res) {
  res.render('home');
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/home');
	}
}

module.exports = router;
