import React, {Component} from 'react';
import Hand from './Hand'
import Interface from "./Interface";

//just use this https://github.com/xfhg/blackjackin

export default class Table extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render (){
        return(
            <div>
                <Hand />
                <Hand />
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