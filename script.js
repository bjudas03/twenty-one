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

// var turnCount = 0
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

//function to draw initial cards: draw card function 2x/switch player/drawcard2x/switchplayer
function startGame() {
	//clear pot
	//clear player points
	//clear playecards div
	drawCard();
	drawCard();
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
			$('#player-points').text(playerScore)}; //get element by id (span/player-points) and set text to new score
		});//checkWinner - check to see if player busts
	});	//callButton() - switch to dealer turn
}		

// Dealer Turn  -  reasign tags for dealer side
//pseudocode - 
	//call api
	//store result in temp array
	//lay down cards[0] and cards[1]
	//figure out value for cards[0],[1]
	//while loop - dealerScore <= 16 {
			//then hit
		//} else {
			//stand
		//}


function dealerTurn() {
	$.get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=7').done(function(response) {
		cardArray = response.cards;
		console.log(cardArray);
		// for (var i = 0; i <= cardArray.length) {
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
						 //get element by id (span/player-points) and set text to new score
					}//if playerscore > 21 - reset pot - restart game()
				currentCardIndex++;
			}
		}
	)};			
// };








//call button
	//dealerDraw()
	//checkfor Bust
	//checkWin
	//relocatePot
$(".call").on('click', function() {
	dealerTurn();
});

debugger;
dealerTurn();
bet();
$(".commit").on('click', bet);

//does this click instigate other actions? Maybe add to draw function.
$(".draw").on('click', function(){
	drawCard();
});



