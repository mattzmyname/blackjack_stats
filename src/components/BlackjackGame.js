import React, {Component} from 'react';
import './BlackjackGame.css';
import Table from './Table'
import deck from '../logic/deck'

export default class BlackjackGame extends Component {

    render() {
        return (
            <div>
                <Table deck={new deck()}/>
            </div>
        );
    }
}
