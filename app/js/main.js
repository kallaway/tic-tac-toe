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

		function playOneTurn() {

		}

		$cells.on('click', function() {
			let $cell = $(this).find(t3.humanClass);

			let row = $(this).data("row");
			row = parseInt(row) - 1;
			console.log("current row: " + row);

			let col = $(this).data("col");
			col = parseInt(col) - 1;
			console.log("current col: " + col);
			if (state[row][col] != 0) {
				console.log("Check of the cell was successful. Apparently, this cell was not affected by AI");
				t3.state[row][col] = 1;
				$cell.show();
			}

			console.log("State before AI move");
			printGridState();
			findBestMove(); // rename this function
			console.log("State after AI move");
			printGridState();
		});

		// $cells.forEach(function(cell) {
		// 	cell.on('click', function() {
		//
		// 	});
		// });
	}

	function printGridState() {
		let stateString = "----------------\n| ";
		for (var i = 0; i < t3.state.length; i++) {
			for (var j = 0; j < t3.state[i].length; j++) {
				stateString += t3.state[i][j] + " | ";
			}
			stateString += "\n|";
		}
		stateString += "----------------";

		console.log("State:");
		console.log(stateString);
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

		// if the middle is still empty, fill it
		if (st[1][1] != 1 && st[1][1] != 0) {
			st[1][1] = 0;
			coords = [1][1];
			showMoveAI([1, 1]);
			return;
		}

		let topCandidate = [-1, -1];

		let hCounterAI = 0;
		let hCounterHuman = 0;
		let counterOpp = 0;
		let currentRow = 0;

		let emptyInRow = 0;

		// horizontal check
		for (var rowI = 0; rowI < st.length; rowI++) {
			let line = st[rowI];
			for (var i = 0; i < line.length; i++) {
				if (line[i] == 0) {
					hCounterAI++;
				} else if (line[i] == 1) {
					hCounterHuman++;
				} else {

				}

			}
			// After first loop, after one line
			// if (rowI != 0 && i != 0) {
				if (hCounterHuman == 0) {
					topCandidate = [rowI, i];
				} else if (hCounterAI == 1 && hCounterHuman == 0) {
					topCandidate = [rowI, i];
				} else if (hCounterAI == 2 && hCounterHuman == 0) {
					topCandidate = [rowI, i];
				}
			// }

		}

		showMoveAI(topCandidate);
		console.log("The top coordinate candidate is:");
		console.log(topCandidate);


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
