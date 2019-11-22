import React, {Component} from 'react';

export default class Header extends Component{
    render(){
        let winPct = (this.props.winCount/this.props.gamesPlayed).toFixed(2) * 100;
        let msg = "Win Percentage: " + winPct + "%\tWinnings: " + this.props.winnings + "\tTotal Bets: " + this.props.totalBet;
        return(
            <div className="fixed-top card-header" style={{backgroundColor: '#37BC9B'}}>{msg}</div>
        )
    }
}