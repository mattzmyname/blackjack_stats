import React, {Component} from 'react';
import Hand from './Hand'
import Interface from "./Interface";

//just use this https://github.com/xfhg/blackjackin

export default class Table extends Component{
    constructor(props){
        super(props);
        console.log(this.props.deck.deal())
        this.state = {};
    }
    render (){
        let testCards = [{rank:"7",suit:"c"}, {rank:"8",suit:"h"}];
        return(
            <div>
                <Hand cards={testCards} />
                <Hand cards={testCards} />
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