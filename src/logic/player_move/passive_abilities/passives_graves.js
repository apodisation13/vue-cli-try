import { if_in_grave_increase_self_damage } from "@/logic/player_move/passive_abilities/passives_in_grave/if_in_grave_increase_self_damage"
import { heal_leader } from "@/logic/player_move/passive_abilities/passives_in_hand/heal_leader"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function grave_passives(card) {
  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В КЛАДБИЩЕ
  const cpa = card?.passive_ability?.name
  if (cpa === "if-in-grave-increase-self-damage") {
    if_in_grave_increase_self_damage(card)
  } else if (cpa === "if-in-grave-heal") {
    heal_leader(card)
    timeoutAnimationFlag(card, "trigger_grave_passive")
  }
}
