import React, {Component} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';


export default class Output extends Component{
    render(){
        return(
            <div>{this.props.msg === null ? "Choose hit or stand" : this.props.msg}</div>
        )
    }
}