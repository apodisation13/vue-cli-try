import {all_news} from "@/store/const/api_urls"
import axios from "axios"

const state = {
  news: [],
}

const getters = {
  all_news: state => state.news
}

const mutations = {
  set_news(state, payload){
    state.news = payload
  },
}

const actions = {
  async fetchNews({commit, getters}){
    const url = all_news
    let header = getters['getHeader']
    try {
      let response = await axios.get(url, header)
      commit('set_news', response.data)
    }
    catch (err) {
      throw new Error("Ошибка при загрузке новостей")
    }
    
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}