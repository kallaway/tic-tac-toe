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
	aiSymbol: "1",
	humanSymbol: "1",
	// game object?
};

$(document).ready(function() {

	let $choiceX = $('.choice-x');
	let $choiceO = $('.choice-o');
	let $cells = $('.cell');

	console.log("ChoiceX:");
	console.log($choiceX);
	console.log("ChoiceO:");
	console.log($choiceO);


	function aiMove() {
		// look at the state.
		// make decisions
		let sym = t3.aiSymbol;

	}

	function establishSymbols() {

		$choiceO.on('click', function() {
			$(this).addClass('test-color-red');
			t3.humanSymbol = "o";
			t3.aiSymbol = "x";
			// close the
			activateGrid();
		});

		$choiceX.on('click', function() {
			$(this).addClass('test-color-red');
			t3.humanSymbol = "x";
			t3.aiSymbol = "o";
			activateGrid();
		});
		// what symbol do you want to use? X or 0?

		console.log("Chosen symbol is: " + t3.humanSymbol);
		// activateGrid();
	}

	function activateGrid() {
		let currentClass;
		if (t3.isHumanTurn) {
			currentClass = t3.humanSymbol == "x" ? '.fa-times' : '.fa-circle-o';
			// if (t3.humanSymbol = "o") {
			// 	currentClass = '.fa-circle-o';
			// } else {
			// 	currentClass = '.fa-times';
			// }

		} else {
			currentClass = t3.aiSymbol == "x" ? '.fa-times' : '.fa-circle-o';
		}

		$cells.on('click', function() {
			let $cell = $(this).find(currentClass);
			$cell.show();
			let row = $(this).val(data-row);
			row = parseInt(row) + 1;
			console.log("current row: " + row);
		});

		// $cells.forEach(function(cell) {
		// 	cell.on('click', function() {
		//
		// 	});
		// });
	}

	function chooseYourSymbol() {
		// display choosing part.
	}

	function init() {
		establishSymbols();
		// maybe this function should be run after.
		// activateGrid();
		draw();
	}

	init();

	// Approximate plan

	function draw() {
		// decide whose turn is it?

	}

	function reset() {

	}

	function update() {
		// update using the state.
	}

	function render() {

	}

});
