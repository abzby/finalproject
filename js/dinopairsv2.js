

//create all the variables
var score;
var cardsmatched;

var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiCards= $("#cards");
var uiReset = $(".gameReset");
var uiScore = $(".gameScore");
var uiPlay = $("#gamePlay");
var uiTimer = $("#timer");

//create deck array
var matchingGame = {};
matchingGame.deck = ['fivesos', 'fivesos','thebeatles', 'thebeatles','thevamps', 'thevamps','westlife', 'westlife','fob', 'fob','thescript', 'thescript',
'onedirection', 'onedirection','maroon5', 'maroon5','backstreetboys', 'backstreetboys',];
//on document load the lazy way
$(function(){

	 alert("WELCOME! How well do YOU know your band? \nMatch the picture cards AS FAST AS YOU CAN. \nReady? \nGet set, \nGO!");
        console.log("yo, I'm alive!");
	  init();
});

//initialise game
function init() {

	console.log("game is starting");
	

					uiComplete.hide();
					uiCards.hide();
					playGame = false;
					uiPlay.click(function(e) {
						e.preventDefault();
						uiIntro.hide();
						startGame();
					});
				
					uiReset.click(function(e) {
						e.preventDefault();
						uiComplete.hide();					
						reStartGame();
					});
			}

//start game and create cards from deck array
function startGame(){


	enableAutoplay();


				uiTimer.show();
				uiScore.html("0 seconds");
				uiStats.show();
				uiCards.show();
				score = 0;
				cardsmatched = 0;
			   	if (playGame == false) {
			   			playGame = true;
						matchingGame.deck.sort(shuffle);
						for(var i=0;i<17;i++){
								$(".card:first-child").clone().appendTo("#cards");
							}
							// initialize each card's position
							uiCards.children().each(function(index) {
								// align the cards to be a 3x6 arrangement.
								$(this).css({
									"left" : ($(this).width() + 20) * (index % 6),
									"top" : ($(this).height() + 20) * Math.floor(index / 6)
								});
								// get a pattern from the shuffled deck
								var pattern = matchingGame.deck.pop();
								// show the pattern on the card's back side.
								$(this).find(".back").addClass(pattern);
								// embed the pattern data into the DOM element.
								$(this).attr("data-pattern",pattern);
								// listen the click event on each card DIV element.
								$(this).click(selectCard);
							});											 
				   	timer();
				};			   
			  }


//timer for game
function timer() {
				//alert("timer set")
				if (playGame) {
					scoreTimeout = setTimeout(function() {
						uiScore.html(++score + " seconds");		
						timer();
					}, 1000);
				};
		};

//shuffle cards
function shuffle() {
	return 0.5 - Math.random();
}

//onclick function adds the flip class. After that, check to see if cards are the same
function selectCard() {
	// we do nothing if there are already two cards flipped.
	if ($(".card-flipped").size() > 1) {
	return;
	}
	$(this).addClass("card-flipped");

	// after 0.7s, check the pattern of both flipped card 
	if ($(".card-flipped").size() == 2) {
	setTimeout(checkPattern,700);
	}
}
 //if there is more than 1 element with the class name .card-flipped then the click does nothing 
 //because we already have two cards turned over.


//if pattern is the same, remove cards. Otherwise flip back to original
function checkPattern() {

	console.log("pattern is the same!");

	if (isMatchPattern()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
			if(document.webkitTransitionEnd){
				$(".card-removed").bind("webkitTransitionEnd",	removeTookCards);
			}else{
				removeTookCards();
			}
		} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

//put 2 flipped cards in an array then check the image whether they are the same.
function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

//check to see if all cardmatched variable is less than 8 

//if so, remove card only. Otherwise remove card and end the game 

function removeTookCards() {
	if (cardsmatched < 8){
		cardsmatched++;

enableBoom();


		$(".card-removed").remove();
	}else{
		$(".card-removed").remove();
		uiCards.hide();
		uiComplete.show();
		clearTimeout(scoreTimeout);

console.log("play end music");

		enableStopPlay();
		enableFinish();
}	


}

   //adding a background sound while the game is running
            var bgsound = new Audio("resources/technobeat.wav")
            function enableAutoplay() {
            bgsound.autoplay = true;
            bgsound.loop = true;
            bgsound.load();

    }
    		var bgsound = new Audio("resources/technobeat.wav")
            function enableStopPlay() {
            bgsound.pause();



    }
            //adding a sound for everytime the target is clicked.
            var boom = new Audio("resources/yay.wav")
            function enableBoom() {
                    boom.autoplay =true;
                    boom.load();

    }

			//adding a sound at the end of the game.
            var Finish = new Audio("resources/endcheer.mp3")
            function enableFinish() {
                    finish.autoplay =true;
                    finish.load();

	}

//recreate the original card , stop the timer and re-arrange the array with class names
function reStartGame(){


				playGame = false;
				uiCards.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
				clearTimeout(scoreTimeout);
				matchingGame.deck = ['fivesos', 'fivesos','thebeatles', 'thebeatles','thevamps', 'thevamps','westlife', 'westlife','fob', 'fob','thescript', 'thescript',
'onedirection', 'onedirection','maroon5', 'maroon5','backstreetboys', 'backstreetboys',];			
				startGame();

			}

				