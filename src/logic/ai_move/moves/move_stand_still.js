import store from "@/store"
import { useToast } from 'vue-toastification'
import {check_lose} from "@/logic/ai_move/service/check_lose"
import {sound_enemy_damage_player} from "@/logic/play_sounds"

const toast = useToast()


function stand_still(field, i) {
  store.commit('change_health', -field[i].damage)
  toast.error(`враг стоит и нанёс урон ${field[i].damage}`)
  sound_enemy_damage_player()
  check_lose(store.state.health)
}


export { stand_still }