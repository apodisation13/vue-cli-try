import { useToast } from 'vue-toastification'
import {sound_destroy_enemy} from "@/logic/play_sounds"
import {get_random_enemy} from "@/logic/player_move/service/service_for_player_move"

const toast = useToast()


function destroy_random(field, enemy_leader) {
  let target = get_random_enemy(field, enemy_leader)

  toast.warning(`Уничтожили случайного врага, ${target.name}!`)
  sound_destroy_enemy()

  let index = field.indexOf(target)
  if (index !== -1) field[index] = ''
  else enemy_leader.hp = 0
}


export {destroy_random}