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

let t3 = {
	state: [
		[-1, -1, -1],
		[-1, -1, -1],
		[0, -1, 0]
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

	

	function findBestMove() {
		// look at the board
		let st = t3.state;
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

		// Find if there are rows where there is two computer symbols and none human's

		let topResult = {
			moveScore: 0,
			col: -1,
			row: -1
		}

		// Should it assign a score to a move?
		let moveScore = 0;
		// for each human

		// create a priority Matrix? or just use the current one. Calculate the moveScore for each cell based on the cells around it?

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

		/*
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

			// }
		}

		if (hCounterHuman == 0) {
			topCandidate = [rowI, i];
		} else if (hCounterAI == 1 && hCounterHuman == 0) {
			topCandidate = [rowI, i];
		} else if (hCounterAI == 2 && hCounterHuman == 0) {
			topCandidate = [rowI, i];
		}

		showMoveAI(topCandidate);
		console.log("The top coordinate candidate is:");
		console.log(topCandidate);

	*/

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
