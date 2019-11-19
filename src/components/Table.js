import React, {Component} from 'react';
import Hand from './Hand'
import Interface from "./Interface";

//just use this https://github.com/xfhg/blackjackin

export default class Table extends Component{
    constructor(props){
        super(props);

        this.state = {
            deck: this.props.deck,
            dealer : [this.props.deck.deal(), this.props.deck.deal()],
            player : [this.props.deck.deal(), this.props.deck.deal()],
            activeGame: true
        };


    }
    deal(){
        let deck = this.state.deck;
        let dealer = [];
        let player = [];

        if (deck.length < 6){
            deck.create();
        }
        deck.deal(); //burn one card
        player.push(deck.deal());
        dealer.push(deck.deal());
        player.push(deck.deal());
        dealer.push(deck.deal());

        this.setState({
            deck: deck,
            player: player,
            dealer: dealer,
            activeGame: true
        });
    }

    render (){
        return(
            <div>
                <Hand cards={this.state.dealer} player={'dealer'} />
                <Hand cards={this.state.player} player={'player'} />
                <Interface />
            </div>
        );
    }
}

export function stateToProps(state) {
    return {
        turn: state.get('turn'),
        deck: state.get('deck'),
        dealer: state.get('dealer'),
        player: state.get('player')
    }
}