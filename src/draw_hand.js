import {Player } from "./constants";


let HAND = ['', '', '', '', '']  // заготовка руки игрока
// 0 1 2 3 4
const hand_size = HAND.length  // длина руки, пусть пока 5

let card1 = new Player(5, 1, 'bronze')
let card2 = new Player(15, 1, 'gold')
let card3 = new Player(4, 2, 'bronze')
let card4 = new Player(2, 1, 'bronze')
let card5 = new Player(8, 2, 'silver')
let card6 = new Player(7, 2, 'silver')
let card7 = new Player(10, 2, 'gold')
let card8 = new Player(6, 3, 'silver')
let card9 = new Player(2, 2, 'bronze')
let card10 = new Player(6, 1, 'bronze')
let DECK = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]


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


export { HAND, draw_hand, DECK }
