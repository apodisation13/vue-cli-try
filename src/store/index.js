import { createStore } from "vuex"
import login from "@/store/modules/login"
import database from "@/store/modules/database"
import game from "@/store/modules/game"
import user_actions from "@/store/modules/user_actions"

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
  },
  state: {
    play_sound: false,
    show_menu: true,
    isGame: false,
  },
  getters: {},
  mutations: {
    set_play_sound(state, payload) {
      state.play_sound = payload
    },
    set_show_menu(state, payload) {
      state.show_menu = payload
    },
    set_isGame(state, payload) {
      state.isGame = payload
    },
  },
  actions: {},
})

export default store
