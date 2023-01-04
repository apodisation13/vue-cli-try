import { choice_element } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function set_dmg_random_grave(enemy, gameObj) {
  const { enemies_grave } = gameObj
  if (!enemies_grave.length) return

  enemy.damage = choice_element(enemies_grave).damage
  timeoutAnimationFlag(enemy, "incr_dmg", sound_passive_increase_damage)
}
