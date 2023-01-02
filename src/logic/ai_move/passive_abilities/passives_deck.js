import {
  allowActionTimer,
  timeoutAnimationFlag,
} from "@/logic/game_logic/timers"
import { heal_random } from "@/logic/ai_move/passive_abilities/passives_in_field/heal"

export function deck_passives(enemy, gameObj) {
  if (!allowActionTimer(enemy)) return

  const { enemy_leader, field, enemies } = gameObj

  const pea = enemy.passive_ability.name

  if (pea === "heal-random") {
    heal_random(enemy, field, enemy_leader)
    timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
  }
}
