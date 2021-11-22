import {Player } from "./constants";


let HAND = ['', '', '', '', '']  // заготовка руки игрока
// 0 1 2 3 4
const hand_size = HAND.length  // длина руки, пусть пока 5

let card1 = new Player(5, 1, 'bronze', 5)
let card2 = new Player(15, 1, 'gold', 4)
let card3 = new Player(4, 2, 'bronze', 8)
let card4 = new Player(2, 1, 'bronze', 5, {'heal': 20})
let card5 = new Player(8, 2, 'silver', 6)
let card6 = new Player(7, 2, 'silver', 8)
let card7 = new Player(10, 2, 'gold', 7)
let card8 = new Player(6, 3, 'silver', 6)
let card9 = new Player(2, 2, 'bronze', 14)
let card10 = new Player(6, 1, 'bronze', 4)
let DECK = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]


function calc_deck_health(deck) {
    let summ = 0
    deck.forEach(card => {
        summ += card.hp
    }); 
    return summ
}


function random_hand_draw(i) {
    let random = Math.floor(Math.random() * DECK.length);
    HAND[i] = DECK[random]  // кладём в руку новую карту вместо ''
    DECK.splice(random, 1)  // убираем из деки эту карту по её индексу random
}


function draw_hand(hand) {
    for (let i = 0; i < hand_size; i++) {
        random_hand_draw(i)  // вытянули рандомом hand_size карт
        hand[i] = HAND[i]    
    }
    // return [hand, DECK]  // теперь не нужен этот ретерн???
}


let deck_health = calc_deck_health(DECK)


export { HAND, draw_hand, DECK, deck_health }
