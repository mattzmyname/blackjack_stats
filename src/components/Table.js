import React, {Component} from 'react';
import Hand from './Hand'
import Interface from "./Interface";
import hand from '../logic/hand'
import Hints from "./Hints";
import Header from "./Header";
import {getWinner, dealerDrawing} from '../logic/functions';
import Sidebar from "react-sidebar";


export default class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            gamesPlayed: 0,
            deck: this.props.deck,
            dealer : new hand(),
            player : [new hand()],
            currentHandIdx: 0,
            activeGame: true,
            winnings: 0,
            winCount: 0,
            showSidebar: false

        };
        this.onSetSidebarOpen = this.onSetSidebarOpen(this);
        this.deal()
    }

    onSetSidebarOpen(open) {
        this.setState({ showSidebar: open });
    }

    sideBarToggle(){
        this.setState({showSidebar: !this.state.showSidebar});

    }

    changeBet(newBet){
        let player = this.state.player;
        let curHand = this.getCurrentHand();
        curHand.bet = newBet;
        player[this.state.currentHandIdx] = curHand;
        this.setState({
            player: player
        });
    }

    getCurrentHand(){
        return this.state.player[this.state.currentHandIdx];
    }

    deal(){
        let deck = this.state.deck;
        let dealer = this.state.dealer;
        let curHand = this.state.player[0];
        dealer.clear();
        curHand.clear();
        if (deck.length < 6){
            deck.newDeck();
        }
        curHand.draw(deck.deal());
        dealer.draw(deck.deal());
        curHand.draw(deck.deal());
        dealer.draw(deck.deal());
        this.setState({
            deck: deck,
            player: [curHand],
            currentHandIdx: 0,
            dealer: dealer,
            activeGame: true
        });
        if (curHand.hasBlackjack){
            this.stand();
        }
    }

    hit(){
        let deck = this.state.deck;
        let player = this.state.player;
        let curHand = this.getCurrentHand();

        curHand.draw(deck.deal());
        player[this.state.currentHandIdx] = curHand;
        this.setState({
            deck: deck,
            player: player,
        }, () => {
            // automatically stand if bust
            if (curHand.isBust|| curHand.scoreTotal >= 21)
                this.stand();
        });
    }
    // bug exists where players bet is sometimes not correctly doubled
    double(){
        let originalBet = this.getCurrentHand().bet;
        this.changeBet(originalBet* 2);
        this.hit();
        if(!this.getCurrentHand().isBust && this.getCurrentHand().scoreTotal < 21)
            this.stand();
        this.changeBet(originalBet);

    }



    split(){
        // step 1 make a second hand
        let deck = this.state.deck;
        let player = this.state.player;
        let currentBet = this.getCurrentHand().bet;
        let hand1 = new hand();
        hand1.draw(this.getCurrentHand().cards[0]);
        hand1.bet = currentBet;
        let hand2 = new hand();
        hand2.draw(this.getCurrentHand().cards[1]);
        hand2.bet = currentBet;
        hand1.draw(deck.deal());
        player.splice(this.state.currentHandIdx, 1, hand1, hand2);
        this.setState({
            deck: deck,
            player: player,
        }, () => {
            // automatically stand if bust
            if (hand1.isBust|| hand1.scoreTotal >= 21)
                this.stand();
        });


    }

    stand(){
        let deck = this.state.deck;
        let player = this.state.player;
        let currentHandIdx = this.state.currentHandIdx;
        if (currentHandIdx >= player.length-1){
            this.dealersTurn()
        }
        else{
            currentHandIdx++;
            if(player[currentHandIdx].cards.length < 2)
                player[currentHandIdx].draw(deck.deal());
        }
        this.setState({
            currentHandIdx: currentHandIdx,
            player: player,
            deck: deck
        });

    }

    dealersTurn(){
        let dealer = this.state.dealer;
        let deck = this.state.deck;
        let winnings = this.state.winnings;
        let gamesPlayed = this.state.gamesPlayed;
        let winCount = this.state.winCount;
        // plays the dealers turn
        for (let i = 0; i < this.state.player.length; i++){
            let curHand = this.state.player[i];
            gamesPlayed++;
            dealerDrawing(dealer, deck, curHand);
            const winner  = getWinner(curHand.scoreTotal, dealer.scoreTotal);
            if (winner > 0) {
                winnings += curHand.hasBlackjack ? curHand.bet * 1.5 : curHand.bet;
                winCount++;
            }
            else if (winner < 0)
                winnings -= curHand.bet;

        }
        this.setState({
            activeGame: false,
            winnings: winnings,
            gamesPlayed: gamesPlayed,
            winCount: winCount
        });
    }

    render (){
        // console.log(this.state.winnings);
        const playHands = this.state.player.map((hand, i) =>
            <Hand
            cards={hand.cards}
            player={'player'}
            key={i}
            handID={i}
            active={this.state.activeGame}
            currentHandIdx={this.state.currentHandIdx}
            won = {this.state.activeGame ? null : getWinner(hand.scoreTotal, this.state.dealer.scoreTotal)}
            />
        );
        return(
            <div>
                <Header
                    winnings={this.state.winnings}
                    totalBet={this.state.totalBet}
                    gamesPlayed = {this.state.gamesPlayed}
                    winCount = {this.state.winCount}
                    sidebar={() => this.sideBarToggle()}
                />
                <Sidebar
                    children={
                        <div className="game-body">
                            <Hand cards={this.state.dealer.cards} player={'dealer'} active={this.state.activeGame}/>
                            {playHands}
                            <Interface
                                activeGame={this.state.activeGame}
                                dealButton={() => this.deal()}
                                hitButton={() => this.hit()}
                                standButton={() => this.stand()}
                                doubleButton={() => this.double()}
                                splitButton={() => this.split()}
                                player={this.state.player}
                                currentHandIdx={this.state.currentHandIdx}
                                dealer={this.state.dealer}
                                winCount={this.state.winCount}
                                currentBet={this.getCurrentHand().bet}
                                betButton={(n) => this.changeBet(n)}
                            />
                        </div>
                    }
                    open={this.state.showSidebar}
                    sidebar={
                        <Hints
                            activeGame={this.state.activeGame}
                            player={this.state.player}
                            currentHandIdx={this.state.currentHandIdx}
                            dealer={this.state.dealer}
                            deck={this.state.deck}
                        />
                    }
                    onSetOpen={this.onSetSidebarOpen}
                    pullRight={true}
                    styles={{ sidebar: { background: "green" } }}
                />


            </div>
        );
    }
}

