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

module.exports = router;
