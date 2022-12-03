import { if_in_deck_increase_self_damage } from "@/logic/player_move/passive_abilities/passives_in_deck/if_in_deck_increase_self_damage"

export function deck_passives(card) {
  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В КОЛОДЕ
  const cpa = card.passive_ability.name
  if (cpa === "if-in-deck-increase-self-damage") {
    if_in_deck_increase_self_damage(card)
  }
}
