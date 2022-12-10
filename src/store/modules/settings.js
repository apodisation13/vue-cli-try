const state = {
  theme: 1,
  avatar: "",
}

const getters = {
  selectedTheme: state => state.theme,
  selectedAvatar: state => state.avatar,
}

const mutations = {
  set_theme(state, payload) {
    state.theme = payload
  },
  set_avatar(state, payload) {
    state.avatar = payload
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}
