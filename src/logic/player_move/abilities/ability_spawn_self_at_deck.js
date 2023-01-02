import { copyObj } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function spawn_self_at_deck(card, gameObj) {
  gameObj.deck.push(copyObj(card))
  timeoutAnimationFlag(gameObj.deck[0], "trigger_deck_passive")
}
