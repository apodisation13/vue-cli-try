import {add_charges_to_leader_if_play_special} from "@/logic/player_move/passive_abilities/add-charges-to-leader-if-play-special"
import {passive_end_turn_damage_random_enemy} from "@/logic/player_move/passive_abilities/damage_random_enemy"


function player_passive_abilities_upon_playing_a_card(player_card, leader) {
  // диспетчер вызова пассивных абилок

  // здесь карты из руки проверяем

  if (!leader.has_passive) return
  if (leader.passive_ability.name === 'add-charges-to-leader-if-play-special') {
    add_charges_to_leader_if_play_special(player_card, leader)
  }

}


function player_passive_abilities_end_turn(hand, leader, deck, grave, field, enemy_leader) {
  hand.filter(c => c.has_passive).forEach(card => {
    if (card.passive_ability.name === 'damage-random-enemy-by-1') {
      passive_end_turn_damage_random_enemy(field, card, undefined, enemy_leader)
    }
  })

  if (!leader.has_passive) return
  if (leader.passive_ability.name === 'damage-random-enemy-by-1') {
    passive_end_turn_damage_random_enemy(field, undefined, leader, enemy_leader)
  }
}


export {
    player_passive_abilities_upon_playing_a_card,
    player_passive_abilities_end_turn,
}