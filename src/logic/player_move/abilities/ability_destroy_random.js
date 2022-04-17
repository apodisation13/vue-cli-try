import {sound_destroy_enemy} from "@/logic/play_sounds"
import {get_random_enemy} from "@/logic/player_move/service/service_for_player_move"


function destroy_random(field, enemy_leader) {
  let target = get_random_enemy(field, enemy_leader)

  sound_destroy_enemy()
  target.hp = `${target.hp}-${target.hp}`

  setTimeout(() => {
    target.hp = 0
    let index = field.indexOf(target)
    if (index !== -1) field[index] = ''  // если это не лидер врагов, убираем его
  }, 1000)
}


export {destroy_random}