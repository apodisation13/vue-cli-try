import store from "@/store"
import {sound_heal} from "@/logic/play_sounds"


function heal(card) {
  store.commit('change_health', card.heal)
  sound_heal()
}

export { heal }