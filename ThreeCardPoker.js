const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function createDeck() {
    let deck = [];
    for (suit in suits){
        for (rank in ranks){
            let card = ranks[rank] + " of " + suits[suit];
            deck.push(card);
        }
    }
    return deck;
}

//console.log(createDeck());
function drawCards(quantity, deck){
    let hand = [];
    for (let i=0; i<quantity; i++){
        hand.push(deck.pop());
    }
    return hand;
}

function shuffleDeck(deck){
    for(let i = deck.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [deck[i],deck[j]] = [deck[j],deck[i]];
    }
}

console.log("Creating Deck");
let deck = createDeck();

console.log("Shuffling Deck");
shuffleDeck(deck);
console.log("Player Hand:");
let playerHand = drawCards(3, deck);
console.log(playerHand);
console.log("Dealer Hand:");
let dealerHand = drawCards(3, deck);
console.log(dealerHand);

console.log("Remaining Deck:");
console.log(deck);