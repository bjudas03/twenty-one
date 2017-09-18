var deckId = '';
var cardValue;
var cardObject;
var playerBank = 1000
var pot = 0;
var playerScore = 0;
var dealerScore = 0;


//loads deck and stores in local memory
$.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').done(function(response) {
	deckId = response.deck_id;
	localStorage.deck = deckId;
});	
deckId = localStorage.deck;

//////Game Functions
function bet() {
	var playerBet = $("#player-value").val();
	playerBet = parseInt(playerBet);
	if (playerBet <= playerBank) {
			$("#player-bank").text(parseInt(playerBank));
				$("#player-value").val('');  //resets the player bet box
				$("#player-bank").text(parseInt(playerBank) - parseInt(playerBet)); //returns the player bank as less the bet: returns as string??
				playerBank = playerBank - parseInt(playerBet);
				pot = parseInt(playerBet) + parseInt(pot); //should add player bet to total pot - returns as Object object??
				$("#betting-pot").text(parseInt(pot)); //puts new total pot in betting pot <p<span>> tag
	} else {
		function alert() {
			alert("Please Make an Acceptable Bet");  //make popup window with message "please make an acceptable bet"
			};
	}	
};

//////how to make this function specific to individual player?? make images/values push to correct divs
function drawCard(){
	$.get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=1').done(function(response) {
		cardObject = response.cards;
		cardObject.forEach(function(item) {
			var image = $('<img>').attr('src', item.image);
				image.attr('class', 'cardImage');
				$("#player-cards").append(image);

			for (value in cardObject) {
				switch (cardObject[0].value) {
					case "KING":
					case "QUEEN":
					case "JACK":
						playerScore = playerScore + 10;
						break;
					case "ACE": 
						if ((playerScore + 11) <= 21) {
							playerScore = playerScore + 11;
						} else if ((playerScore + 11) > 21) {
							playerScore = playerScore + 1;
						}
						break;
					default:	
						var valueString = cardObject[0].value;
						cardValue = parseInt(valueString);
						playerScore = playerScore + cardValue;
						break;
				}
			$('#player-points').text(playerScore)
			checkBust();
		}; 
		});
	});	
};		

function dealerTurn() {
	$.get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=7').done(function(response) {
		cardArray = response.cards;
		var i = 0;
		var currentCardIndex = 0;
			
			while (dealerScore <= 16) {
				cardArray[currentCardIndex]   
					var image = $('<img>').attr('src', cardArray[currentCardIndex].image);
						image.attr('class', 'cardImage');
						$("#dealer-cards").append(image);

					for (value in cardArray[currentCardIndex]) { //process is getting stuck in this loop
						switch (cardArray[currentCardIndex].value) {
							case "KING":
							case "QUEEN":
							case "JACK":
								dealerScore = dealerScore + 10;
								break;
							case "ACE": 
								if ((dealerScore + 11) <= 21) {
									dealerScore = dealerScore + 11;
								} else if ((dealerScore + 11) > 21) {
									dealerScore = dealerScore + 1;
								}
								break;
							default:	
								var valueString = cardArray[currentCardIndex].value;
								cardValue = parseInt(valueString);
								dealerScore = dealerScore + cardValue;
								break;
						}
					$('#dealer-points').text(dealerScore);
					break;				
					}	
				currentCardIndex++;
			}
		setTimeout(checkWin, 3000);	
		}
	)};			

function checkBust() {
	if (playerScore > 21) {
		console.log("player is over 21");
		setTimeout(resetBoard, 3000);
	}
}

function resetBoard() {
	pot = 0;
	playerScore = 0;
	dealerScore = 0;
	$(".cards-container").empty();
	$("#betting-pot").text(parseInt(0));
	$(".scores").text(0);
	$(".commit").toggle();
	$(".draw").toggle();
	$(".call").toggle();
}

function checkWin() {
	if (playerScore > 21) {
		console.log("player is over 21");
		resetBoard();
	} else if (playerScore <= dealerScore) {
		console.log("You Lose");
		resetBoard();
	} else if ((playerScore > dealerScore) || dealerScore > 21) {
		console.log("player wins hand");
		allocatePot();
		resetBoard();
}};

function allocatePot() {
	playerBank = playerBank + (pot * 3);
	pot = 0;
	$("#player-bank").text(parseInt(playerBank));
	$("#betting-pot").text(parseInt(0));
}

$(".call").on('click', function() {
	dealerTurn();
});

$(".commit").on('click', function() {
	bet();
	drawCard();
	drawCard();
	$(".commit").toggle();
	$(".draw").toggle();
	$(".call").toggle();
});

$(".draw").on('click', function(){
	drawCard();
});

bet();



