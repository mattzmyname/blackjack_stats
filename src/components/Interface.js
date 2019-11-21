import React, {Component} from 'react';
import {getWinner} from "../logic/functions";
import Button from 'react-bootstrap/Button';



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
    getWinnerMsg(){
        if (!this.props.activeGame)
            return getWinner(this.props.player.scoreTotal, this.props.dealer.scoreTotal);
        return null;
    }

    betInput(e){
        console.log(e.target.value);
    }

    render(){

        return(
            <div>
                <div>{this.getOutcome(this.getWinnerMsg())}</div>
                <div >
                    <h2>Player Score: {this.props.player.scoreTotal}</h2>
                </div>
                <Button className="m-1" color="outline-info" size="lg" onClick={!this.props.activeGame ? this.props.dealButton : null}>Deal</Button>
                <Button className="m-1" color="success" size="lg" onClick={this.props.activeGame ? this.props.hitButton : null}>Hit</Button>
                <Button className="m-1" color="danger" size="lg" onClick={this.props.activeGame ? this.props.standButton : null}>Stand</Button>

            </div>
        )
    }
}