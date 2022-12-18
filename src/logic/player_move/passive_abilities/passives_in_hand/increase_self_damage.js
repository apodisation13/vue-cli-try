import { sound_passive_increase_damage } from "@/logic/play_sounds"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
  timer,
} from "@/logic/game_logic/timers"

function increase_self_damage(card) {
  if (card.default_timer && (card.timer === 0 || !timer(card))) return

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
