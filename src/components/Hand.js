import React, {Component} from 'react';
import Card from './Card';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export default class Hand extends Component{


    render (){
        const cards = this.props.cards.map((card, i) =>
            <Card
                rank={card.rank}
                suit={card.suit}
                isPrivate={this.props.player === 'dealer' && i === 0}
                key={i}
            />
        );
        return(
            <div className="cards">
                <CSSTransitionGroup transitionName="list" transitionEnterTimeout={800} transitionLeaveTimeout={300}>
                    {cards}
                </CSSTransitionGroup>
            </div>
        );
    }
}