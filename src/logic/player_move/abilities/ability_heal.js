import store from "@/store";
import { useToast } from 'vue-toastification'

const toast = useToast()


function heal(card) {
  store.commit('change_health', card.heal)
  toast.success(`лечение на ${card.heal}`)
}

export { heal }