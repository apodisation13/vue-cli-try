import { heal } from "@/logic/player_move/abilities/ability_heal"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

function heal_leader(card) {
  heal({ heal: card.value })
  timeoutAnimationFlag(card, "healing")
}

export { heal_leader }
