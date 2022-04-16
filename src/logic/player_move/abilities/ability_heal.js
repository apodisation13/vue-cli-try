import store from "@/store"
import {sound_heal} from "@/logic/play_sounds"


function heal(card) {
  let temp = store.state.health  // сохраняем сколько было жизней
  store.commit('set_health', `${store.state.health}+${card.heal}`)  // 45+12
  setTimeout(() => {
    store.commit('set_health', temp)
    store.commit('change_health', card.heal)
  }, 750)
  sound_heal()
}

export { heal }