//Dom Variables
let textArea = document.getElementById('text-area');
newGame = document.getElementById('new-game');
hitButton = document.getElementById('hit-button');
stayButton = document.getElementById('stay-button');

//buttons...
newGame.addEventListener('click', function() {
    gamestarted = true;
    gameOver = false;
    playerWon = false;
    textArea.innerText = "Game Started...";
    newGame.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
});


//Card Variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two', 'One'];

//Show Status Function
function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Mo's BlackJack Game";
    }
    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += dealerCards[] + '\n';
    }
    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += playerCards[] + '\n';
    }
}

let deck = createDeck();
dealerCards = [getNextCard(), getNextCard()];
playerCards = [getNextCard(), getNextCard()];


function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            deck.push(values[valueIndex] + ' of ' + suits[suitIndex]);
        }
    }
    return deck;
} //end of function

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let temp = deck[swapIndex];
        deck[swapIndex = deck[i]];
        deck[i] = temp;
    }
};

function getNextCard() { //get next card function
    return deck.shift();
};

for (var i = 0; i < deck.length; i++) {
    textArea.innerText += '\n' + deck[i];
}

function changeCard(card) {
    card.suits = "Clubs";
}
let card = {
    suits: "hearts",
    values: "Ace"
};
changeCard(card);
console.log(card.suits);

let result = Math.random() * 52;
result = Math.trunc(result);
console.log(result);
// at the start of the game
let gameStarted = false;
gameOver = false;
playerWon = false;
dealerCards = [];
playerCards = [];
dealerScore = 0;
playerScore = 0;
deck = [];
/*
newGame.addEventListener('click', function() {
    textArea.innerText = "Game Started...";
    newGame = style.display = "none";
    hitButton = style.display = "inline";
    stayButton = style.display = "inline";
});*/