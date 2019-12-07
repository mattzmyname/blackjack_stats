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


    render() {
        let playerHand = this.props.player[this.props.currentHandIdx];
        let dealer = this.props.dealer;
        let suggestion = getAdvice(playerHand, dealer);

        return(
            <div className={'sidebar'}>
                <p>% Chance Dealer Busts: {this.oddsDealerBust(dealer.cards[dealer.cards.length-1])}%</p>
                <div className={"suggestion"}>
                    <p>Recommended Action</p>
                    <h3 className={"advice-text " + suggestion}>{suggestion}</h3>
                </div>
            </div>
        );
    }

}