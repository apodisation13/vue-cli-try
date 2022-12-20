const state = {
  isStarted: false,
}

const mutations = {
  gameStarting(state) {
    state.isStarted = true
  },
}

export default {
  state,
  mutations,
}
