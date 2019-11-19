import React, {Component} from 'react';
import Output from './Output'

export default class Interface extends Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <Output/>
                <div >
                    <p>Player Score: {this.props.player.scoreTotal}</p>
                </div>
                <button >Deal</button>
                <button>Hit</button>
                <button >Stand</button>
            </div>
        )
    }
}