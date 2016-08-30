"use strict";

// TODO: Maybe make it possible to generate a grid
// Should I use canvas?

// could be TEMP
let state = [
	[-1, -1, -1],
	[-1, -1, -1],
	[0, -1, 0]
];


// GAME LOOP
// 1. Choose the sign: X or O
// - Should it randomly change what
// 2. User makes a move
// 3. Computer makes a move
// When someone wins, display feedback
// Restart the game at step 2.

// Human Code Representation: 1
// AI Code Representation: 0
// Empty Cell Representation: -1

// Maybe use a canvas

let t3 = {
	state: [
		[-1, -1, -1],
		[-1, -1, -1],
		[0, -1, 0]
	],
	score: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
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
	let randomIndexes = [];

	let $chooseSide = $('#choose-side');
	let $grid = $('#grid');

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

			$chooseSide.hide();
			$grid.show();
		});

		$choiceX.on('click', function() {
			$(this).addClass('test-color-red');
			t3.humanSymbol = "x";
			t3.aiSymbol = "o";
			t3.humanClass = '.fa-times';
			t3.aiClass = '.fa-circle-o';
			activateGrid();

			$chooseSide.hide();
			$grid.show();
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
			makeRandomMove();
			// findBestMove(); // rename this function
			console.log("State after AI move");
			printGridState();
		});

	}

	function printGridState() {
		let stateString = "----------------\n| ";
		for (var i = 0; i < t3.state.length; i++) {
			for (var j = 0; j < t3.state[i].length; j++) {
				var stateStringHelper;
				if (t3.state[i][j] == -1) {
					stateStringHelper = "*";
				} else if (t3.state[i][j] === 1) {
					stateStringHelper = "U"; // User
				} else {
					stateStringHelper = "C"; // Computer
				}

				stateString += stateStringHelper  + " | ";
			}
			stateString += "\n| ";
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

	function makeRandomMove() {
		randomIndexes = [];
		for (var i = 0; i < t3.state.length; i++) {
			for (var j = 0; j < t3.state[i].length; j++) {
				if (t3.state[i][j] === -1) { // ?
					randomIndexes.push([i, j]);
				}
			}
		}

		let randomChoice = Math.floor(Math.random() * randomIndexes.length);
		console.log("Randomly chosen cell in the t3 grid is: " + randomIndexes[randomChoice][0] + " and " + randomIndexes[randomChoice][1]);
		// t3.state[randomIndexes[randomChoice][0]][randomIndexes[randomChoice[1]]]);

		let randomCoords = [ randomIndexes[randomChoice][0], randomIndexes[randomChoice][1] ];
		t3.state[ randomIndexes[randomChoice][0] ][ randomIndexes[randomChoice][1] ] = 0;

		showMoveAI(randomCoords);
	}

/*
	function findBestMove() {
		// look at the board
		let st = t3.state;
		let sc = t3.score;
		let coords = [-1, -1];

		// if the middle is still empty, fill it
		if (st[1][1] == -1) {
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

		let emptyRow;
		let emptyCol;

		let topResult = {
			moveScore: 0,
			col: -1,
			row: -1
		}

		// Should it assign a score to a move?
		let moveScore = 0;
		// for each human

		// create a priority Matrix? or just use the current one. Calculate the moveScore for each cell based on the cells around it?

		// HORIZONTAL CHECK
		for (var rowJ = 0; rowJ < sc.length; rowJ++) {
			let line = st[rowJ]; // checking against the actual values in the matrix
			for (var j = 0; j < line.length; j++) {

				// maybe instead calculate what possibilities does a row have and then only look at whether the cell is open or not.

				console.log("HORZ: Currently, the ROW J is: " + rowJ + " and J is: " + j);
				console.log("The value inside of the SCORE for the t3.score[rowJ][j] is " + t3.score[rowJ][j]);

				// checking the first column
				if (j == 0) {
					if (line[j+1] == 0) {
						sc[line][j] += 5;
					}

					if (line[j+2] == 0) {
						sc[line][j] += 5;
					}
				}

				// checking the second column
				if (j == 1) {
					if (line[j-1] == 0) {
						sc[line][j] += 5;
					}

					if (line[j+1] == 0) {
						sc[line][j] += 5;
					}
				}

				// checking the third column
				if (j == 2) {
					if (line[j-2] == 0) {
						sc[line][j] += 5;
					}

					if (line[j-1] == 0) {
						sc[line][j] += 5;
					}
				}
			}
		}

		// VERTICAL
		for (var rowK = 0; rowK < sc.length; rowK++) {
			let line = st[rowK]; // checking against the actual values in the matrix
			for (var k = 0; k < line.length; k++) {


				if (k == 0) {
					if (line[rowK][k] == 0) {

					}
				}

			}
		}


		console.log("Now let's take a look into the scores of the cells");
		console.log(t3.score);

		// horizontal
		console.log("AI potential move evaluation runs");
		for (var rowI = 0; rowI < st.length; rowI++) {
			let line = st[rowI];
			hCounterAI = 0;
			hCounterHuman = 0;
			for (var i = 0; i < line.length; i++) {
				if (line[i] == 0) {
					hCounterAI++;
				} else if (line[i] == 1) {
					hCounterHuman++;
				} else {
					emptyCol = i;
					emptyRow = rowI;
				}


				if (hCounterAI == 2 && hCounterHuman == 0) {
					topCandidate = [emptyRow, emptyCol];
					console.log("Current test runs!");
					console.log("When successful, emptyRow is " + emptyRow + " and emptyCol is " + emptyCol);
					coords = [emptyRow][emptyCol];
					showMoveAI(topCandidate);
					return;
				}
			}
		}

	}
*/

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
