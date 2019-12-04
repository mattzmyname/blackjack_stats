import React, {PureComponent} from 'react';
import memoizeOne from 'memoize-one';
import {getPercentageExperiment} from '../logic/functions'


/**
 *  This file will handle the computation to generate hints for the player
 */
export default class Hints extends PureComponent{
    oddsDealerBust(dealerFaceCard){
        let index = dealerFaceCard.rank > 10 ? 10 : dealerFaceCard.rank;
        let odds = [0, 11.65, 35.3, 37.56, 40.28, 42.89, 42.08, 25.99, 23.86, 23.34, 21.43];
        return odds[index];
    }


    render() {
        let deck = this.props.deck;
        let playerHand = this.props.player[this.props.currentHandIdx];
        let dealer = this.props.dealer;
        const memoizedPct = memoizeOne(getPercentageExperiment);
        let winPct = memoizedPct(playerHand, dealer, deck, false);


        console.log(winPct);
        return(
            <div className={'sidebar'}>
                <p>% Chance to win: {winPct}%</p>
                <p>% Chance Dealer Busts: {this.oddsDealerBust(dealer.cards[dealer.cards.length-1])}%</p>
            </div>
        );
    }

}