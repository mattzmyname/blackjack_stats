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


