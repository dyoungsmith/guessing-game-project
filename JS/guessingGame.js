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
	if (absDiff == 0){
		var message = $('<p class="message">The number was '+ playersGuess +'</p>');
		$('.guess').append(message);
	}
	else{
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
		var message = $('<p class="message">Your guess is '+guessDirection+' and within '+distance+' digits of the winning number</p>');
		$('.guess').append(message);
	}
	
}

// Check if the Player's Guess is the winning number 
function checkGuess(){
	if (guessList.indexOf(playersGuess) > -1){
		var duplicateGuess = $('<p class="message">You already guessed that!</p>');
		$('.guess').append(duplicateGuess);
	}
	else {
		guessList.push(playersGuess);
		numGuesses += 1;
		if (playersGuess == winningNumber){
			var playerWins = $('<p class="message">You Win!</p>');
			$('.guess').append(playerWins);
		}
		else if (playersGuess != winningNumber){
			var guessAgain = $('<p class="message">Try Again</p>');
			$('.guess').append(guessAgain);
		}
	}		
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	var shuffle = function(array){
	  var i = 0,
	      j = 0,
	      temp = null;

	  for (i = array.length - 1; i > 0; i -= 1) {
	    j = Math.floor(Math.random() * (i + 1))
	    temp = array[i]
	    array[i] = array[j]
	    array[j] = temp
	  }
	  return array;
	}
	
	var hintNums = [];
	hintNums.push(generateWinningNumber());
	hintNums.push(winningNumber);
	var final = generateWinningNumber();
	while (hintNums.indexOf(final) > -1){
		final = generateWinningNumber();
	}
	hintNums.push(final);
	var shuffledNums = shuffle(hintNums);
	
	var hint = $('<p>' + shuffledNums.join(', ') + '</p>');
	$('body').append(hint);
}

// Allow the "Player" to Play Again
function playAgain(){
	//All resets taken care of in default event
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	winningNumber = generateWinningNumber();

	$('.guess').on('click', '#submitGuess', function(event){
		event.preventDefault();
		$('.guess').remove('.message');  //REMOVE POP UP MESSAGES AT EACH CLICK
		playersGuessSubmission();
		checkGuess();
		guessMessage();
	});

	$('.buttons').on('click', '#hint', function(){
		//REMOVE POP UP MESSAGE ON EACH CLICK
		event.preventDefault();
		provideHint();
	});

	// $('.buttons').on('click', '#playAgain', function(){
	// 	playAgain();
	// });

});







