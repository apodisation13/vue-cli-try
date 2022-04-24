import axios from "axios"
import { useToast } from 'vue-toastification'
import { user_database } from "@/store/const/api_urls"

const toast = useToast()

const state = {
  factions: ["Neutral", "Soldiers", "Animals", "Monsters"],
  leaders: [],
  cards: [],
  decks: [],
  levels: [],  // все уровни, из запроса
}

const getters = {
  all_factions: state => state.factions,
  all_leaders: state => state.leaders,
  all_cards: state => state.cards,
  all_decks: state => state.decks,
  all_levels: state => state.levels,

  filtered_cards: state => query => {
    const applyFilter = (data, query) => data.filter(obj =>
      Object.entries(query).every(([prop, find]) => find.includes(obj[prop]))
    )
    return applyFilter(state.cards, query)
  },
  filtered_leaders: (state) => (fac) => {
    return state.leaders.filter(f => f.faction===fac)
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
}

const actions = {
  async get_user_database({ commit, getters }) {
    let user_id = getters["getUser"].user_id
    let header = getters['getHeader']
    const url = `${user_database}${user_id}`
    let response = await axios.get(url, header)
    console.log(response.data)

    alert('http://194.67.109.190:82' + response.data.locked_leaders[0].image)

    commit('set_leaders', response.data.locked_leaders)
    commit('set_cards', response.data.locked_cards)

    // const factions = get(FACTIONS)
    // const leaders = get(LEADERS)
    // const cards = get(CARDS)
    // const levels = get(LEVELS)
    // const decks = this.dispatch("get_decks")  // вот так можно, хотя там нет ретерна

    // const url = `${user_database}${id}`
    // const user_database = await axios.get(url)
    //
    // try {
    //   const responses = await Promise.all([
    //     factions, leaders, cards, levels, decks,
    //   ])
    //   commit('get_factions', responses[0])
    //   commit('get_leaders', responses[1])
    //   commit('get_cards', responses[2])
    //
    //   commit('get_levels', responses[3])
    //   commit('set_level', responses[3]?.[0])
    //   commit('set_enemy_leader', responses[3]?.[0]?.enemy_leader)
    //
    //   commit('set_isLoaded', true)
    //
    // } catch (err) {
    //   this.dispatch("error_action", err)
    //   throw new Error("Произошла ошибка в загрузке данных")
    // }

  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}