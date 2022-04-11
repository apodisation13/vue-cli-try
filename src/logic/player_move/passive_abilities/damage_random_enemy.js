import {get_random_enemy} from "@/logic/player_move/service/service_for_player_move"
import {sound_damage_one} from "@/logic/play_sounds"


function passive_end_turn_damage_random_enemy(field, card, leader, enemy_leader) {
  let target = get_random_enemy(field, enemy_leader)  // взяли всех врагов, из них взяли одного

  if (!target) return  // если щас нет врагов на поле и нет живого лидера врагов, выходим

  target.hp -= 1
  sound_damage_one()

  if (target.hp <= 0) {
    let index = field.indexOf(target)
    if (index !== -1) field[index] = ''  // если умер НЕ лидер врагов
    console.log('умер враг')
  }

  if (card) {
    console.log('пассив карты урон 1')
  }

  if (leader) {
    console.log('пассив лидера урон 1')
  }
}


export {passive_end_turn_damage_random_enemy}