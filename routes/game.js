"use strict";
/* jshint node: true */
/* jshint sub: true*/
/* jshint esversion:6*/
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
// =======================
// ======= Control =======
// =======================
function ligne(action) {
	let winner = '';
  let yellow = 0;
  let red = 0;
  let grille = JSON.parse(action);

  for(let x=0; x < grille.length; x++) {
    for(let y=0; y < grille[x].length; y++) {
      if(grille[x][y] !== '') {
        switch(grille[x][y]) {
          case 'yellow':
            yellow++;
            red = 0;
            break;
          case 'red':
            red++;
            yellow = 0;
            break;
        }
        if(yellow === 4) {
					winner = 'yellow';
        } else if(red === 4) {
					winner = 'red';
        }
      } else {
        yellow = 0;
        red = 0;
      }
    }
  }
	return winner;
} module.exports.ligne = ligne;

function colonne(action) {
	let winner = '';
  let yellow = 0;
  let red = 0;
  let grille = JSON.parse(action);

  for(let y=0; y <= 6; y++) {
    for(let x=0; x <= 5; x++) {
			// console.log(y,x);
      if(grille[x][y] !== '') {
        switch(grille[x][y]) {
          case 'yellow':
            yellow++;
            red = 0;
            break;
          case 'red':
            red++;
            yellow = 0;
            break;
        }
        //console.log('y&r', yellow, red);
        if(yellow === 4) {
          winner = 'yellow';
        } else if(red === 4) {
          winner = 'red';
        }
      } else {
        yellow = 0;
        red = 0;
      }
    }
		// console.log("--");
  }
	return winner;
} module.exports.colonne = colonne;

function diagonale(action, coord) {
	let winner = '';
  var yellow = 0;
  var red = 0;
  var grille = JSON.parse(action);

  // HAUT DROITE
  for(let i=0; i<4; i++) {
    if((grille[coord[0]-i]||[])[coord[1]+i] !== undefined) {
      if(grille[coord[0]-i][coord[1]+i] !== '') {
        switch(grille[coord[0]-i][coord[1]+i]) {
          case 'yellow':
            yellow++;
            red = 0;
            break;
          case 'red':
            red++;
            yellow = 0;
            break;
        }
        if(yellow === 4) {
					winner = 'yellow';
        } else if(red === 4) {
					winner = 'red';
        }
      } else {
        yellow = 0;
        red = 0;
      }
    }
    else {
      break;
    }
    return winner;
  }

  // BAS GAUCHE
  for(let i=0; i<4; i++) {
    if((grille[coord[0]+i]||[])[coord[1]-i] !== undefined) {
      if(grille[coord[0]+i][coord[1]-i] !== '') {
        switch(grille[coord[0]+i][coord[1]-i]) {
          case 'yellow':
            yellow++;
            red = 0;
            break;
          case 'red':
            red++;
            yellow = 0;
            break;
        }
				if(yellow === 4) {
					winner = 'yellow';
        } else if(red === 4) {
					winner = 'red';
        }
      } else {
        yellow = 0;
        red = 0;
      }
    }
    else {
      break;
    }
		return winner;
  }

	// HAUT GAUCHE
  // for(let i=0; i<4; i++) {
  //   //console.log(coord[0]+i, coord[1]-i);
  //   if((grille[coord[0]+i]||[])[coord[1]-i] !== undefined) {
  //     if(grille[coord[0]+i][coord[1]-i] !== '') {
  //       switch(grille[coord[0]+i][coord[1]-i]) {
  //         case 'yellow':
  //           yellow++;
  //           red = 0;
  //           break;
  //         case 'red':
  //           red++;
  //           yellow = 0;
  //           break;
  //       }
	// 			if(yellow === 4) {
	// 				winner = 'yellow';
  //       } else if(red === 4) {
	// 				winner = 'red';
  //       }
  //     } else {
  //       yellow = 0;
  //       red = 0;
  //     }
  //   }
  //   else {
  //     break;
  //   }
	// 	return winner;
  //   //console.log('--');
  // }
} module.exports.diagonale = diagonale;
