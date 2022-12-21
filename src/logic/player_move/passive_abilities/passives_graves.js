import { if_in_grave_increase_self_damage } from "@/logic/player_move/passive_abilities/passives_in_grave/if_in_grave_increase_self_damage"
import { heal_leader } from "@/logic/player_move/passive_abilities/passives_in_hand/heal_leader"
import {
  allowActionTimer,
  timeoutAnimationFlag,
} from "@/logic/game_logic/timers"
import { if_in_grave_spawn_self_in_enemy_grave } from "@/logic/player_move/passive_abilities/passives_in_grave/if_in_grave_spawn_self_in_enemy_grave"

export function grave_passives(card, gameObj) {
  if (!allowActionTimer(card)) return

  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В КЛАДБИЩЕ
  const cpa = card?.passive_ability?.name
  if (cpa === "if-in-grave-increase-self-damage") {
    if_in_grave_increase_self_damage(card)
  } else if (cpa === "if-in-grave-heal") {
    heal_leader(card)
    timeoutAnimationFlag(card, "trigger_grave_passive")
  } else if (cpa === "if-in-grave-spawn-self-in-enemy-grave") {
    if_in_grave_spawn_self_in_enemy_grave(card, gameObj)
  }
}
