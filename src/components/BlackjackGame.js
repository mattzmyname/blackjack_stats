import React, {Component} from 'react';
import './BlackjackGame.css';
import Table from './Table'

export default class BlackjackGame extends Component {

    render() {
        return (
            <div>
                <Table {...this.props} />
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
