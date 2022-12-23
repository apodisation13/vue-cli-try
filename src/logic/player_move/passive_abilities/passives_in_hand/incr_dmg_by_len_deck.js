import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function incr_dmg_by_len_deck(card, gameObj) {
  const { deck } = gameObj

  timeoutAnimationValue(
    card,
    "damage",
    `${card.damage}+${deck.length}`,
    deck.length,
    sound_passive_increase_damage
  )
  timeoutAnimationFlag(card, "incr_dmg")
}
