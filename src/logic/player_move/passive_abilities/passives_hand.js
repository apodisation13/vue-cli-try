import { damage_random_enemy } from "@/logic/player_move/passive_abilities/passives_in_hand/damage_random_enemy"
import { increase_damage_in_hand } from "@/logic/player_move/passive_abilities/passives_in_hand/increase_damage_to-card_in_hand"
import { heal_leader } from "@/logic/player_move/passive_abilities/passives_in_hand/heal_leader"
import { increase_self_damage } from "@/logic/player_move/passive_abilities/passives_in_hand/increase_self_damage"
import { destroy_2_enemies } from "@/logic/player_move/passive_abilities/passives_in_hand/destroy_2_enemies"
import { add_charges_if_playing_d_all } from "@/logic/player_move/passive_abilities/passives_leader/add-charges-if-playing-d-all"
import { set_dmg_as_random_enemy_grave } from "@/logic/player_move/passive_abilities/passives_in_hand/set_dmg_as_random_enemy_grave"
import { incr_dmg_by_n_enemies_grave } from "@/logic/player_move/passive_abilities/passives_in_hand/incr_dmg_by_n_enemies_grave"

export function hand_passives(card, gameObj, hand) {
  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В РУКЕ!
  const pa = card.passive_ability.name
  if (pa === "damage-random-enemy") {
    damage_random_enemy(card, gameObj)
  } else if (pa === "increase-damage-to-card-in-hand") {
    increase_damage_in_hand(card, hand)
  } else if (pa === "heal-leader") {
    heal_leader(card)
  } else if (pa === "increase-self-damage") {
    increase_self_damage(card)
  } else if (pa === "destroy-2-enemies") {
    destroy_2_enemies(card, gameObj)
  } else if (pa === "add-charges-to-leader-if-play-d-all") {
    add_charges_if_playing_d_all(card, gameObj.leader, false)
  } else if (pa === "set-dmg-as-random-enemy-grave") {
    set_dmg_as_random_enemy_grave(card, gameObj)
  } else if (pa === "incr-dmg-by-n-enemies-grave") {
    incr_dmg_by_n_enemies_grave(card, gameObj)
  }
}
