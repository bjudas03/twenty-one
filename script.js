// Known needed functions
// Randomize Deck
//		USE API to get deck object
// 	deal first two cards to each player
// Bet function toPot
// Draw function = pull 1 card from deck and add to UL array of player/dealer
// 	calculate value of card and add to value of cards in player array
// 	if value is over 21 = player/dealer busts
// Bet function = input box w/ value of bet -> add to center toPot
// Bust = if player card value =< 21, player turn over and pot goes to opposing player
// Call function = player forfeits turn -> dealer continues

var url = 'https://deckofcardsapi.com/api/deck/';
var deckId = '';
var cardValue = //the card.value comes as a string from the AJAX object- Use parseInt() to convert to integer

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

// $('#dealer-bank').push(dealerBank);
// $('#player-bank').push(playerBank);


function newDeck() {
	var deck = $.get('https://deckofcardsapi.com/api/deck/new/shuffle', {
}).done(function(response) {
	console.log(response);
});
}





// function createBoard() {

// }