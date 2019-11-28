/**
 * Calculates the detailed score (soft and hard total).
 *
 * @param      {Object}   score   The score
 * @param      {Object}   card
 * @param      {int}  score.softTotal   Soft total
 * @param      {int}  score.hardTotal   Hard total
 * @param      {int}   card.rank Card rank
 * @param      {String}   card.suit Card suit
 * @return     {Object}   The score.
 */
function calculateScore(score, card) {
    // ace
    if (card.rank === 1) {
        score.hardTotal += 1;
        score.softTotal += ((score.softTotal + 11) > 21 ) ? 1 : 11;
    }
    // face cards
    else if (card.rank > 10) {
        score.hardTotal += 10;
        score.softTotal += 10;
    }
    else {
        // non-face cards
        score.hardTotal += card.rank;
        score.softTotal += card.rank;
    }

    return score;
}

/**
 * Calculates the hand total score.
 *
 * @param      {Object}   score   The score
 * @param      {int}  score.softTotal   Soft total
 * @param      {int}  score.hardTotal   Hard total
 * @return     {int}  The total.
 */
function calculateTotal(score) {
    if (score.hardTotal === 21 || score.softTotal === 21) {
        return 21;
    }
    else if (score.softTotal > 21) {
        return score.hardTotal;
    }

    return score.softTotal;
}



/**
 * Create a new Blackjack Hand.
 * Uses WeakMap variables for privacy
 *
 * @class      Deck (name)
 */
export default class Hand {
    /**
     * Constructs the object.
     * Sets initial states for _hand and _stats.
     */
    constructor() {
        /**
         * Hand of cards store.
         * Private variable used by Hand.
         *
         * @type       {Array}
         */
        this._hand = [];
        /**
         * Hand stats store.
         * Private variable used by Hand.
         *
         * @type       {Object}
         */
        this._stats = {
            softTotal: 0,
            hardTotal: 0,
        };
        /**
         * Hand bet store.
         * Private variable used by Hand.
         *
         * @type       {int}
         */
        this._bet = 10;
    }

    /**
     * Draws a card to the hand
     * On each card draw, update score stats
     *
     * @param      {Object}  card    The card.
     * @return     {Object}  Added card to the hand.
     */
    draw(card) {
        // adds a card to the hand
        this._hand.push(card);
        // update stats
        this._stats = calculateScore(this._stats, card);

        return card;
    }

    /**
     * Sets the vars to the original state.
     */
    clear() {
        this._hand = [];
        this._stats = {
            softTotal: 0,
            hardTotal: 0,
        };
    }


    /**
     * Gets the current hands bet.
     *
     * @return     {int}  bet
     */


    get bet(){
        return this._bet;
    }
    /**
     * Gets the total score.
     *
     * @return     {int}  The total score.
     */
    get scoreTotal() {
        return calculateTotal(this._stats);
    }

    /**
     * Gets the statistics.
     *
     * @return     {Object}  The score stats.

     */
    get scoreStats() {
        return this._stats;
    }

    /**
     * Gets the cards.
     *
     * @return     {Array}  Array of cards in the current hand
     */
    get cards() {
        return this._hand;
    }

    /**
     * Determines if the hand is bust.
     *
     * @return     {boolean}  True if bust, False otherwise.
     */
    get isBust() {
        return this.scoreTotal > 21;
    }

    /**
     * Determines if the hand has a blackjack.
     *
     * @return     {boolean}  True if has blackjack, False otherwise.
     */
    get hasBlackjack() {
        return this.cards.length === 2 && this.scoreTotal === 21;
    }

    /**
     * changes this hands bet to the new bet
     * @param newBet
     */
    set bet(newBet){
        this._bet = newBet;
    }
}