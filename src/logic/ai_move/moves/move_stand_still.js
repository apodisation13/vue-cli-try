import store from "@/store"
import { useToast } from 'vue-toastification'
import {check_lose} from "@/logic/ai_move/service/check_lose"

const toast = useToast()


function stand_still(field, i) {
  store.commit('change_health', -field[i].damage)
  toast.error(`враг стоит и нанёс урон ${field[i].damage}`)
  check_lose(store.state.health)
}


export { stand_still }