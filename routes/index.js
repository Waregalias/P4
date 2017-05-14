"use strict";
/* jshint node: true */
/* Index Routes Page. */
var express = require('express');
var router 	= express.Router();

// =======================
// ========= GET =========
// =======================
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});
// =======================
// ======= Control =======
// =======================
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.render('home');
	}
}

module.exports = router;
