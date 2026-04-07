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
    const counts = {};

    for (let card of hand){
        const rank = card.rank;
        counts[rank] = (counts[rank]|| 0) + 1
    }
    let tripsCount = 0;
    let pairsCount = 0;

    for (let rank in counts) {
        if (counts[rank] >= 3 ) tripsCount++;
        if (counts[rank] >= 2 ) pairsCount++;
    }
    return tripsCount >=1 && pairsCount >= 2;
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

function hasStraightFlush(hand, straightLength){
    //Helper Check Function for Any Hand
    function checkStraightFlush(ranks, straightLength){
        for(let i=0; i<= ranks.length - straightLength; i++){
            let consecutive = true;
            for (let j=1; j<straightLength; j++){
                let prev = ranks[i+j-1];
                let curr = ranks[i+j];
                if(curr != prev+1){
                    consecutive = false;
                    break;
                }
            }
        if (consecutive) return true;
        }
        return false;
    }
    //Group by Suit
    const suits = {};
    for (let card of hand){
        const suit = card.suit;
        const rank = rankValues[card.rank];
        if (!suits[suit]) suits[suit] = [];
        suits[suit].push(rank);
    }
    for (let suit in suits){
        let ranks = [...new Set(suits[suit])].sort((a,b) => a-b)
        if (checkStraightFlush(ranks, straightLength)) return true;
        ranks = ranks.map(r => (r === 14 ? 1:r)).sort((a,b) => a-b);
        if (checkStraightFlush(ranks, straightLength)) return true;
    }
    return false;    
}
function drawHands(deck, quantity, size){
    const hands = {};
    for (let i=0; i<quantity; i++){
        hands[i] = drawCards(size, deck);
    }
    console.log(hands);
    return hands;
}
function checkHandForAllTypes(hand){
    console.log(hand);
    console.log((hasPair(hand)? "Hand has a pair":"Hand has no pair"));
    console.log((hasTwoPair(hand)? "Hand has two pair":"Hand has no two pair"));
    console.log((hasTrips(hand)? "Hand has trips":"Hand has no trips"));
    console.log((hasStraight(hand)? "Hand has a straight":"Hand has no straight"));
    console.log((hasFlush(hand)? "Hand has a flush":"Hand has no flush"));
    console.log((hasFullHouse(hand)? "Hand has a full house":"Hand has no full house"));
    console.log((hasQuads(hand)? "Hand has quads":"Hand has no quads"));
    console.log((hasStraightFlush(hand)? "Hand has a Straight Flush":"Hand has no Straight Flush"));
}
let deck = createDeck();
let shuffledDeck = shuffleDeck(deck);
let hands = drawHands(shuffledDeck, 10, 5);
console.log(hands.length);
for (let i=0; i<hands.length; i++){
    console.log(hands[i].length);
    checkHandForAllTypes(hands[i]);
}
