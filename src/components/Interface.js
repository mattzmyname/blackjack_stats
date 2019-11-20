import React, {Component} from 'react';
import Output from './Output'
import {getWinner} from "../logic/functions";

export default class Interface extends Component{

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

    render(){
        const activeGame = this.props.activeGame;
        let winner = null;
        if (!activeGame)
            winner  = getWinner(this.props.player.scoreTotal, this.props.dealer.scoreTotal);

        return(
            <div>
                <Output msg={this.getOutcome(winner)}/>
                <div >
                    <p>Player Score: {this.props.player.scoreTotal}</p>
                </div>
                <button onClick={!this.props.activeGame ? this.props.dealButton : null}>Deal</button>
                <button onClick={this.props.activeGame ? this.props.hitButton : null}>Hit</button>
                <button onClick={this.props.activeGame ? this.props.standButton : null}>Stand</button>
            </div>
        )
    }
}