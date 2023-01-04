import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { sound_deathwish, sound_heal } from "@/logic/play_sounds"
import { timeoutAnimationValue } from "@/logic/game_logic/timers"

export function deathwish_heal_all(enemy, gameObj) {
  const { field, enemy_leader } = gameObj
  let all_enemies = get_all_enemies(field, enemy_leader)

  sound_deathwish()
  sound_heal()
  all_enemies.forEach(e => {
    timeoutAnimationValue(
      e,
      "hp",
      `${e.hp}+${enemy.deathwish_value}`,
      enemy.deathwish_value,
      undefined,
      750
    )
  })
}
