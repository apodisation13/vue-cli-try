import { damage_random_enemy } from "@/logic/player_move/passive_abilities/damage_random_enemy"
import { increase_damage_in_hand } from "@/logic/player_move/passive_abilities/increase_damage_to-card_in_hand"
import { heal_leader } from "@/logic/player_move/passive_abilities/heal_leader"
import { increase_self_damage } from "@/logic/player_move/passive_abilities/increase_self_damage"
import { destroy_2_enemies } from "@/logic/player_move/passive_abilities/destroy_2_enemies_after_3_turns"

export function hand_passives(card, gameObj, hand) {
  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В РУКЕ!
  const pa = card.passive_ability.name
  if (pa === "damage-random-enemy") {
    damage_random_enemy(card, gameObj)
  } else if (pa === "increase-damage-to-card-in-hand") {
    increase_damage_in_hand(hand)
  } else if (pa === "heal-leader") {
    heal_leader(card)
  } else if (pa === "increase-self-damage") {
    increase_self_damage(card)
  } else if (pa === "destroy-2-enemies") {
    destroy_2_enemies(card, gameObj)
  }
}
