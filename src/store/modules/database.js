import axios from "axios"
import { useToast } from "vue-toastification"
import { user_database, user_resource } from "@/store/const/api_urls"

const toast = useToast()

const state = {
  factions: [
    { name: "Neutral" },
    { name: "Soldiers" },
    { name: "Animals" },
    { name: "Monsters" },
  ],
  leaders: [],
  cards: [],
  decks: [],
  levels: [], // все уровни, из запроса
  seasons: [],
  resource: {},

  databaseLoaded: false,
  errorLoading: "",

  enemies: [],
  enemy_leaders: [],
}

const getters = {
  all_factions: state => state.factions,
  all_leaders: state => state.leaders,
  all_cards: state => state.cards,
  all_decks: state => state.decks,
  all_levels: state => state.levels,
  all_seasons: state => state.seasons,
  resource: state => state.resource,

  filtered_cards: state => query => {
    const applyFilter = (data, query) =>
      data.filter(obj =>
        Object.entries(query).every(([prop, find]) => {
          if ("count" === prop) {
            return true
          }
          if ("has_passive" === prop && find === null) {
            return true
          }
          if ("has_passive" === prop) {
            return obj.card[prop] === find
          }
          if ("faction" === prop) {
            return obj.card[prop].includes(find) || obj.card[prop] === "Neutral"
          }
          return obj.card[prop].includes(find)
        })
      )
    if (query.count === null) {
      return applyFilter(state.cards, query)
    }

    if (query.count === 0) {
      return applyFilter(
        state.cards.filter(card => card.count === 0),
        query
      )
    }

    return applyFilter(
      state.cards.filter(card => card.count >= query.count),
      query
    )
  },
  filtered_leaders: state => selected_faction => {
    return state.leaders.filter(leader =>
      leader.card.faction.includes(selected_faction)
    )
  },

  all_enemies: state => state.enemies,
  bronze_enemies: state => state.enemies.filter(e => e.color === "Bronze"),
  silver_enemies: state => state.enemies.filter(e => e.color === "Silver"),
  gold_enemies: state => state.enemies.filter(e => e.color === "Gold"),
  all_enemy_leaders: state => state.enemy_leaders,
}

const mutations = {
  set_leaders(state, result) {
    // гет запрос на лидеров
    state.leaders = result
  },
  set_cards(state, result) {
    // гет запрос на базу карт
    state.cards = result
  },
  set_decks(state, result) {
    // гет запрос на сохранённые колоды
    state.decks = result
  },
  set_levels(state, result) {
    // гет запрос уровни (а в них враги)
    state.levels = result
  },
  set_seasons(state, result) {
    state.seasons = result
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

  set_enemies(state, payload) {
    state.enemies = payload
  },
  set_enemy_leaders(state, payload) {
    state.enemy_leaders = payload
  },
}

const actions = {
  // в ответе user_database: cards,leaders,u_d(колоды),levels, resources: тут ресурсы
  async get_user_database({ commit, getters, dispatch }) {
    let user_id = getters["getUser"].user_id
    let header = getters["getHeader"]
    const url = `${user_database}${user_id}`

    try {
      let response = await axios.get(url, header)
      const {
        user_database,
        seasons,
        resources,
        enemies,
        enemy_leaders,
        game_const,
      } = response.data

      commit("set_leaders", user_database.leaders)
      commit("set_cards", user_database.cards)

      commit("set_decks", user_database.u_d)
      dispatch("set_deck_in_play", user_database.u_d[0]) // устанавливаем для игры первую колоду

      // commit("set_levels", user_database.levels)
      commit("set_seasons", seasons)
      dispatch("set_level_in_play", seasons[0].levels[0]) // устанавливаем для игры первый уровень

      commit("set_resource", resources)

      commit("set_enemies", enemies)
      commit("set_enemy_leaders", enemy_leaders)

      commit("set_game_const", game_const) // рука, карт в колоде
      commit("set_game_prices", game_const) // всякие игровые цены

      commit("set_databaseLoaded", true)
      toast.success("Успешно загрузили всю вашу базу данных")
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Ошибка загрузки базы данных!")
    }
  },

  async get_resource({ commit, getters, dispatch }) {
    let header = getters["getHeader"]
    let user_id = getters["getUser"].user_id
    const url = `${user_resource}${user_id}/`
    try {
      let response = await axios.get(url, header)
      commit("set_resource", response.data)
      toast.success("Успешно загрузили ресурсы")
      return true
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Ошибка при загрузке ресурсов")
    }
  },

  async get_cards() {
    // let header = getters["getHeader"]
  },
  async get_leaders() {
    // let header = getters["getHeader"]
  },
  async get_decks() {
    // let header = getters["getHeader"]
  },
  async get_levels() {
    // let header = getters["getHeader"]
  },

  error_action({ commit }, err) {
    commit("set_errorLoading", err.message)
    commit("set_databaseLoaded", false)
    toast.error("Произошла какая-то ошибка при загрузке вашей базы данных")
  },

  async render_all_images({ getters, commit }) {
    const cards = getters["all_cards"]
    const leaders = getters["all_leaders"]
    const enemies = getters["all_enemies"]
    const enemy_leaders = getters["all_enemy_leaders"]

    const all_cards = cards
      .concat(leaders)
      .concat(enemies)
      .concat(enemy_leaders)
    if (all_cards.length === 0) {
      commit("set_images_rendered", true)
      return
    }

    toast.info("мы вообще тут")
    const images = all_cards.map(imageSrc => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = imageSrc.card ? imageSrc.card.image : imageSrc.image
        img.onload = resolve
        img.onerror = reject
      })
    })

    Promise.all(images) // TODO: await все решает
      .then(() => {
        console.log("Images loaded!")
        toast.success("Успешно отрендерили картинки")
      })
      .catch(error => {
        console.error("Some image(s) failed loading!")
        console.error(error.message)
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
