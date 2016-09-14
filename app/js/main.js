"use strict";

// TODO: Maybe make it possible to generate a grid
// Should I use canvas?

// could be TEMP
let state = [
	[-1, -1, -1],
	[-1, -1, -1],
	[-1, -1, -1]
];

// TODO Resolve the issue with the highlighting of human moves
// TODO Make sure nobody can make a move after the game was finished
// TODO Should the players be able to choose their symbol each time a game starts?
// TODO When nobody wins, make the game restart itself anyway
// TODO Human move should also be displayed slowly
// TODO Grid starts off grey? then when activates it changes color to the correct one?


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

	let $choiceX = $('.choice-x'),
	$choiceO = $('.choice-o'),
	$cells = $('.cell'),
	$chooseSide = $('#choose-side'),
	$grid = $('#grid'),
	$compWon = $('#comp-won'),
	$humanWon = $('#human-won'),
	$status = $('#game-status'),
	randomIndexes = [];

	console.log("ChoiceX:");
	console.log($choiceX);
	console.log("ChoiceO:");
	console.log($choiceO);

	function establishSymbols() {

		$choiceO.on('click', function() {
			$(this).addClass('comp-move-color');
			t3.humanSymbol = "o";
			t3.aiSymbol = "x";
			t3.humanClass = '.fa-circle-o';
			t3.aiClass = '.fa-times';
			activateGrid();

			$chooseSide.slideUp();
			$grid.slideDown();
		});

		$choiceX.on('click', function() {
			$(this).addClass('comp-move-color');
			t3.humanSymbol = "x";
			t3.aiSymbol = "o";
			t3.humanClass = '.fa-times';
			t3.aiClass = '.fa-circle-o';
			activateGrid();

			$chooseSide.slideUp();
			$grid.slideDown();
		});
		// what symbol do you want to use? X or 0?

		console.log("Chosen symbol is: " + t3.humanSymbol);
		// activateGrid();
	}

	function activateGrid() {
		let currentClass;
		$cells.on('click', function() {
			var clickedCell = this;
			runGameLoop(clickedCell);
		});

	}

	function runGameLoop(clickedCell) {
		// the main GAME LOOP
		let $cell = $(clickedCell).find(t3.humanClass);

		let row = $(clickedCell).data("row");
		row = parseInt(row) - 1;
		console.log("current row: " + row);

		let col = $(clickedCell).data("col");
		col = parseInt(col) - 1;
		console.log("current col: " + col);

		if (t3.state[row][col] != 0) {
			console.log("Check of the cell was successful. Apparently, this cell was not affected by AI");
			t3.state[row][col] = 1;
			$cell.show();

			// This should be changed.
			var gameStatus = checkGameStatus();
			console.log("GAME STATUS: ");
			console.log(gameStatus);
			console.log("Type of Game Status - " + typeof gameStatus);

			// for human turn - move to its own function
			if (t3.whoWon !== 'nobody') {
				for (var i = 0; i < 3; i++) {
					var testCellRow = t3.winningCells[i][0];
					var testCellCol = t3.winningCells[i][1];

					let cell = $('[data-row="' + (testCellRow+1) +  '"][data-col="' + (testCellCol+1) +  '"]');
					cell.addClass("highlight-test");
					setTimeout(function() {
						cell.removeClass("highlight-test");
					}, 2000);
				}

			}

			setTimeout(500); // Delay to make the game more enjoyable

			console.log("State before AI move");
			$status.text("Computer's turn.");
			printGridState();
			makeRandomMove(); // comp
			gameStatus = checkGameStatus();

			// for comp turn - move to its own function
			if (t3.winningCells.length) {
				t3.isFinished = true; // needed?

				// Should this be a part of reset game function? no - it should be its own function
				for (var i = 0; i < 3; i++) {
					var testCellRow = t3.winningCells[i][0];
					var testCellCol = t3.winningCells[i][1];

					let cell = $('[data-row="' + (testCellRow+1) +  '"][data-col="' + (testCellCol+1) +  '"]');
					cell.addClass("highlight-test");
					setTimeout(function() {
						cell.removeClass("highlight-test");
						showWhoWon()
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
			console.log("State after AI move");
			printGridState();
		}
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
			// $status.text("It's a tie!");
		}
		console.log("Random indexes left: ");
		console.log(randomIndexes);

		let randomChoice = Math.floor(Math.random() * randomIndexes.length);
		console.log("Randomly chosen cell in the t3 grid is: " + randomIndexes[randomChoice][0] + " and " + randomIndexes[randomChoice][1]);
		// t3.state[randomIndexes[randomChoice][0]][randomIndexes[randomChoice[1]]]);

		let randomCoords = [ randomIndexes[randomChoice][0], randomIndexes[randomChoice][1] ];
		t3.state[ randomIndexes[randomChoice][0] ][ randomIndexes[randomChoice][1] ] = 0;

		showMoveAI(randomCoords);
		setTimeout(function() {
			$status.text("Your turn.");
		}, 1500);
	}

	function checkGameStatus() {
		// check whether there is any kind of win or tie on the grid.
		var doWeHaveAWin = false; // needed?

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

		return "nobody won yet";

	} // end of checkGameStatus

	function resetGame() {
		t3.whoWon = 'nobody';
		t3.winningCells = [];
		t3.state = t3.state.map(function(row) {
			return row.map(function(cell) {
				return -1;
			});
		});
		console.log("State of the game after it's been cleaned");
		console.log(t3.state);
		// show symbol to choose?
		cleanGrid();
	}

	function showWhoWon() {
		console.log("Show who won function runs");
		if (t3.whoWon == 'human') {
			$status.text("Victory is yours!");
			// $humanWon.display = block;
			// $humanWon.show().delay(3000).hide(); // redo it so it blinks?
		} else if (t3.whoWon == 'comp'){
			$status.text("Computer won!");
			// $compWon.display = block;
			// $compWon.show().delay(3000).hide();
		}
	}

	function cleanGrid() {
		$('.fa-times').hide();
		$('.fa-circle-o').hide();
		$('.cell').removeClass("comp-move-color");
	}

	function showMoveAI(coords) {
		setTimeout(function() {
			console.log("Show Move AI runs, with the following coordinates: ");
			console.log(coords);
			// find the right element
			let cell = $('[data-row="' + (coords[0]+1) +  '"][data-col="' + (coords[1]+1) +  '"]');
			console.log(cell);
			cell.find(t3.aiClass).fadeIn();
			cell.addClass("comp-move-color"); // maybe delete this?
		}, 500);
	}

	function init() {
		establishSymbols();
		// maybe this function should be run after.
		// activateGrid();
	}

	init(); // is this needed at all?

});
