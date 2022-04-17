import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"
import {sound_destroy_enemy} from "@/logic/play_sounds"


function destroy_highest_damage(field, enemy_leader) {

  let all_enemies
  if (enemy_leader.damage_per_turn && enemy_leader.hp > 0) {
    all_enemies = get_all_enemies(field, {hp: enemy_leader.hp, damage: enemy_leader.damage_per_turn})
  }
  else all_enemies = get_all_enemies(field, {hp: 0})

  if (!all_enemies.length) return

  all_enemies.sort((a, b) => b.damage - a.damage)
  let target = all_enemies[0]

  sound_destroy_enemy()
  target.hp = `${target.hp}-${target.hp}`

  setTimeout(() => {
    target.hp = 0
    let index = field.indexOf(target)
    if (index !== -1) field[index] = ''  // если это не лидер врагов, убираем его
  }, 1000)
}


export {destroy_highest_damage}