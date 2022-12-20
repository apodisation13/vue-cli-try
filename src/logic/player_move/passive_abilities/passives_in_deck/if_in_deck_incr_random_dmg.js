import { choice } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function if_in_deck_incr_random_dmg(card, gameObj) {
  const { deck } = gameObj
  if (!deck) return

  timeoutAnimationFlag(card, "trigger_deck_passive")
  deck[choice(deck)].damage += card.value
}
