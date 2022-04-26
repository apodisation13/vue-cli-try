import store from "@/store"
import {useToast} from 'vue-toastification'
import {sound_enemy_damage_player} from "@/logic/play_sounds"
import {check_lose} from "@/logic/ai_move/service/check_lose"

const toast = useToast()


function passive_end_turn_damage(enemy) {
  store.commit('change_health', -enemy.passive_damage)
  toast.error(`враг ${enemy.name} нанёс пассивный урон ${enemy.passive_damage}`)
  sound_enemy_damage_player()
  check_lose()
}


export {passive_end_turn_damage}