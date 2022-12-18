import { choice_element } from "@/lib/utils"
import { sound_passive_increase_damage } from "@/logic/play_sounds"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function set_dmg_as_random_enemy_grave(card, gameObj) {
  const { enemies_grave } = gameObj
  if (!enemies_grave.length) return

  card.damage = choice_element(enemies_grave).damage

  timeoutAnimationFlag(card, "incr_dmg", sound_passive_increase_damage)
}
