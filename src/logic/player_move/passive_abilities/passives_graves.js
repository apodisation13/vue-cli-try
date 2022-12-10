import { if_in_grave_increase_self_damage } from "@/logic/player_move/passive_abilities/passives_in_grave/if_in_grave_increase_self_damage"

export function trigger_passive_grave(card) {
  card.trigger_grave_passive = true
  setTimeout(() => {
    card.trigger_grave_passive = false
  }, 500)
}

export function grave_passives(card) {
  // ДИСПЕТЧЕР ПАССИВНЫХ АБИЛОК В КЛАДБИЩЕ
  const cpa = card.passive_ability.name
  if (cpa === "if-in-grave-increase-self-damage") {
    if_in_grave_increase_self_damage(card)
  }
}
