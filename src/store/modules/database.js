import axios from "axios"
import { useToast } from 'vue-toastification'
import {user_database, user_resource} from "@/store/const/api_urls"

const toast = useToast()

const state = {
  factions: [{"name": "Neutral"}, {"name": "Soldiers"}, {"name": "Animals"}, {"name": "Monsters"}],
  leaders: [],
  cards: [],
  decks: [],
  levels: [],  // все уровни, из запроса
  resource: {},
  databaseLoaded: false,
  errorLoading: '',
}

const getters = {
  all_factions: state => state.factions,
  all_leaders: state => state.leaders,
  all_cards: state => state.cards,
  all_decks: state => state.decks,
  all_levels: state => state.levels,
  resource: state => state.resource,

  filtered_cards: state => (query, count) => {
    const applyFilter = (data, query) => data.filter(obj =>
      Object.entries(query).every(([prop, find]) => find.includes(obj.card[prop]))
    )
    if (count === undefined) return applyFilter(state.cards, query)
    else {
      if (count === 0) return applyFilter(state.cards.filter(card=>card.count === 0), query)
      else return applyFilter(state.cards.filter(card=>card.count > 0), query)
    }
  },
  filtered_leaders: (state) => (fac) => {
    return state.leaders.filter(f => f.card.faction===fac)
  },
}

const mutations = {
  set_leaders(state, result) {  // гет запрос на лидеров
    state.leaders = result
  },
  set_cards(state, result) {  // гет запрос на базу карт
    state.cards = result
  },
  set_decks(state, result) {  // гет запрос на сохранённые колоды
    state.decks = result
  },
  set_levels(state, result) {  // гет запрос уровни (а в них враги)
    state.levels = result
  },
  set_resource(state, result) {
    // {scraps, wood, kegs, big_kegs, chests}
    state.resource = result
  },

  set_databaseLoaded(state, payload) {
    state.databaseLoaded = payload
  },
  set_errorLoading(state, payload) {
    state.errorLoading = payload
  },
}

const actions = {
  async get_user_database({ commit, getters, dispatch }) {
    let user_id = getters["getUser"].user_id
    let header = getters['getHeader']
    const url = `${user_database}${user_id}`

    try {
      let response = await axios.get(url, header)
      commit('set_leaders', response.data.leaders)
      commit('set_cards', response.data.cards)

      commit('set_decks', response.data.u_d)
      dispatch('set_deck_in_play', response.data.u_d[0])

      commit('set_levels', response.data.levels)
      dispatch('set_level_in_play', response.data.levels[0])

      if (!getters['resource'].scraps) await dispatch("get_resource")

      commit('set_databaseLoaded', true)
      toast.success("Успешно загрузили всю вашу базу данных")
    } catch (err) {
      dispatch("error_action")
      throw new Error("Ошибка загрузки базы данных!")
    }
  },

  async get_resource({ commit, getters, dispatch }) {
    let header = getters['getHeader']
    let user_id = getters["getUser"].user_id
    const url = `${user_resource}${user_id}/`
    try {
      let response = await axios.get(url, header)
      commit('set_resource', response.data)
      toast.success("Успешно загрузили ресурсы")
      return true
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Ошибка при загрузке ресурсов")
    }
  },

  error_action({ commit }, err) {
    commit("set_errorLoading", err.message)
    commit('set_databaseLoaded', false)
    toast.error("Произошла какая-то ошибка при загрузке вашей базы данных")
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}