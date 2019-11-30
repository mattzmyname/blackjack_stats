import React, {Component} from 'react';
import Card from './Card';

export default class Hand extends Component{

    getOutcome(win){
        switch(win) {
            case (1):
                return 'WIN!';
            case (-1):
                return 'LOST!';
            case (0):
                return 'PUSH!';
            default:
                return null
        }
    }
    getWinnerMsg(){
        if (!this.props.active && this.props.player === 'player')
            return this.props.won;
        return null;
    }

    render (){
        const cards = this.props.cards.map((card, i) =>
            <Card
                rank={card.rank}
                suit={card.suit}
                isPrivate={this.props.player === 'dealer' && i === 0 && this.props.active}
                key={i}
            />

        );
        // let isCurrentHand = (this.props.player === 'player' && this.props.currentHandIdx === this.props.handID);
        // console.log(isCurrentHand);
        return(
            <div className={'hand'}>
                {cards}
                <div>{this.getOutcome(this.getWinnerMsg())}</div>
            </div>
        );
    }
}