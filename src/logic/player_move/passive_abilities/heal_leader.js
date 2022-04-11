import store from "@/store"
import {useToast} from 'vue-toastification'
import {sound_heal} from "@/logic/play_sounds"

const toast = useToast()


function passive_end_turn_heal_leader() {
  store.commit('change_health', 1)
  toast.success(`лечение на 1`)
  sound_heal()
}


export {passive_end_turn_heal_leader}