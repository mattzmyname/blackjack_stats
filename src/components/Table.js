import React, {Component} from 'react';
import Hand from './Hand'
import Interface from "./Interface";
import hand from '../logic/hand'
import Header from "./Header";
import {getWinner, dealerDrawing} from '../logic/functions';


export default class Table extends Component{
    constructor(props){
        super(props);

        this.state = {
            totalBet: 0,
            winCount: 0,
            deck: this.props.deck,
            dealer : new hand(),
            player : new hand(),
            activeGame: true,
            currentBet: 10
        };
        this.deal()
    }

    changeBet(newBet){
        this.state.currentBet = newBet
    }

    deal(){
        let deck = this.state.deck;
        let dealer = this.state.dealer;
        let player = this.state.player;
        dealer.clear();
        player.clear();

        if (deck.length < 6){
            deck.newDeck();
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

    hit(){
        let deck = this.state.deck;
        let player = this.state.player;

        player.draw(deck.deal());

        this.setState({
            playerHand: player.cards,
        }, () => {
            // automatically stand if bust
            if (player.isBust|| player.scoreTotal >= 21)
                this.stand();
        });
    }

    stand(){
        let deck = this.state.deck;
        let player = this.state.player;
        let dealer = this.state.dealer;
        // plays the dealers turn
        dealerDrawing(dealer, deck, player);

        const winner  = getWinner(player.scoreTotal, dealer.scoreTotal);
        console.log(winner);
        const winCount = winner === 1 ? this.state.winCount + 1 : this.state.winCount;
        this.setState({
            deck:deck,
            player:player,
            dealer:dealer,
            activeGame: false,
            winCount: winCount
        });
    }

    render (){
        return(
            <div>
                <Header/>
                <div className="game-body">
                    <Hand cards={this.state.dealer.cards} player={'dealer'} active={this.state.activeGame}/>
                    <Hand cards={this.state.player.cards} player={'player'} active={this.state.activeGame}/>
                    <Interface
                        activeGame={this.state.activeGame}
                        dealButton={() => this.deal()}
                        hitButton={() => this.hit()}
                        standButton={() => this.stand()}
                        player={this.state.player}
                        dealer={this.state.dealer}
                        winCount={this.state.winCount}
                        currentBet={this.state.currentBet}
                        betButton={(n) => this.changeBet(n)}
                    />
                </div>

            </div>
        );
    }
}

