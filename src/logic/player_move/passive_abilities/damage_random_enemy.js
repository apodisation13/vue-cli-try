import {get_random_enemy, hit_one_enemy} from "@/logic/player_move/service/service_for_player_move"
import {sound_damage_one} from "@/logic/play_sounds"
import { useToast } from 'vue-toastification'

const toast = useToast()


function passive_end_turn_damage_random_enemy(field, card, leader, enemy_leader) {
  let target = get_random_enemy(field, enemy_leader)  // взяли всех врагов, из них взяли одного

  if (!target) return  // если щас нет врагов на поле и нет живого лидера врагов, выходим

  hit_one_enemy(target, {"damage": 1})
  sound_damage_one()
  toast.info(`Пассивный урон врагу ${target.name} на 1`)

  if (target.hp <= 0) {
    let index = field.indexOf(target)
    if (index !== -1) field[index] = ''  // если умер НЕ лидер врагов
    console.log('умер враг')
  }
}


export {passive_end_turn_damage_random_enemy}