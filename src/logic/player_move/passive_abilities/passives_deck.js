import { if_in_deck_increase_self_damage } from "@/logic/player_move/passive_abilities/passives_in_deck/if_in_deck_increase_self_damage"
import { if_in_deck_incr_random_dmg } from "@/logic/player_move/passive_abilities/passives_in_deck/if_in_deck_incr_random_dmg"
import { destroy_2_enemies } from "@/logic/player_move/passive_abilities/passives_in_hand/destroy_2_enemies"
import { allowActionTimer } from "@/logic/game_logic/timers"

export function deck_passives(card, gameObj) {
  if (!allowActionTimer(card)) return

  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В КОЛОДЕ
  const cpa = card.passive_ability.name
  if (cpa === "if-in-deck-increase-self-damage") {
    if_in_deck_increase_self_damage(card)
  } else if (cpa === "if-in-deck-incr-random-dmg") {
    if_in_deck_incr_random_dmg(card, gameObj)
  } else if (cpa === "if-in-deck-destroy-2-enemies") {
    destroy_2_enemies(card, gameObj)
  }
}
