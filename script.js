//BET pseudocode
	//input player $ value into text box
	//pres commit
		//value from text box get removed from player pot
		//value from text box gets added to betting pot
		//switch turn to player 2
	//input dealer $ value into text box
		//value from text box gets removed from dealer pot
		//value from text box gets added to betting pot
		//swtich to player 1
		//start draw card function

//Draw Card Function
//  --  needs  --  
		//pull 1 card from API 
		//parse string value of card to integer: add to player score
			//check to see if score value => 21
				//if 21 => you win
				//if over 21 => you bust
				//if under 21
				//	reset back to draw card function
	//option for draw or stay
		//on draw - repeat from draw card function
		//on stay - next turn
			//set interval 5 secs
			//hide player section
			//switch turn

//switch turn function
	//increase turn counter ++
	//show player section






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
console.log(deckId)

//////Game Functions
function bet() {
	var playerBet = $("#player-value").val();
	playerBet = parseInt(playerBet);
	if (playerBet <= playerBank) {
			$("#player-bank").text(parseInt(playerBank));
				console.log(playerBet);
				$("#player-value").val('');  //resets the player bet box
				$("#player-bank").text(parseInt(playerBank) - parseInt(playerBet)); //returns the player bank as less the bet: returns as string??
				playerBank = playerBank - parseInt(playerBet);
				console.log(playerBank);
				pot = parseInt(playerBet) + parseInt(pot); //should add player bet to total pot - returns as Object object??
				console.log(pot);
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
		console.log(cardObject);
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
						console.log(cardValue);
						playerScore = playerScore + cardValue;
						break;
				}
			$('#player-points').text(playerScore)
			// checkWin();
		}; 
		});
	});	
};		

function dealerTurn() {
	$.get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=7').done(function(response) {
		cardArray = response.cards;
		console.log(cardArray);
		var i = 0;
		var currentCardIndex = 0;
		console.log(currentCardIndex);
			
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
								console.log(cardValue);
								dealerScore = dealerScore + cardValue;
								break;
						}
					$('#dealer-points').text(dealerScore);
					break;				
					}
				// checkWin();	
				currentCardIndex++;
			}
		}
	)};			

// function checkWin() {
// 	if (playerScore > 21) {
// 		console.log("player is over 21");
// 		pot = 0;
// 		playerScore = 0;
// 		$(".cards-container").empty();
// 	} else if (playerScore <= dealerScore) {
// 		console.log("You Lose");
// 		pot = 0;
// 		playerScore = 0;
// 		dealerScore = 0;
// 		$(".cards-container").empty();
// 	} else if ((playerScore >= dealerScore) || dealerScore > 21) {
// 		playerScore = 0;
// 		dealerScore = 0;
// 		allocatePot();
// 		console.log("player wins hand");
// 		$(".cards-container").empty();
// 	}
// };

function allocatePot() {
	playerBank = playerBank + (pot * 3);
	pot = 0;
}

$(".call").on('click', function() {
	dealerTurn();
});

$(".commit").on('click', function() {
	bet();
	drawCard();
	drawCard();
});

$(".draw").on('click', function(){
	drawCard();
});





