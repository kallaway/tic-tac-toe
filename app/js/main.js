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

	function establishSymbols() {

		$choiceO.on('click', function() {
			$(this).addClass('test-color-red');
			t3.humanSymbol = "o";
			t3.aiSymbol = "x";
			t3.humanClass = '.fa-circle-o';
			t3.aiClass = '.fa-times';
			// close the
			activateGrid();
		});

		$choiceX.on('click', function() {
			$(this).addClass('test-color-red');
			t3.humanSymbol = "x";
			t3.aiSymbol = "o";
			t3.humanClass = '.fa-times';
			t3.aiClass = '.fa-circle-o';
			activateGrid();
		});
		// what symbol do you want to use? X or 0?

		console.log("Chosen symbol is: " + t3.humanSymbol);
		// activateGrid();
	}

	function activateGrid() {
		let currentClass;
		// if (t3.isHumanTurn) {
		// 	currentClass = t3.humanSymbol == "x" ? '.fa-times' : '.fa-circle-o';
		// 	// if (t3.humanSymbol = "o") {
		// 	// 	currentClass = '.fa-circle-o';
		// 	// } else {
		// 	// 	currentClass = '.fa-times';
		// 	// }
		//
		// } else {
		// 	currentClass = t3.aiSymbol == "x" ? '.fa-times' : '.fa-circle-o';
		// }

		$cells.on('click', function() {
			let $cell = $(this).find(t3.humanClass);
			$cell.show();
			let row = $(this).data("row");
			row = parseInt(row) - 1;
			console.log("current row: " + row);

			let col = $(this).data("col");
			col = parseInt(col) - 1;
			console.log("current col: " + col);

			t3.state[row][col] = 1;

			findBestMove();
		});

		// $cells.forEach(function(cell) {
		// 	cell.on('click', function() {
		//
		// 	});
		// });
	}

	function humanMove() {

	}

	function aiMove() {
		// look at the state.

		// make decisions
		let sym = t3.aiSymbol;

	}

	function findBestMove() {
		// look at the board
		let st = t3.state;
		let coords = [-1, -1];

		if (st[1][1] != 1) {
			st[1][1] = 0;
			coords = [1][1];
			showMoveAI([1, 1]);
		}



	}

	function showMoveAI(coords) {
		setTimeout(function() {
			console.log("Show Move AI runs, with the following coordinates: ");
			console.log(coords);
			// find the right element
			let cell = $('[data-row="' + (coords[0]+1) +  '"][data-col="' + (coords[0]+1) +  '"]'); // $("#grid").find('[data-row="' + (coords[0]+1) +  '"]'); // .find('[data-col="' + (coords[1]+1) +  '"]');
			console.log(cell);
			cell.find(t3.aiClass).fadeIn();
			cell.addClass("test-color-red");
		}, 500);
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
