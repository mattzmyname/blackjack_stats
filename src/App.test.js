import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {calculateWinPercentage, getPercentageExperiment} from "./logic/functions";
import deck from "./logic/deck";
import hand from "./logic/hand";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("winPercent returns 50%", () => {
  expect(calculateWinPercentage(5,10)).toEqual("50%")
});

it("blackjack hand win %", () => {
  let testDeck = new deck();
  let player = new hand();
  let dealer = new hand();
  let playerCard1 = {rank: 3, suit: 'h'};
  let playerCard2 = {rank: 10, suit: 'h'};
  let dealerCard1 = {rank: 10, suit: 'd'};
  player.draw(playerCard1);
  dealer.draw(dealerCard1);
  player.draw(playerCard2);
  // noinspection JSCheckFunctionSignatures

  let percentage = getPercentageExperiment(player, dealer, testDeck, false);

  expect(percentage).toBeLessThanOrEqual(32);
  expect(percentage).toBeGreaterThanOrEqual(29);

});