

/**
 * Creates a deck.
 * Private function used by Deck.
 *
 * @return     {Array}  { standard deck of cards }
 */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


/**
 * Deck of cards store.
 * Private variable used by Deck.
 *
 * @type       {Array}
 */
let _deck = [];
/**
 * Create a new Deck.
 * Privately stores deck of cards
 * using WeakMap.
 *
 * @class      Deck (name)
 */
export default class Deck {
    constructor() {
        this.newDeck();
    }

    /**
     * Create the deck of cards and shuffle
     */
    newDeck() {
        const deck = [];
        const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const suits = ['h', 's', 'c', 'd'];

        ranks.forEach((rank) => {
            suits.forEach((suit) => {
                deck.push({rank, suit});
            });
        });

        _deck = shuffleArray(deck);
    }
    /**
     * Get the amount of remaning cards
     *
     * @return     {Integer} { deck size }
     */
    get length() {
        return _deck.length;
    }

    /**
     * Deal the last card from the deck
     *
     * @return     {Object} card { last card from the deck }
     * @return     {String} card.rank { card rank }
     * @return     {String} card.suit { card suit }
     */
    deal() {
        let deck = _deck;

        // newDeck a new deck when
        // there are no more cards
        if (!deck.length) {
            this.newDeck();
            return this.deal();
        }

        const card = deck.pop();
        _deck = deck;

        return card;
    }
}
