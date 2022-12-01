import store from "@/store"
import { choice_pop } from "@/lib/utils"

// вытянули рандомом hand_size карт
function draw_hand(hand, deck) {
  for (let i = 0; i < store.state.game.hand_size; i++) {
    hand.push(choice_pop(deck)) // берем рандомную карту из колоды, кладем в руку, удаляем из колоды
  }
}

// функция для игры, а колода - для конструктора колод
export { draw_hand }
