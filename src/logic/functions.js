import Deck from "./deck";
import Hand from "./hand";
import cloneDeep from 'lodash/cloneDeep';

/**
 * Gets the winner.
 *
 * @param      {number}         playerScore  The player score
 * @param      {number}         dealerScore  The dealer score
 * @return     {number}_   1 = win, -1 = lost, 0 = push
 */
export function getWinner(playerScore, dealerScore) {
    if (playerScore === dealerScore && playerScore <= 21){
        return 0
    }
    else if (playerScore > 21 || (dealerScore <= 21 && dealerScore > playerScore)){
        return -1
    }
    else
        return 1
}

/**
 * Dealer AI.
 * Hit until score of 16 or soft 17.
 * Do not hit if the player is already bust
 * or the player has blackjack.
 *
 * @param      {Hand}  dealerHand  The dealer hand
 * @param      {Deck}  deck        The deck
 * @param      {Hand}  playerHand  The player hand
 */
export function dealerDrawing(dealerHand, deck, playerHand) {
    if (!playerHand.isBust && !playerHand.hasBlackjack && !dealerHand.isBust) {
        let stats = dealerHand.scoreStats;
        while( (stats.hardTotal < 17) || (stats.softTotal < 18)) {
            dealerHand.draw(deck.deal());
        }
    }
}

/**
 * Calculates the win percentage
 * given the win and round count.
 *
 * @param      {number}  winCount    The win count
 * @param      {number}  roundCount  The round count
 * @return     {string}  The win percentage.
 */
export function calculateWinPercentage(winCount, roundCount) {
    let num = (winCount / roundCount);
    num = isNaN(num) ? 0 : isFinite(num) ? num : 0;

    return +(num * 100).toFixed(2) + '%';
}

/**
 *
 * @param {Hand} player
 * @param {Hand} dealer
 * @param {Deck} deck
 * @param withReplacement
 */
export function getPercentageExperiment(player, dealer, deck, withReplacement = true) {
    let winCount = 0;
    let iterations = 10000;
    let deckCopy;
    for(let i = 0; i < iterations; i++){
        if(withReplacement)
            deckCopy = new Deck();
        else{
            deckCopy = cloneDeep(deck);
            deckCopy.shuffle();
        }

        let dealerCopy = new Hand();
        dealerCopy.draw(dealer.cards[dealer.cards.length-1]);
        dealerDrawing(dealerCopy, deckCopy, player);
        if(player.scoreTotal >= dealerCopy.scoreTotal || dealerCopy.scoreTotal > 21)
            winCount++;
    }
    return Math.round(((winCount / iterations) * 100));

}
