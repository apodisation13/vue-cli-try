import { sound_passive_increase_damage } from "@/logic/play_sounds"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"
import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { choice_element } from "@/lib/utils"

function incr_self_dmg(enemy) {
  timeoutAnimationFlag(enemy, "incr_dmg")
  timeoutAnimationValue(
    enemy,
    "damage",
    `${enemy.damage}+${enemy.value}`,
    enemy.value,
    sound_passive_increase_damage
  )
}

function incr_random_dmg(enemy, field) {
  let all_enemies = get_all_enemies(field, undefined)
  const random_enemy = choice_element(all_enemies)
  timeoutAnimationValue(
    random_enemy,
    "damage",
    `${random_enemy.damage}+${enemy.value}`,
    enemy.value,
    sound_passive_increase_damage
  )
  timeoutAnimationFlag(enemy, "incr_dmg")
}

export { incr_self_dmg, incr_random_dmg }
