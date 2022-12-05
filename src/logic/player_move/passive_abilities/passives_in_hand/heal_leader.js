import { heal } from "@/logic/player_move/abilities/ability_heal"

function heal_leader(card) {
  heal({ heal: card.value })
}

export { heal_leader }
