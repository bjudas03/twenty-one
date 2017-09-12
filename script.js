//Initial Deal (same as Draw Card function, but change 'count=1' to 'count=2' in url)
	//set as a function that will run on board set-up and reset
	//display vlue of drawn cards in 

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






var url = 'https://deckofcardsapi.com/api/deck/';
var deckId = '';
var cardValue;//the card.value comes as a string from the AJAX object- Use parseInt() to convert to integer
// var game = loadDeck();
var cardObject;

// var cardArray = [];
// var dealerArray =[];
// var playerArray =[];

// var dealerBank = 1000
// // var dealerBet = ?
// var playerBank = 1000
// // var playerBet = ?

// var pot = playerBet + dealerBet;

// var turnCount = 0
// var playerScore = 0
// var dealerScore = 0

//gets deck from API
// function loadDeck() {
$.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').done(function(response) {
	// console.log(response);
	deckId = response.deck_id;
	localStorage.deck = deckId;
});	
deckId = localStorage.deck;
console.log(deckId)

function initiateGame() {
	console.log('inside the initiateGame ', deckId)
	$.get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=2').done(function(response) {
		console.log(response);
		cardObject = response;
		// console.log('draw works');
		for (value in cardObject) {
			for (i = 0; i<=cardObject.length; i++) {
			cardValue = parseInt(cardObject[i].value);
			console.log(cardValue);
		}
	}
		// for (image in cardObject) {
		// 		$("#player-cards").append("<img class='cardImage' src=" + cardObject.image + "/>");
		// 		console.log("test")
			// 	console.log("image tag works");
			// for (value in obj) {
			// 	var value = parseInt(obj.value);
			// 	$(#)

			// }
		// }
		}
	)
};
//////Do other query here, your deckId is localStorage.deck

// function drawCard(){
// 	console.log('inside of draw card', deckId)
// 	$.get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=1').done(function(response) {
// 		console.log('draw works');
// 		console.log(response);
// 	}
// )};

initiateGame();
// drawCard();


