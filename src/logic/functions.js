
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
 * @param      {object}  dealerHand  The dealer hand
 * @param      {object}  deck        The deck
 * @param      {object}  playerHand  The player hand
 */
export function dealerDrawing(dealerHand, deck, playerHand) {
    if (!playerHand.isBust && !playerHand.hasBlackjack) {
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