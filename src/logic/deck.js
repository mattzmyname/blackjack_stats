



/**
 * Create a new Deck.
 * Privately stores deck of cards
 * using WeakMap.
 *
 * @class      Deck (name)
 */
export default class Deck {
    constructor() {
        this._deck = [];
        this.newDeck();
    }

    /**
     * shuffles the current deck
     */
    shuffle(){
        this._deck = this.shuffleArray(this._deck);
    }
    /**
     * Creates a deck.
     * Private function used by Deck.
     *
     * @return     {Array}  { standard deck of cards }
     */

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    /**
     * Create the deck of cards and shuffle
     */
    newDeck(numDecks=1) {
        const deck = [];
        const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const suits = ['h', 's', 'c', 'd'];

        for (let i=0; i < numDecks; i++)
            ranks.forEach((rank) => {
                suits.forEach((suit) => {
                    deck.push({rank, suit});
                });
            });
        this._deck = this.shuffleArray(deck);
    }
    /**
     * Get the amount of remaning cards
     *
     * @return     {int} { deck size }
     */
    get length() {
        return this._deck.length;
    }

    /**
     * Deal the last card from the deck
     *
     * @return     {Object} card { last card from the deck }
     * @return     {String} card.rank { card rank }
     * @return     {String} card.suit { card suit }
     */

    get deck(){
        return this._deck;
    }

    set deck(newDeck){
        this._deck = newDeck;
    }

    deal() {
        let deck = this._deck;

        // newDeck a new deck when
        // there are no more cards
        if (!deck.length) {
            this.newDeck();
            return this.deal();
        }

        const card = deck.pop();
        this._deck = deck;

        return card;
    }

    tensRemaining(){
        let tenCount = 0;
        for (let i = 0; i< this._deck.length; i++){
            if(this._deck[i].rank >= 10)
                tenCount++;
        }
        return tenCount;
    }
}
