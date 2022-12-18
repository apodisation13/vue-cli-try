import { sound_passive_increase_damage } from "@/logic/play_sounds"
import { choice } from "@/lib/utils"
import { timeoutAnimation } from "@/logic/game_logic/timers"

function increase_damage_in_hand(card, hand) {
  let random = choice(hand)

  timeoutAnimation(
    hand[random],
    "damage",
    sound_passive_increase_damage,
    `${hand[random].damage}+${card.value}`,
    card.value,
    false,
    750
  )
  timeoutAnimation(hand[random], "incr_dmg", null, null, null, true, 750)
}

export { increase_damage_in_hand }
