import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

function if_in_grave_increase_self_damage(card) {
  card.damage += card.value
  timeoutAnimationFlag(card, "trigger_grave_passive")
}

export { if_in_grave_increase_self_damage }
