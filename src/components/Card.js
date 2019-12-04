import React, {Component} from 'react';
/**
 * Card component.
 *
 * @class      Info (name)
 * @param      {Object}          props             Component properties
 * @param      {int}         props.rank        Card's rank
 * @param      {String}          props.suit        Card's suit
 * @param      {boolean}            props.isPrivate   Should rank & suit be rendered
 * @return     {ReactElement}    markup
 */
export default class Card extends Component{

    render() {
        let image = (this.props.isPrivate)
            ? require('../assets/hidden.png')
            : require('../assets/' + this.props.suit + this.props.rank + '.png');
        /* in react we pass the css properties as an object with camelCase variables referring to the respective CSS variables */

        return(
            <img src={image} alt={""}/>
        )
    }
}