import { all_news } from "@/store/const/api_urls"
import axios from "axios"

const state = {
  news: null,
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
      let response = await axios.get(url).then(response => response.data)
      commit("set_news", response)
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
