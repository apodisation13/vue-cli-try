import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"
import {sound_destroy_enemy} from "@/logic/play_sounds"




function destroy_highest_hp(field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)
  all_enemies.sort((a, b) => b.hp - a.hp)
  let target = all_enemies[0]

  sound_destroy_enemy()
  target.hp = `${target.hp}-${target.hp}`

  setTimeout(() => {
    target.hp = 0
    let index = field.indexOf(target)
    if (index !== -1) field[index] = ''  // если это не лидер врагов, убираем его
  }, 1000)
}


export {destroy_highest_hp}