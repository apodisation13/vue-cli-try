import store from "@/store"
import { add_charges_to_leader_if_play_special } from "@/logic/player_move/passive_abilities/passives_leader/add-charges-to-leader-if-play-special"
import { hand_passives } from "@/logic/player_move/passive_abilities/passives_hand"
import { deck_passives } from "@/logic/player_move/passive_abilities/passives_deck"
import { grave_passives } from "@/logic/player_move/passive_abilities/passives_graves"
import { add_charges_if_playing_d_all } from "@/logic/player_move/passive_abilities/passives_leader/add-charges-if-playing-d-all"

// диспетчер вызова пассивных абилок
function player_passive_abilities_upon_playing_a_card(player_card, leader) {
  // здесь карты из руки проверяем
  if (!leader.has_passive) return
  const lpa = leader.passive_ability.name
  if (lpa === "add-charges-to-leader-if-play-special") {
    add_charges_to_leader_if_play_special(player_card, leader)
  } else if (lpa === "add-charges-to-leader-if-play-d-all") {
    add_charges_if_playing_d_all(player_card, leader, true)
  }
}

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

export {
  player_passive_abilities_upon_playing_a_card,
  player_passive_abilities_end_turn,
}
