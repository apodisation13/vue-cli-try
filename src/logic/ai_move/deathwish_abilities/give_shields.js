import { sound_enemy_regain_shield } from "@/logic/play_sounds"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function give_shields_to_all(gameObj) {
  const { field } = gameObj

  field.forEach(e => {
    if (e) e.shield = true
  })
  sound_enemy_regain_shield()
}

export function give_shield_to_all_deck(gameObj) {
  const { enemies } = gameObj
  if (!enemies.length) return

  enemies.forEach(e => {
    e.shield = true
  })
  sound_enemy_regain_shield()
  timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
}
