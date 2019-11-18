import React, {Component} from 'react';
import Card from './Card';

export default class Table extends Component{
    constructor(props){
        super(props)
    }

    render (){
        const cards = this.props.cards.map((card, i) =>
            <Card
                rank={card.rank}
                suit={card.suit}
                isPrivate={false}
                key={i}
            />
        );
        return(
            <div>
                {cards}
            </div>
        );
    }
}