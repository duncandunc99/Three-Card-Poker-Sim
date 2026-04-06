const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
const suitValues = {"Spades":1, "Clubs":2, "Hearts":3, "Diamonds":4};
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const rankValues = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10": 10, "J": 11, "Q": 12, "K":13, "A":14};
function createDeck() {
    let deck = [];
    for (suit of suits){
        for (rank of ranks){
            let card = {suit, rank};
            deck.push(card);
        }
    }
    return deck;
}

function drawCards(quantity, deck){
    let hand = [];
    for (let i=0; i<quantity; i++){
        hand.push(deck.pop());
    }
    return hand;
}

function shuffleDeck(deck){
    const shuffledDeck = [...deck];
    for(let i = shuffledDeck.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [shuffledDeck[i],shuffledDeck[j]] = [shuffledDeck[j],shuffledDeck[i]];
    }
    return shuffledDeck;
}

function sortHandRank(hand){
    return [...hand].sort((a,b) => rankValues[a.rank] - rankValues[b.rank]);
}
function sortHandSuit(hand){
    return [...hand].sort((a,b) => suitValues[a.suit] - suitValues[b.suit]);
}
//hand strength comparison
function hasPair(hand){
    for(let i=0; i<hand.length; i++){
        for(let j = i+1; j<hand.length; j++){
            if (hand[i].rank == hand[j].rank) return true;
        }
    }
    return false;
}
function hasTwoPair(hand){
    let pairCount = 0;
    for(let i = 0; i<hand.length; i++){
        for (let j=i+1; j<hand.length; j++){
            if (hand[i].rank == hand[j].rank) pairCount++;
        }
    }
    return (pairCount>1);
}
function hasTrips(hand){
    let tempHand = [...hand];
    let tripsCount = 0;
    for(let i = 0; i<tempHand.length; i++){
        for (let j=i+1; j<tempHand.length; j++){
            if (hand[i].rank == hand[j].rank) tripsCount++;
            if (tripsCount>1) return true;
        }
        tripsCount = 0;
    }
    return false;
}
function hasStraight(hand, straightLength){
    //Ace High Straight Check
    let sortedHandValues = sortHandRank(hand).map(card => rankValues[card.rank]); 
    console.log(sortedHandValues);
    for(let i=0; i<= sortedHandValues.length - straightLength; i++){
        let consecutive = true;
        for (let j=1; j<straightLength; j++){
            if(sortedHandValues[i+j] != sortedHandValues[i]+j){
                consecutive = false;
                break;
            }
        }
        if (consecutive) return consecutive;
    }
    //Ace Low Straight Check
    sortedHandValues = sortedHandValues.map(v => (v === 14 ? 1:v));
    for(let i=0; i<= sortedHandValues.length - straightLength; i++){
        let consecutive = true;
        for (let j=1; j<straightLength; j++){
            if(sortedHandValues[i+j] != sortedHandValues[i]+j){
                consecutive = false;
                break;
            }
        }
        if (consecutive) return consecutive;
    }
    return false;
}
function hasFlush(hand){
    for(let i=0; i<hand.length-1; i++){
        if(hand[i].suit != hand[i+1].suit) return false;
    }
    return true;
}
//work on functionality *DOES NOT WORK YET*
function hasFullHouse(hand){

}
function hasQuads(hand){
    let quadsCount = 0;
    for(let i = 0; i<hand.length; i++){
        for (let j=i+1; j<hand.length; j++){
            if (hand[i].rank == hand[j].rank) quadsCount++;
            if (quadsCount>=3) return true;
        }
        quadsCount = 0;
    }
    return false;
}

//work on functionality *DOES NOT WORK YET*
function hasStraightFlush(hand, straightLength){
    //Ace High Straight Check
    let sortedHandValues = sortHandRank(hand).map(card => ({rank:rankValues[card.rank], suit:suitValues[card.suit]})); 
    for(let i=0; i<= sortedHandValues.length - straightLength; i++){
        let consecutive = true;
        let flushed = true;
        for (let j=1; j<straightLength; j++){
            if(sortedHandValues[i+j] != sortedHandValues[i]+j){
                consecutive = false;
                break;
            }
            if (hand[i].suit != hand[j].suit){
                flushed = false;
                break;
            }
        }
        if (consecutive && flushed) return true;
    }
    //Ace Low Straight Check
    sortedHandValues = sortedHandValues.map(v => (v === 14 ? 1:v));
    for(let i=0; i<= sortedHandValues.length - straightLength; i++){
        let consecutive = true;
        let flushed = true;
        for (let j=1; j<straightLength; j++){
            if(sortedHandValues[i+j] != sortedHandValues[i]+j){
                consecutive = false;
                break;
            }
            if (hand[i].suit != hand[j].suit){
                flushed = false;
                break;
            }
        }
        if (consecutive && flushed) return true;
    }
    return false;
}

let deck = createDeck();
let shuffledDeck = shuffleDeck(deck);
let hand1 = sortHandRank(drawCards(26, shuffledDeck));
let hand2 = sortHandRank(drawCards(26, shuffledDeck));
console.log(hand1);
console.log(hasPair(hand1));
console.log(hasTwoPair(hand1));
console.log(hasTrips(hand1));
console.log(hasStraight(hand1, hand1.length));
console.log(hasFlush(hand1));
console.log(hasQuads(hand1));
console.log(hand2);
console.log(hasPair(hand2));
console.log(hasTwoPair(hand2));
console.log(hasTrips(hand2));
console.log(hasStraight(hand2, hand2.length));
console.log(hasFlush(hand2));
console.log(hasQuads(hand2));