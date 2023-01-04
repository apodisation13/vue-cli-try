import { destroy_2_enemies } from "@/logic/player_move/passive_abilities/passives_in_hand/destroy_2_enemies"
import {
  allowActionTimer,
  timeoutAnimationFlag,
} from "@/logic/game_logic/timers"
import {
  incr_dmg_to_random,
  incr_self_dmg,
} from "@/logic/player_move/passive_abilities/passives_in_hand/incr_dmg"

export function deck_passives(card, gameObj) {
  if (!allowActionTimer(card)) return

  timeoutAnimationFlag(card, "trigger_deck_passive")

  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В КОЛОДЕ
  const cpa = card.passive_ability.name
  if (cpa === "incr-self-dmg") {
    incr_self_dmg(card, true)
  } else if (cpa === "incr-dmg-to") {
    incr_dmg_to_random(card, gameObj, "deck", true)
  } else if (cpa === "destroy-2-enemies") {
    destroy_2_enemies(card, gameObj)
  }
}
