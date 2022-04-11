import store from "@/store"
import { useToast } from 'vue-toastification'
import {sound_heal} from "@/logic/play_sounds"

const toast = useToast()


function heal(card) {
  store.commit('change_health', card.heal)
  toast.success(`лечение на ${card.heal}`)
  sound_heal()
}

export { heal }