const state = {
  theme: 1,
}

const getters = {
  selectedTheme: state => state.theme,
}

const mutations = {
  set_theme(state, payload) {
    state.theme = payload
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}
