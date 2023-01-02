import { sound_passive_increase_damage } from "@/logic/play_sounds"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"

export function incr_dmg_to_all_hand(card, gameObj) {
  const { hand } = gameObj
  if (!hand.length) return

  sound_passive_increase_damage()
  hand.forEach(c => {
    timeoutAnimationValue(c, "damage", c.damage + card.value, card.value)
    timeoutAnimationFlag(c, "incr_dmg")
  })
}
