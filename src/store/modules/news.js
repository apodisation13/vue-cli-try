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
  fetchNews({ commit }) {
    try {
      axios.get(all_news).then(response => commit("set_news", response.data))
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
