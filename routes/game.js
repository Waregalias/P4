"use strict";
/* jshint node: true */
/* Game Routes Page. */
var express = require('express');
var router 	= express.Router();

// =======================
// ========= GET =========
// =======================
router.get('/new', function(req, res){
	res.render('game');
});
router.get('/join', function(req, res){
	res.render('game');
});
// =======================
// ======= Control =======
// =======================
router.prototype.control = function() {
	//console.log(action);
	console.log("test");
};

module.exports = router;
