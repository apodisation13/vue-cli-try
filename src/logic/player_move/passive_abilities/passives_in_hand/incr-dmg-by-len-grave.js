import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function inc_dmg_by_len_grave(card, gameObj) {
  const { grave } = gameObj

  timeoutAnimationValue(
    card,
    "damage",
    `${card.damage}+${grave.length}`,
    grave.length,
    sound_passive_increase_damage
  )
  timeoutAnimationFlag(card, "incr_dmg")
}
