import store from '@/store'  // НЕ ЗАБЫВАТЬ ЭТО, иначе нельзя достать store
// store.commit(), без THIS


let HAND = ['', '', '', '', '', '', ]  // заготовка руки игрока
// 0 1 2 3 4 5
const hand_size = HAND.length  // длина руки, пусть пока 6


// вытянули рандомом hand_size карт
function draw_hand(hand, deck) {
    for (let i = 0; i < hand_size; i++) {
        let random = Math.floor(Math.random() * deck.length);
        hand[i] = deck[random]  // кладём в руку новую карту вместо ''
        deck.splice(random, 1)  // убираем из деки эту карту по её индексу random 
    }
    
    // store.commit('set_current_deck', deck)
    // alert(store.state.current_deck.length + 'длина деки вышла')
    // return [hand, DECK]  // теперь не нужен этот ретерн???
}


// функция для игры, а колода - для конструктора колод
export { draw_hand, }
