import { trigger_passive_deck } from "@/logic/player_move/passive_abilities/passives_deck"

function if_in_deck_increase_self_damage(card) {
  card.damage += card.value
  trigger_passive_deck(card)
}

export { if_in_deck_increase_self_damage }
