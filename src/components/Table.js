import React, {Component} from 'react';
import Hand from './Hand'
import Interface from "./Interface";

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