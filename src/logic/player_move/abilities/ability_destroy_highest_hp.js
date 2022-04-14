import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"
import { useToast } from 'vue-toastification'
import {sound_destroy_enemy} from "@/logic/play_sounds"

const toast = useToast()


function destroy_highest_hp(field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)
  all_enemies.sort((a, b) => b.hp - a.hp)
  let index = field.indexOf(all_enemies[0])
  toast.warning(`Уничтожили врага с самым большим здоровьем, ${all_enemies[0].hp}!`)
  sound_destroy_enemy()
  if (index !== -1) field[index] = ''
  else enemy_leader.hp = 0
}


export {destroy_highest_hp}