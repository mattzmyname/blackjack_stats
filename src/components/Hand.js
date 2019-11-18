import React, {Component} from 'react';
import Card from './Card';

export default class Table extends Component{
    constructor(props){
        super(props)
    }

    render (){
        return(
            <div>
                <Card suit={'h'} rank={'7'} isPrivate={true}/>
                <Card suit={'h'} rank={'8'} isPrivate={false}/>
            </div>
        );
    }
}