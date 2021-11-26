import {Player } from "./constants";
import store from '@/store'  // НЕ ЗАБЫВАТЬ ЭТО, иначе нельзя достать store
// store.commit(), без THIS


let HAND = ['', '', '', '', '', '', ]  // заготовка руки игрока
// 0 1 2 3 4 5
const hand_size = HAND.length  // длина руки, пусть пока 6

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
let card11 = new Player(9, 1, 'silver', 5, {'heal': 10} )
let card12 = new Player(6, 1, 'gold', 17, {'heal': 50})
let card13 = new Player(5, 2, 'silver', 20, {'heal': 5} )
let card14 = new Player(23, 1, 'gold', 2)
let card15 = new Player(6, 5, 'silver', 2)
let card16 = new Player(2, 4, 'bronze', 7)
let card17 = new Player(6, 1, 'bronze', 4)
let card18 = new Player(6, 5, 'silver', 6, {'heal': 30} )
let card19 = new Player(8, 1, 'gold', 17, {'heal': 30})
let card20 = new Player(4, 4, 'bronze', 12, {'heal': 12})
let DECK = [
    card1, card2, card3, card4, card5, card6, card7, card8, card9, card10,
    card11, card12, card13, card14, card15, card16, card17, card18,
    card19, card20,
]

let base_deck = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]


function draw_one_random_card_from_deck(i, deck) {
    let random = Math.floor(Math.random() * deck.length);
    HAND[i] = deck[random]  // кладём в руку новую карту вместо ''
    deck.splice(random, 1)  // убираем из деки эту карту по её индексу random
}

// вытянули рандомом hand_size карт
function draw_hand(hand, deck) {
    for (let i = 0; i < hand_size; i++) {
        draw_one_random_card_from_deck(i, deck)  
        hand[i] = HAND[i]    
    }
    store.commit('set_current_deck', deck)
    alert(store.state.current_deck.length + 'длина деки вышла')
    // return [hand, DECK]  // теперь не нужен этот ретерн???
}


function calc_deck_health(deck) {
    let summ = 0
    deck.forEach(card => {
        summ += card.hp
    }); 
    alert(summ + 'из ф')
    return summ
}


// // считаем жизни колоды по сумме жизней всех карт в ней
// let deck_health = calc_deck_health(this.$store.state.current_deck)

// функция для игры, а колода - для конструктора колод
export { draw_hand, calc_deck_health, DECK, base_deck}
