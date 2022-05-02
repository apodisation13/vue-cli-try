import {sound_destroy_enemy} from "@/logic/play_sounds"
import {get_random_enemy} from "@/logic/player_move/service/service_for_player_move"
import {check_win} from "@/logic/player_move/service/check_win"


function destroy_random(field, enemy_leader, enemies) {
  let target = get_random_enemy(field, enemy_leader)

  sound_destroy_enemy()
  target.hp = `${target.hp}-${target.hp}`

  setTimeout(() => {
    target.hp = 0
    let index = field.indexOf(target)
    if (index !== -1) field[index] = ''  // если это не лидер врагов, убираем его

    check_win(field, enemies, enemy_leader)
  }, 1000)
}


export {destroy_random}