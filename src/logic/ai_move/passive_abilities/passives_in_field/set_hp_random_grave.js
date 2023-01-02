import { timeoutAnimationFlag } from "@/logic/game_logic/timers"
import { choice_element } from "@/lib/utils"
import { sound_heal } from "@/logic/play_sounds"

export function set_hp_random_grave(enemy, gameObj) {
  const { enemies_grave } = gameObj
  if (!enemies_grave.length) return

  enemy.hp = choice_element(enemies_grave).hp
  timeoutAnimationFlag(enemy, "healing", sound_heal)
}
