import React, {Component} from 'react';
import Output from './Output'

export default class Interface extends Component{
    render(){
        return(
            <div>
                <Output/>
                {/* but the following code is owned by Interface */}
                <div >
                    <a>Dealer Score : </a>
                    <a>Player Score : </a>
                </div>
                <button >Deal</button>
                <button>Hit</button>
                <button >Stand</button>
            </div>
        )
    }
}