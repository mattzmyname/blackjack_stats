import React, {Component} from 'react';
import {getAdvice} from '../logic/suggestions'


/**
 *  This file will handle the computation to generate hints for the player
 */
export default class Hints extends Component{
    oddsDealerBust(dealerFaceCard){
        let index = dealerFaceCard.rank > 10 ? 10 : dealerFaceCard.rank;
        let odds = [0, 11.65, 35.3, 37.56, 40.28, 42.89, 42.08, 25.99, 23.86, 23.34, 21.43];
        return odds[index];
    }

    countValue(card){
        if (card.rank >= 10 || card.rank === 1)
            return -1;
        else if (card.rank <= 6 && card.rank > 1)
            return 1;
        else
            return 0;
    }

    render() {
        const numDecks = 1;
        let playerHand = this.props.player[this.props.currentHandIdx];
        let dealer = this.props.dealer;
        let suggestion = getAdvice(playerHand, dealer);
        let tensRemaining = this.props.deck.tensRemaining();
        tensRemaining = (this.props.activeGame && tensRemaining < 16*numDecks) ? tensRemaining + 1: tensRemaining;
        let currentCount = this.props.activeGame ? this.props.deck.count - this.countValue(dealer.cards[0]): this.props.deck.count;
        return(
            <div className={'sidebar'}>
                <p>% Chance Dealer Busts: {this.oddsDealerBust(dealer.cards[dealer.cards.length-1])}%</p>
                <p>Tens Remaining in Deck: {tensRemaining}</p>
                <p>Current Count: {currentCount}</p>
                <div className={"suggestion"}>
                    <p>Recommended Action</p>
                    <h3 className={"advice-text " + suggestion}>{suggestion}</h3>
                </div>
            </div>
        );
    }

}