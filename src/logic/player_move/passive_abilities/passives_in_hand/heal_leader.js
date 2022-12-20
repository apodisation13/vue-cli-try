import { heal } from "@/logic/player_move/abilities/ability_heal"
import { timer } from "@/logic/game_logic/timers"

function heal_leader(card) {
  if (card.default_timer && (card.timer === 0 || !timer(card))) return
  heal({ heal: card.value })
}

export { heal_leader }
