import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Switch from "react-switch";
export default class Header extends Component{
    constructor(props) {
        super(props);
        this.state={
            checked:false
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(checked) {
        this.props.sidebar();
        this.setState({ checked });

    }
    render(){
        let winPct = this.props.gamesPlayed > 0 ?(this.props.winCount/this.props.gamesPlayed).toFixed(2) : 0;
        let msg = "Win Percentage: " + winPct*100 + "%\tWinnings: " + this.props.winnings;
        return(
            // <div className="fixed-top card-header" style={{backgroundColor: '#37BC9B'}}>{msg}</div>
            <Navbar bg='light' style={{zIndex:3}}
            >
                <Navbar.Brand href="#home">{msg}</Navbar.Brand>
                <h4 className={'ml-auto'}>
                    <span style={{
                        paddingBottom: '5px'
                    }}>Show Hints</span>
                    <Switch onChange={this.handleChange} checked={this.state.checked} />
                </h4>
            </Navbar>
        )
    }
}