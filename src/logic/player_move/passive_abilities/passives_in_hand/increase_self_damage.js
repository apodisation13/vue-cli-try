import { sound_passive_increase_damage } from "@/logic/play_sounds"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"

function increase_self_damage(card) {
  timeoutAnimationValue(
    card,
    "damage",
    `${card.damage}+${card.value}`,
    card.value,
    sound_passive_increase_damage
  )
  timeoutAnimationFlag(card, "incr_dmg")
}

export { increase_self_damage }
