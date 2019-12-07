import Hand from "./hand";
import {isSplittable} from "./functions";

export const advice = {
    split: 'Split',
    stay: 'Stay',
    double: 'Double',
    hit: 'Hit',
    blackjack: 'Blackjack',
    invalid: null
};


export function calculateSplitAdvice(playerHand, dealerCard) {

    let userCard1 = playerHand.cards[0].rank;
    let userCard2 = playerHand.cards[1].rank;
    if (!userCard1 || !userCard2 || !dealerCard || userCard1 !== userCard2) {
        return;
    }

    switch (userCard1) {
        case 1:
            return advice.split;
        case 2:
        case 3:
        case 7:
            if (dealerCard <= 7) {
                return advice.split;
            }
            return advice.hit;
        case 4:
            if (dealerCard === 5 || dealerCard === 6) {
                return advice.split;
            }
            return advice.hit;
        case 5:
            if (dealerCard <= 9) {
                return advice.double;
            }
            return advice.hit;
        case 6:
            if (dealerCard <= 6) {
                return advice.split;
            }
            return advice.hit;
        case 8:

        case 9:
            if (dealerCard <= 9 && dealerCard !== 7) {
                return advice.split;
            }
            return advice.stay;
        case 10:
            return advice.stay;
        default:
            return;
    }
}

export function calculateSoftAdvice(playerHand, dealerCard) {

    let userCard1 = playerHand.cards[0].rank;
    let userCard2 = playerHand.cards[1].rank;
    if (!userCard1 || !userCard2 || !dealerCard) {
        return;
    }

    if (userCard1 !== 1 && userCard2 !== 1) {
        return;
    }

    const card = userCard1 === 1 ? userCard2 : userCard1;

    switch (card) {
        case 2:
        case 3:
            if (dealerCard === 5 || dealerCard === 6) {
                return advice.double;
            }
            return advice.hit;
        case 4:
        case 5:
            if (dealerCard >= 4 && dealerCard <= 6) {
                return advice.double;
            }
            return advice.hit;
        case 6:
            if (dealerCard >= 3 && dealerCard <= 6) {
                return advice.double;
            }
            return advice.hit;
        case 7:
            if (dealerCard <= 6) {
                return advice.double;
            } else if (dealerCard <= 8) {
                return advice.stay;
            }
            return advice.hit;
        case 8:
        case 9:
            return advice.stay;
        case 10:
            return advice.blackjack;
        default:
            return;
    }
}

export function calculateHardAdvice(playerHand, dealerCard) {


    const cardTotal = playerHand.scoreTotal;

    switch (cardTotal) {
        case 5:
        case 6:
        case 7:
        case 8:
            return advice.hit;
        case 9:
            if (dealerCard >= 3 && dealerCard <= 6) {
                return advice.double;
            }
            return advice.hit;
        case 10:
            if (dealerCard <= 9) {
                return advice.double;
            }
            return advice.hit;
        case 11:
            if (dealerCard === 11) {
                return advice.hit;
            }
            return advice.double;
        case 12:
            if (dealerCard >= 4 && dealerCard <= 6) {
                return advice.stay;
            }
            return advice.hit;
        case 13:
        case 14:
        case 15:
        case 16:
            if (dealerCard <= 6) {
                return advice.stay;
            }
            return advice.hit;
        case 17:
        case 18:
        case 19:
            return advice.stay;
        default:
            return;
    }
}

export default function getAdvice(playerHand, dealer) {
    // get face up dealer card for comparison
    let dealerCopy = new Hand();
    dealerCopy.draw(dealer.cards[dealer.cards.length-1]);
    let dealerCard = dealerCopy.scoreTotal;

    if (isSplittable(playerHand))
        return calculateSplitAdvice(playerHand, dealerCard);

    let adviceString = calculateSoftAdvice(playerHand, dealerCard);
    if (adviceString) {
        return adviceString;
    }
    adviceString = calculateHardAdvice(playerHand, dealerCard);
    if (adviceString) {
        return adviceString;
    }
    return advice.invalid;
}