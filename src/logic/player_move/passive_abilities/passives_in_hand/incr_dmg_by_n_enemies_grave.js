import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function incr_dmg_by_n_enemies_grave(card, gameObj) {
  const { enemies_grave } = gameObj
  if (!enemies_grave.length) return

  timeoutAnimationValue(
    card,
    "damage",
    `${card.damage}+${enemies_grave.length}`,
    enemies_grave.length,
    sound_passive_increase_damage
  )
  timeoutAnimationFlag(card, "incr_dmg")
}
