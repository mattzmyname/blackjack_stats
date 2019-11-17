import React, {Component} from 'react';

/**
 * Card component.
 *
 * @class      Info (name)
 * @param      {Object}          props             Component properties
 * @param      {String|Integer}  props.rank        Card's rank
 * @param      {String}          props.suit        Card's suit
 * @param      {Bool}            props.isPrivate   Should rank & suit be rendered
 * @return     {ReactElement}    markup
 */
export default class Card extends Component{
    renderContainer = () => {
        return (
            <div className="container">
                <span className="rank">{this.props.rank}</span>
                <span className="suit">{this.props.suit}</span>
            </div>
        );
    };
    renderFront = () => {
        return (
            <div className="front">
                <div className="section top">
                    {this.renderContainer()}
                </div>
                <div className="section center suit">{this.props.suit}</div>
                <div className="section bottom">
                    {this.renderContainer()}
                </div>
            </div>
        );
    };
    render() {
        console.log(this.props)
        return(
            <div className={`card ${this.props.suit}`} data-private={this.props.isPrivate}>
                {!this.props.isPrivate && this.renderFront()}
                <div className="back">{this.props.isPrivate ? "Back" : ""}</div>
            </div>
        )
    }


}