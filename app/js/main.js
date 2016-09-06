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

// Human Code Representation: 1
// AI Code Representation: 0
// Empty Cell Representation: -1

let t3 = {
	state: [
		[-1, -1, -1],
		[-1, -1, -1],
		[-1, -1, -1]
	],
	score: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	],
	isHumanTurn: true,
	aiSymbol: "1",
	humanSymbol: "1",
	isFinished: false,
	whoWon: "nobody",
	winningCells: []
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
			if (t3.state[row][col] != 0) {
				console.log("Check of the cell was successful. Apparently, this cell was not affected by AI");
				t3.state[row][col] = 1;
				$cell.show();

				var gameStatus = checkGameStatus();
				console.log("GAME STATUS: ");
				console.log(gameStatus);
				console.log("Type of Game Status - " + typeof gameStatus);

				// for human turn - move to its own function
				if (typeof gameStatus == 'object') {
					for (var i = 0; i < 3; i++) {
						var testCellRow = gameStatus.cellInfo[i][0];
						var testCellCol = gameStatus.cellInfo[i][1];

						let cell = $('[data-row="' + (testCellRow+1) +  '"][data-col="' + (testCellCol+1) +  '"]');
						cell.addClass("highlight-test");
						setTimeout(function() {
							cell.removeClass("highlight-test");
						}, 2000);
					}

				}

				console.log("State before AI move");
				printGridState();
				makeRandomMove(); // comp
				gameStatus = checkGameStatus();

				// for comp turn - move to its own function
				if (t3.winningCells.length) {
				// if (typeof gameStatus == 'object') {
					t3.isFinished = true; // needed?
					// t3.whoWon = gameStatus.who;

					// Should this be a part of reset game function? no - it should be its own function
					for (var i = 0; i < 3; i++) {
						var testCellRow = t3.winningCells[i][0];
						var testCellCol = t3.winningCells[i][1];

						let cell = $('[data-row="' + (testCellRow+1) +  '"][data-col="' + (testCellCol+1) +  '"]');
						cell.addClass("highlight-test");
						setTimeout(function() {
							cell.removeClass("highlight-test");
						}, 2000);

						setTimeout(function() {
							resetGame();
							return;
						}, 2000);

					}


				}

				// have a function for highlighting the cell here ->
				// for now just do the test
				// then the game should stop if this function gets run? or inside of it

				console.log(gameStatus);
				// findBestMove(); // rename this function
				console.log("State after AI move");
				printGridState();
			}

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

	function makeRandomMove() {
		randomIndexes = [];
		for (var i = 0; i < t3.state.length; i++) {
			for (var j = 0; j < t3.state[i].length; j++) {
				if (t3.state[i][j] === -1) { // ?
					randomIndexes.push([i, j]);
				}
			}
		}

		if (!randomIndexes.length) {
			// Do something when there are no more options to draw.
		}
		console.log("Random indexes left: ");
		console.log(randomIndexes);

		let randomChoice = Math.floor(Math.random() * randomIndexes.length);
		console.log("Randomly chosen cell in the t3 grid is: " + randomIndexes[randomChoice][0] + " and " + randomIndexes[randomChoice][1]);
		// t3.state[randomIndexes[randomChoice][0]][randomIndexes[randomChoice[1]]]);

		let randomCoords = [ randomIndexes[randomChoice][0], randomIndexes[randomChoice][1] ];
		t3.state[ randomIndexes[randomChoice][0] ][ randomIndexes[randomChoice][1] ] = 0;

		showMoveAI(randomCoords);
	}

	function checkGameStatus() {
		// check whether there is any kind of win or tie on the grid.
		var doWeHaveAWin = false;

		// horizontal check
		// t3.state.map(function(row) {
		// 	var human = 0;
		// 	var comp = 0;
		// 	row.filter(function(cell) {
		//
		// 		if (cell == 1) { human++ }
		// 		if (cell == 0) { comp++ }
		// 	});
		//
		// 	if (human == 3) {
		// 		return []
		// 	}
		// })

		// Change this to something more elegant!

		// HORZ CHECK
		for (var i = 0; i < t3.state.length; i++) {
			var human = 0;
			var comp = 0;

			var internalLength = t3.state[i].length;
			for (var j = 0; j < internalLength; j++) {
				var cell = t3.state[i][j];
				if (cell == 1) {
					human++;
				} else if (cell == 0){
					comp++;
				}
			} // end of internal FOR loop

			console.log("#######");
			console.log("HORZ CHECK:")
			console.log("HUMAN: " + human);
			console.log("COMP: " + comp);

			if (human === 3 || comp === 3) { // improve this code.
				t3.winningCells = [ [i, 0], [i, 1], [i, 2] ];
			}

			t3.whoWon = human === 3 ? 'human' : t3.whoWon;
			t3.whoWon = comp === 3 ? 'comp' : t3.whoWon;

			if (human === 3) {
				return {
					cellInfo: [[i, 0], [i, 1], [i, 2]],
					who: 'human'
				}

				// t3.winningCells = [[i, 0], [i, 1], [i, 2]];
				// t3.whoWon = 'human';
			}

			if (comp === 3) {
				return {
					cellInfo: [[i, 0], [i, 1], [i, 2]],
					who: 'comp'
				}

				// t3.winningCells = [[i, 0], [i, 1], [i, 2]];
				// t3.whoWon = 'comp';
			}

		} // end of external FOR loop


		// VERT CHECK

		for (var i = 0; i < t3.state.length; i++) {
			var human = 0;
			var comp = 0;

			var internalLength = t3.state[i].length;
			for (var j = 0; j < internalLength; j++) {
				var cell = t3.state[j][i];
				if (cell == 1) {
					human++;
				} else if (cell == 0){
					comp++;
				}
			} // end of internal FOR loop

			console.log("VERT CHECK:")
			console.log("HUMAN: " + human);
			console.log("COMP: " + comp);

			if (human === 3 || comp === 3) {
				t3.winningCells = [[0, i], [1, i], [2, i]];
			}

			t3.whoWon = human === 3 ? 'human' : t3.whoWon;
			t3.whoWon = comp === 3 ? 'comp' : t3.whoWon;

			if (human === 3) {
				return {
					cellInfo: [[0, i], [1, i], [2, i]],
					who: 'human'
				}

				// t3.winningCells = [[0, i], [1, i], [2, i]];
				// t3.whoWon = 'comp';
			}

			if (comp === 3) {
				return {
					cellInfo: [[0, i], [1, i], [2, i]],
					who: 'comp'
				}

				// t3.winningCells = [[0, i], [1, i], [2, i]];
				// t3.whoWon = 'comp';
			}

			} // end of external FOR loop

		// DIAGONAL CHECKS

		// TOP-LEFT -> BOTTOM-RIGHT

		var human = 0;
		var comp = 0;
		for (var i = 0; i < t3.state.length; i++) {
			// var human = 0;
			// var comp = 0;

			if (t3.state[i][i] == 1) { human++ }
			if (t3.state[i][i] == 0) { comp++ }
		}

		console.log("TOP-LEFT BOTTOM-RIGHT CHECK:")
		console.log("HUMAN: " + human);
		console.log("COMP: " + comp);

		if (human === 3 || comp === 3) {
			t3.winningCells = [ [0,0], [1,1], [2,2] ];
		}

		t3.whoWon = human === 3 ? 'human' : t3.whoWon;
		t3.whoWon = comp === 3 ? 'comp' : t3.whoWon;

		if (human == 3) {
			return {
				cellInfo: [[0,0], [1,1], [2,2]],
				who: 'human'
			}
		} else if (comp == 3) {
			return {
				cellInfo: [[0,0], [1,1], [2,2]],
				who: 'comp'
			}
		}

		// BOTTOM-LEFT -> TOP-RIGHT


		var human = 0;
		var comp = 0;

		var currCell = t3.state[0][2];
		if (currCell == 1) {
			human++;
		} else if (currCell == 0) {
			comp++;
		}

		currCell = t3.state[1][1];
		if (currCell == 1) {
			human++;
		} else if (currCell == 0) {
			comp++;
		}

		currCell = t3.state[2][0];
		if (currCell == 1) {
			human++;
		} else if (currCell == 0) {
			comp++;
		}

		console.log("BOTTOM-LEFT TOP-RIGHT CHECK:")
		console.log("HUMAN: " + human);
		console.log("COMP: " + comp);

		if (human === 3 || comp === 3) {
			t3.winningCells = [ [0,2], [1,1], [2,0] ];
		}

		t3.whoWon = human === 3 ? 'human' : t3.whoWon;
		t3.whoWon = comp === 3 ? 'comp' : t3.whoWon;

		if (human == 3) {
			return {
				cellInfo: [[0,2], [1,1], [2,0]],
				who: 'human'
			}
		} else if (comp == 3) {
			return {
				cellInfo: [[0,2], [1,1], [2,0]],
				who: 'comp'
			}
		}

		return "nobody won yet";

	} // end of checkGameStatus

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

	function resetGame() {
		t3.state = t3.state.map(function(row) {
			return row.map(function(cell) {
				return -1;
			});
		});
		console.log("State of the game after it's been cleaned");
		console.log(t3.state);
		// show symbol to choose?

		// remove all the classes that enable signs to show
		cleanGrid();
	}

	function cleanGrid() {
		$('.fa-times').hide();
		$('.fa-circle-o').hide();
	}

	function showMoveAI(coords) {
		setTimeout(function() {
			console.log("Show Move AI runs, with the following coordinates: ");
			console.log(coords);
			// find the right element
			let cell = $('[data-row="' + (coords[0]+1) +  '"][data-col="' + (coords[1]+1) +  '"]'); // $("#grid").find('[data-row="' + (coords[0]+1) +  '"]'); // .find('[data-col="' + (coords[1]+1) +  '"]');
			console.log(cell);
			cell.find(t3.aiClass).fadeIn();
			cell.addClass("test-color-red"); // maybe delete this?
		}, 500);
	}

	function init() {
		establishSymbols();
		// maybe this function should be run after.
		// activateGrid();
		draw(); // ?
	}

	init(); // is this needed at all?

	// Approximate plan

	function draw() {
		// decide whose turn is it?

	}

});
