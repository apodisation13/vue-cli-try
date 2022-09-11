import { all_news } from "@/store/const/api_urls"
import axios from "axios"

const state = {
<<<<<<< HEAD
  news: null,
=======
  news: [],
>>>>>>> dev
}

const getters = {
  all_news: state => state.news,
}

const mutations = {
  set_news(state, payload) {
    state.news = payload
  },
}

const actions = {
  async fetchNews({ commit }) {
    const url = all_news
    try {
<<<<<<< HEAD
      let response = await axios.get(url).then(response => response.data)
      commit("set_news", response)
=======
      let response = await axios.get(url)
      commit("set_news", response.data)
>>>>>>> dev
    } catch (err) {
      throw new Error("Ошибка при загрузке новостей")
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
