import { sound_passive_increase_damage } from "@/logic/play_sounds"
import { choice } from "@/lib/utils"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
  timer,
} from "@/logic/game_logic/timers"

function increase_damage_in_hand(card, hand) {
  if (card.default_timer && (card.timer === 0 || !timer(card))) return

  let random = choice(hand)

  timeoutAnimationValue(
    hand[random],
    "damage",
    `${hand[random].damage}+${card.value}`,
    card.value,
    sound_passive_increase_damage
  )
  timeoutAnimationFlag(hand[random], "incr_dmg")
}

export { increase_damage_in_hand }
