import { trigger_passive_grave } from "@/logic/player_move/passive_abilities/passives_graves"

function if_in_grave_increase_self_damage(card) {
  card.damage += card.value
  trigger_passive_grave(card)
}

export { if_in_grave_increase_self_damage }
