import { sound_passive_increase_damage } from "@/logic/play_sounds"
import { choice } from "@/lib/utils"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"

function increase_damage_in_hand(card, gameObj) {
  const { hand } = gameObj
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
