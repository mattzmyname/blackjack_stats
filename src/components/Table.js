import React, {Component} from 'react';
import Hand from './Hand'
import Interface from "./Interface";
import hand from '../logic/hand'

//just use this https://github.com/xfhg/blackjackin

export default class Table extends Component{
    constructor(props){
        super(props);

        this.state = {
            turn: 1,
            deck: this.props.deck,
            dealer : new hand(),
            player : new hand(),
            activeGame: true
        };
    this.dealGame();


    }
    dealGame(){
        let deck = this.state.deck;
        let dealer = this.state.dealer;
        let player = this.state.player;
        dealer.clear();
        player.clear();

        if (deck.length < 6){
            deck = new deck();
        }
        deck.deal(); //burn one card
        player.draw(deck.deal());
        dealer.draw(deck.deal());
        player.draw(deck.deal());
        dealer.draw(deck.deal());
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
                <Hand cards={this.state.dealer.cards} player={'dealer'} turn={this.state.turn}/>
                <Hand cards={this.state.player.cards} player={'player'} turn={this.state.turn}/>
                <Interface {... stateToProps(this.state)}/>
            </div>
        );
    }
}

export function stateToProps(state) {
    return {
        turn: state['turn'],
        deck: state['deck'],
        dealer: state['dealer'],
        player: state['player'],
        activeGame: state['activeGame']
    }
}