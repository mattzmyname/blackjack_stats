import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default class Interface extends Component{


    betInput(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.props.betButton(parseInt(e.target.value));
        }
    }

    isSplittable(){
        let playerHand = this.props.player[this.props.currentHandIdx].cards;
        if (playerHand.length !== 2)
            return false;
        let cardOneValue = playerHand[0].rank < 10 ? playerHand[0].rank : 10;
        let cardTwoValue = playerHand[1].rank < 10 ? playerHand[1].rank : 10;
        return cardOneValue === cardTwoValue;

    }

    render(){
        return(
            <div>
                <h2>Player Score: {this.props.player[this.props.currentHandIdx].scoreTotal}</h2>
                <div className={"PrimaryButtons"}>
                    <Button className="m-1" variant="info" size="lg" onClick={this.props.dealButton} disabled={this.props.activeGame}>Deal</Button>
                    <Button className="m-1" variant="success" size="lg" onClick={this.props.hitButton} disabled={!this.props.activeGame}>Hit</Button>
                    <Button className="m-1" variant="danger" size="lg" onClick={this.props.standButton}  disabled={!this.props.activeGame}>Stand</Button>
                </div>
                <div className={"SecondaryButtons"}>
                    <Button className="m-1" size="lg" onClick={this.props.doubleButton} disabled={!this.props.activeGame || this.props.numHits > 0} >Double</Button>
                    <Button className="m-1" size="lg" onClick={this.props.splitButton} disabled={!this.props.activeGame || !this.isSplittable()}>Split</Button>

                </div>
                <div className={"center-div"}>
                    <InputGroup size="sm" className={"input-xs"} value={this.props.currentBet} onChange={this.betInput.bind(this)}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Your Bet</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder={this.props.currentBet}
                            aria-label="bet"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>

            </div>
        )
    }
}