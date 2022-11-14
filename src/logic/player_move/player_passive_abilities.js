import store from "@/store"

import { add_charges_to_leader_if_play_special } from "@/logic/player_move/passive_abilities/add-charges-to-leader-if-play-special"
import { passive_end_turn_damage_random_enemy } from "@/logic/player_move/passive_abilities/damage_random_enemy"
import { passive_end_turn_increase_damage_in_hand } from "@/logic/player_move/passive_abilities/increase_damage_to-card_in_hand"
import {
  passive_end_turn_heal_leader_by_2,
  passive_end_turn_heal_leader_by_3,
} from "@/logic/player_move/passive_abilities/heal_leader"
import { passive_end_turn_increase_self_damage } from "@/logic/player_move/passive_abilities/increase_self_damage"
import { if_in_deck_increase_self_damage } from "@/logic/player_move/passive_abilities/if_in_deck_increase_self_damage"
import { if_in_grave_increase_self_damage } from "@/logic/player_move/passive_abilities/if_in_grave_increase_self_damage"
import { passive_end_turn_destroy_2_enemies_after_3_turns } from "@/logic/player_move/passive_abilities/destroy_2_enemies_after_3_turns"

// диспетчер вызова пассивных абилок
function player_passive_abilities_upon_playing_a_card(player_card, leader) {
  // здесь карты из руки проверяем
  if (!leader.has_passive) return
  if (leader.passive_ability.name === "add-charges-to-leader-if-play-special") {
    add_charges_to_leader_if_play_special(player_card, leader)
  }
}

function player_passive_abilities_end_turn(gameObj) {
  store.commit("set_ppa_end_turn", true)

  const { field, enemy_leader, hand, deck, grave, enemies, leader } = gameObj

  let passive_hand = hand.filter(c => c.has_passive_in_hand)
  passive_hand.reverse() // не забываем про float right :) FIXME
  if (leader.has_passive) passive_hand.push(leader)

  let i = 0
  let passive_time = setInterval(() => {
    if (i === passive_hand.length) {
      deck
        .filter(c => c.has_passive)
        .forEach(card => {
          if (
            card.passive_ability.name === "if-in-deck-increase-self-damage-by-1"
          ) {
            if_in_deck_increase_self_damage(card)
          }
        })

      grave
        .filter(c => c.has_passive)
        .forEach(card => {
          if (
            card.passive_ability.name ===
            "if-in-grave-increase-self-damage-by-1"
          ) {
            if_in_grave_increase_self_damage(card)
          }
        })

      clearInterval(passive_time)
      store.commit("set_ppa_end_turn", false)
    } else {
      // ДИСПЕТЧЕР пассивных абилок
      if (passive_hand[i].passive_ability.name === "damage-random-enemy-by-1") {
        passive_end_turn_damage_random_enemy(passive_hand[i], gameObj)
      } else if (
        passive_hand[i].passive_ability.name ===
        "increase-damage-to-card-in-hand-by-1"
      ) {
        passive_end_turn_increase_damage_in_hand(hand)
      } else if (passive_hand[i].passive_ability.name === "heal-leader-by-2") {
        passive_end_turn_heal_leader_by_2()
      } else if (passive_hand[i].passive_ability.name === "heal-leader-by-3") {
        passive_end_turn_heal_leader_by_3()
      } else if (
        passive_hand[i].passive_ability.name === "increase-self-damage-by-1"
      ) {
        passive_end_turn_increase_self_damage(passive_hand[i])
      } else if (
        passive_hand[i].passive_ability.name ===
        "destroy-2-enemies-after-3-turns"
      ) {
        passive_end_turn_destroy_2_enemies_after_3_turns(
          passive_hand[i],
          field,
          enemy_leader,
          enemies,
          grave,
          hand
        )
      }

      i += 1
    }
  }, 1000)
}

export {
  player_passive_abilities_upon_playing_a_card,
  player_passive_abilities_end_turn,
}
