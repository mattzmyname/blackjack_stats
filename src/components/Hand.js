import React, {Component} from 'react';
import Card from './Card';

export default class Hand extends Component{


    render (){
        const cards = this.props.cards.map((card, i) =>
            <Card
                rank={card.rank}
                suit={card.suit}
                isPrivate={this.props.player === 'dealer' && i === 0 && this.props.active}
                key={i}
            />
        );
        return(
            <div className="hand">
                {cards}
            </div>
        );
    }
}