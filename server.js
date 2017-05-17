"use strict";
/* jshint node: true */
/* jshint sub: true*/
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
var bodyParser        = require('body-parser');
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var exphbs            = require('express-handlebars');
var expressValidator  = require('express-validator');
var flash             = require('connect-flash');
var session           = require('express-session');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var mongo             = require('mongodb');
var mongoose          = require('mongoose');
var config            = require('./config');
var routes            = require('./routes/index');
var users             = require('./routes/users');
var game              = require('./routes/game');
var io                = require('socket.io')(http);
// =======================
// ===== App Config ======
// =======================
app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.use('/public', express.static(__dirname + '/public'));

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.');
    var root    = namespace.shift();
    var formParam = root;
    while(namespace.length)
      formParam += '[' + namespace.shift() + ']';
    return {param : formParam, msg : msg, value : value};
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
// ======= Socket ========
// =======================
io.on('connection', function(socket){
  socket.on('create', function(room) {
    socket.join(room);
  });
  socket.on('join', function(room) {
    if(room !== "undefined" && room !== "null") {
      if(io.sockets.adapter.rooms[room].length === 1)
        socket.join(room);
    }
  });
  socket.on('action', function(room, action, coord){
    let winner = '';
    if(game.ligne(action) !== '')
      winner = game.ligne(action);
    if(game.colonne(action) !== '')
      winner = game.colonne(action);
    // if(game.diagonale(action, coord) !== '')
    //   winner = game.diagonale(action, coord);

    socket.to(room).emit('action', action);
    if(winner !== '')
      io.in(room).emit('winner', winner);
  });
  socket.on('leave', function(room) {
    socket.to(room).emit('leave', 'Votre adversaire a quitté la partie.');
  });
  socket.on('disconnect', function(room){
  });
});

// =======================
// ======= Routes ========
// =======================
app.use('/', routes);
app.use('/users', users);
app.use('/game', game);
app.get('/list', function (req, res) {
  res.end(JSON.stringify(io.sockets.adapter.rooms));
});

http.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
