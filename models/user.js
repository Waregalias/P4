"use strict";
/* jshint node: true */
/* user model */
var mongoose  = require('mongoose');
var bcrypt    = require('bcryptjs');
var Schema    = mongoose.Schema;

/* Model User */
module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String
})); var User = mongoose.model('User');

/* MongoDB caller */
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};
