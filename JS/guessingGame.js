/* **** Global Variables **** */
// try to eliminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    guessList = [],
    numGuesses = 0;


/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
	return Math.floor(Math.random() * 100 + 1);
}

// Fetch the Players Guess
function playersGuessSubmission(){
	playersGuess = +$('#userGuess').val();
	if (numGuesses == 0) {
		guessList.push(playersGuess);
	}
	$('#userGuess').val('')
	
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	var difference = winningNumber - playersGuess;
	return difference;
}

//Message with more information
function guessMessage (){
	var guessDirection = '';
	var diff = lowerOrHigher();
	var absDiff = Math.abs(diff);
	var distance = 0;
	if (absDiff > 0 && absDiff <= 5){
		distance = 5;
	}
	if (absDiff > 5 && absDiff <= 10){
		distance = 10;
	}
	if (absDiff > 10 && absDiff <= 20){
		distance = 20;
	}
	if (absDiff > 20 && absDiff <= 50){
		distance = 50;
	}
	if (absDiff > 50){
		distance = 99;
	}
	if (diff < 0){
		guessDirection = 'higher';
	}
	if (diff > 0){
		guessDirection = 'lower';
	}
	var message = $('<p>Your guess is '+guessDirection+' and within '+distance+' digits of the winning number</p>');
	$('.guess').append(message);
}

//Check if the Player's Guess is a duplicate
function contains(itemList, targetItem){
	for (i=0; i<itemList.length; i++){
		if (itemList[i] === targetItem){
			return true;
		}
	}
}

// Check if the Player's Guess is the winning number 
function checkGuess(){
	if (contains(guessList, playersGuess) === true){
		var duplicateGuess = $('<p>You already guessed that!</p>');
		$('.guess').append(duplicateGuess);
	}
	else {
		guessList.push(playersGuess);
		numGuesses += 1;
		if (playersGuess == winningNumber){
			var playerWins = $('<p>You Win!</p>');
			$('.guess').append(playerWins);
		}
		else if (playersGuess != winningNumber){
			var guessAgain = $('<p>Try Again</p>');
			$('.guess').append(guessAgain);
		}
	}		
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again
function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	winningNumber = generateWinningNumber();

	$('.guess').on('click', '#submitGuess', function(event){
		event.preventDefault();
		playersGuessSubmission();
		checkGuess();
		guessMessage();
	});
});







