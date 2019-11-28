import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
export default class Header extends Component{
    render(){
        let winPct = this.props.gamesPlayed > 0 ?(this.props.winCount/this.props.gamesPlayed).toFixed(2) : 0;
        let msg = "Win Percentage: " + winPct*100 + "%\tWinnings: " + this.props.winnings;
        return(
            // <div className="fixed-top card-header" style={{backgroundColor: '#37BC9B'}}>{msg}</div>
            <Navbar bg='light'>
                <Navbar.Brand href="#home">{msg}</Navbar.Brand>
            </Navbar>
        )
    }
}