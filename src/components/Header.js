import React, {Component} from 'react';

export default class Header extends Component{
    render(){
        let msg = "Winnings: " + this.props.winnings + "\tTotal Bets: " + this.props.totalBet;
        return(
            <div className="fixed-top card-header" style={{backgroundColor: '#37BC9B'}}>{msg}</div>
        )
    }
}