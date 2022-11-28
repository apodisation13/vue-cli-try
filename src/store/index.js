import { createStore } from "vuex"
import login from "@/store/modules/login"
import database from "@/store/modules/database"
import game from "@/store/modules/game"
import user_actions from "@/store/modules/user_actions"
import news from "@/store/modules/news"

// ИНСТРУКЦИЯ:
// в шаблонах $store. state, getters['name'], commit('name', чё) для мутаций
// в .vue - this.$store. и то же самое
// в .js - ИМПОРТ store отсюда, и тогда store.  а дальше то же

const store = createStore({
  modules: {
    login,
    database,
    game,
    user_actions,
    news,
  },
  state: {
    play_sound: true,
  },
  getters: {},
  mutations: {
    set_play_sound(state) {
      state.play_sound = !state.play_sound
    },
  },
  actions: {},
})

export default store
