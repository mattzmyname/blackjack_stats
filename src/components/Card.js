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

    render() {
        let bgUrl = (this.props.isPrivate)
            ? 'url(../assets/hidden.png)'
            : 'url(../assets/' + this.props.suit + + this.props.rank + '.png)';
        /* in react we pass the css properties as an object with camelCase variables referring to the respective CSS variables */
        let cardStyle = {backgroundImage: bgUrl};
        console.log(cardStyle);
        return(
            <div className='card' style={cardStyle}/>
        )
    }


}