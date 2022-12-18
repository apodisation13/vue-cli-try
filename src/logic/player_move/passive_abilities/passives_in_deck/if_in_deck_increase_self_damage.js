import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

function if_in_deck_increase_self_damage(card) {
  card.damage += card.value
  timeoutAnimationFlag(card, "trigger_passive_deck")
}

export { if_in_deck_increase_self_damage }
