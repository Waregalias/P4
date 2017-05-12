"use strict";
/* jshint node: true */
/* GET Routes page. */

var express = require('express');
var path    = require('path');
var app     = express();

function login(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'login.html'));
} exports.login = login;

function signup(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'signup.html'));
} exports.signup = signup;

function board(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'board.html'));
} exports.board = board;
