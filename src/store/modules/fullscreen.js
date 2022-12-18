const state = {
  fullscreen: false,
}

const getters = {
  selectedFullScreen: state => state.fullscreen,
}

const mutations = {
  set_fullscreen(state, payload) {
    state.fullscreen = payload
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}
