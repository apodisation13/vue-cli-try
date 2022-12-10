import store from "@/store"
import { hand_passives } from "@/logic/player_move/passive_abilities/passives_hand"
import { deck_passives } from "@/logic/player_move/passive_abilities/passives_deck"
import { grave_passives } from "@/logic/player_move/passive_abilities/passives_graves"

function player_passive_abilities_end_turn(gameObj) {
  store.commit("set_ppa_end_turn", true) // установили флаг начала пассивок

  const { hand, deck, grave, leader } = gameObj

  let passive_hand = hand.filter(c => c.has_passive_in_hand) // собрали пассивные карты из руки
  if (leader.has_passive) passive_hand.push(leader) // добавили туда ещё и лидера если у него есть пассивка

  let i = 0
  let passive_time = setInterval(() => {
    if (i === passive_hand.length) {
      // здесь мы выполняем пассивки в КОЛОДЕ
      deck
        .filter(c => c.has_passive)
        .forEach(card => {
          deck_passives(card)
        })
      // здесь мы выполняем пассивки в КЛАДБИЩЕ
      grave
        .filter(c => c.has_passive)
        .forEach(card => {
          grave_passives(card)
        })

      clearInterval(passive_time)
      store.commit("set_ppa_end_turn", false)
    } else {
      hand_passives(passive_hand[i], gameObj, hand)
      i += 1
    }
  }, 1000)
}

export { player_passive_abilities_end_turn }
