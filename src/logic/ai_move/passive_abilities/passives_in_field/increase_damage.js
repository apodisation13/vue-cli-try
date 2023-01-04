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

function incr_dmg_row(enemy, field) {
  let index = field.indexOf(enemy)
  let min = Math.floor(index / 3) * 3
  let max = min + 3
  sound_passive_increase_damage()
  timeoutAnimationFlag(enemy, "incr_dmg")
  field.slice(min, max).forEach(e => {
    if (e) {
      timeoutAnimationValue(
        e,
        "damage",
        `${e.damage}+${enemy.value}`,
        enemy.value,
        undefined,
        750
      )
    }
  })
}

function incr_dmg_column(enemy, field) {
  let index = field.indexOf(enemy) % 3
  let indexes = [index, index + 3, index + 6, index + 9]
  sound_passive_increase_damage()
  timeoutAnimationFlag(enemy, "incr_dmg")
  indexes.forEach(i => {
    if (field[i]) {
      timeoutAnimationValue(
        field[i],
        "damage",
        `${field[i].damage}+${enemy.value}`,
        enemy.value,
        undefined,
        750
      )
    }
  })
}

export { incr_self_dmg, incr_random_dmg, incr_dmg_row, incr_dmg_column }
