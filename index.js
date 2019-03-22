//Dom Variables
let textArea = document.getElementById('text-area');
textAreaDealer = document.getElementById('text-area2');
textAreaPlayer = document.getElementById('text-area3');
newGame = document.getElementById('new-game');
hitButton = document.getElementById('hit-button');
stayButton = document.getElementById('stay-button');

//Card Variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two', 'One'];

//Start of game
let gameStarted = false;
gameOver = false;
playerWon = false;
dealerCards = [];
playerCards = [];
deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGame.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGame.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

//config the HIT/STAY buttons
hitButton.addEventListener('click', function () {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

//creating the DECK
function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}

//shuffling the deck
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tmp;
    }
}

function getCardString(card) {
    return card.value + " " + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardNumberValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumberValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score = 10;
    }
    return score;
}

//Updating the scores
function updateScore() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

//check for the end of the game
function checkForEndOfGame() {
    updateScore();

    if (gameOver) {
        while (dealerScore < playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScore();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {

        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}

//Now lets show the status of the cards
function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Mo's BlackJack Table";
        textArea.classList.add('intro');
        return;
    }

    let dealerCardString = '';
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    let playerCardString = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }
    updateScore();
    textArea.innerText =
        'Dealer has: \n' +
        dealerCardString +
        '(score: ' + dealerScore + ')\n\n' +

        'player has:\n' +
        playerCardString +
        '(score: ' + playerScore + ')\n\n';

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "You have WON!";
        } else {
            textArea.innerText += "Sorry Dealer WINS!";
        }
        newGame.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }

}
