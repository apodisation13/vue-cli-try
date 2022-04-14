import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"
import { useToast } from 'vue-toastification'
import {sound_destroy_enemy} from "@/logic/play_sounds"

const toast = useToast()


function destroy_all_same_hp(enemy, field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)
  let targets = all_enemies.filter(e => e.hp === enemy.hp)
  toast.warning(`Уничтожили всех врагов, у котороых ${enemy.hp} жизней!`)
  sound_destroy_enemy()
  targets.forEach(e => {
    e.hp = 0
  })
}


export {destroy_all_same_hp}