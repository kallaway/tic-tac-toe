"use strict";

// TODO: Maybe make it possible to generate a grid
// Should I use canvas?

// could be TEMP
let state = [
	[-1, -1, -1],
	[-1, -1, -1],
	[-1, -1, -1]
];


// GAME LOOP
// 1. Choose the sign: X or O
// - Should it randomly change what
// 2. User makes a move
// 3. Computer makes a move
// When someone wins, display feedback
// Restart the game at step 2.

let t3 = {
	state: [
		[-1, -1, -1],
		[-1, -1, -1],
		[-1, -1, -1]
	],
	isHumanTurn: true,
	// game object?
};

function aiMove() {
	// look at the state.
	// make decisions
}


$(document).ready() {
	draw();


	function draw() {
		// decide whose turn is it?
	}

	function update() {
		// update using the state.
	}


};
