var index = -1;
var playerPoints = 0;
var dealerPoints = 0;
var dealerCard = document.createElement("img");
var playerCard = document.createElement("img");
var dealerWarCard;
var playerWarCard;
var amountOfWarCards = 0;
var figure;
var figure2;
var h1Tags = document.getElementsByTagName("h1");
var deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,
27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
deck.sort((a,b) => 0.5 - Math.random());

function getCardValue(cardNumber) {
	var cardValue = cardNumber % 13;

	switch(cardValue){
		case 11:
		case 12:
		case 0:
			return 10;
	}
	return cardValue;
}

function nextRound() {
	figure = document.getElementsByClassName("dealerScore")[0];
	index++;
	dealerCard.src = ("src", "img/" + deck[index] + ".png");
	figure.appendChild(dealerCard);

	figure2 = document.getElementsByClassName("playerScore")[0];
	index++;
	playerCard.src = ("src", "img/" + deck[index] + ".png");
	figure2.appendChild(playerCard);

	for (var i = 0; i < amountOfWarCards; i++) {
		if (i < amountOfWarCards - 1) {
			dealerWarCard.previousElementSibling.remove();
			playerWarCard.previousElementSibling.remove();
		}
		else {
			dealerWarCard.remove();
			playerWarCard.remove();
			amountOfWarCards = 0;
		}
	}

}

function compareCards() {
	if (getCardValue(deck[index]) > getCardValue(deck[index - 1])) {
		playerPoints++;
		h1Tags[1].textContent = playerPoints;
	}
	else if (getCardValue(deck[index]) < getCardValue(deck[index - 1])) {
		dealerPoints++;
		h1Tags[3].textContent = dealerPoints;
	}
	if (getCardValue(deck[index]) == getCardValue(deck[index - 1])) {
		for (var i = 0; i < 3; i++) {
			if (deck.includes(deck[index++])) {
				dealerWarCard = document.createElement("img");
				playerWarCard = document.createElement("img");
				dealerWarCard.src = ("src", "img/" + deck[index++] + ".png");
				playerWarCard.src = ("src", "img/" + deck[index] + ".png");
				figure.appendChild(dealerWarCard);
				figure2.appendChild(playerWarCard);
				amountOfWarCards++;
			}
			else {
				endGame();
			}
		}
		compareCards();
	}
	if (index >= 51) {
		endGame();
	}
}

function endGame() {
	var disable = document.getElementsByTagName("button");
	disable[0].disabled = true;
	if (playerPoints > dealerPoints) {
		var playerTag = h1Tags[0];
		playerTag.style = "background-color: green;";
		playerTag.textContent = "Player has won the hand";
		h1Tags[0].style.color = "#FFFFFF";
	}
	else if (playerPoints < dealerPoints) {
		var dealerTag = h1Tags[2];
		dealerTag.style = "background-color: green;";
		dealerTag.textContent = "Dealer has won the hand";
		h1Tags[2].style.color = "#FFFFFF";
	}
}

function startGame() {
	figure = document.getElementsByClassName("dealerScore")[0];
	dealerCard.src = ("src", "img/back.png");
	figure.appendChild(dealerCard);

	figure2 = document.getElementsByClassName("playerScore")[0];
	playerCard.src = ("src", "img/back.png");
	figure2.appendChild(playerCard);
}
