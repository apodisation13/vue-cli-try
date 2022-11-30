import axios from "axios"
import {
  craft_card,
  craft_leader,
  mill_card,
  mill_leader,
  patch_levels,
  post_deck,
  user_resource,
} from "@/store/const/api_urls"
import { useToast } from "vue-toastification"

const toast = useToast()

const state = {
  game_prices: {},

  win_redirect: false,
}

const getters = {}

const mutations = {
  // устанавливаем все игровые цены на крафт, милл итп
  set_game_prices(state, payload) {
    state.game_prices = payload
  },

  set_win_redirect(state, payload) {
    state.win_redirect = payload
  },
}

const actions = {
  async post_deck({ getters, dispatch }, body) {
    try {
      let header = getters["getHeader"]
      await axios.post(post_deck, body, header)
      toast.success("Успешно добавили колоду")
      await dispatch("get_user_database")
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при добавлении деки")
    }
  },

  async delete_deck({ getters, dispatch }, deck_id) {
    try {
      let header = getters["getHeader"]
      let url = `${post_deck}${deck_id}`
      await axios.delete(url, header)
      toast.success("Успешно удалили колоду")
      await dispatch("get_user_database")
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при удалении деки")
    }
  },

  async patch_deck({ getters, dispatch }, deck) {
    // ВНИМАНИЕ: в PATCH методе не забыть поставть слэш в конце!
    try {
      let header = getters["getHeader"]
      let url = `${post_deck}${deck.id}/`
      await axios.patch(url, deck, header)
      toast.success("Успешно изменили колоду")
      await dispatch("get_user_database")
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при изменении деки")
    }
  },

  async pay_resource({ commit, getters, dispatch }, body) {
    let header = getters["getHeader"]
    let user_id = getters["getUser"].user_id
    const url = `${user_resource}${user_id}/`

    try {
      const response = await axios.patch(url, body, header)
      commit("set_resource", response.data)
      return response.data
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при менеджменте ресурсов")
    }
  },

  calculate_value({ state }, obj) {
    // процесс крафта: по цвету, или если цвета нет, то крафтим лидера значит
    if (obj.process === "craft") {
      if (obj.card.color === "Bronze") return state.game_prices.craft_bronze
      else if (obj.card.color === "Silver")
        return state.game_prices.craft_silver
      else if (obj.card.color === "Gold") return state.game_prices.craft_gold
      else return state.game_prices.craft_leader
    }
    // процесс милла: по цвету, или лидера, но нельзя если count = 0, или стартовый набор
    if (obj.process === "mill") {
      // нельзя: если карт 0, или если карт 1 и при этом она в стартовом наборе (unlocked, то есть)
      if (obj.count === 0 || (obj.count === 1 && obj.card.unlocked)) {
        toast.error(
          "Нельзя размиллить карту из стартового набора (или карту которой у вас и так нет, ха-ха)"
        )
        return
      }
      if (obj.card.color === "Bronze") return state.game_prices.mill_bronze
      else if (obj.card.color === "Silver") return state.game_prices.mill_silver
      else if (obj.card.color === "Gold") return state.game_prices.mill_gold
      else return state.game_prices.mill_leader
    }
  },

  async craft_card_action({ dispatch }, card) {
    // если у карты есть цвет, значит это карта, идём на экшен craft_card, иначе это лидер и идём на craft_leader
    if (card.card.color) await dispatch("craft_card", card)
    else await dispatch("craft_leader", card)
  },

  async craft_card({ dispatch, getters, commit }, card) {
    let header = getters["getHeader"]
    let user_id = getters["getUser"].user_id

    if (card.count === 0) {
      try {
        const response = await axios.post(
          craft_card,
          { user: user_id, card: card.card.id },
          header
        )
        commit("set_cards", response.data.cards)
      } catch (err) {
        dispatch("error_action", err)
        throw new Error("Какая-то ошибка при создании карты")
      }
    } else if (card.count >= 1) {
      try {
        // card.id - id записи, которую надо патчить (usercard), card.card.id - id самой карты
        let url = `${craft_card}${card.id}/`
        const response = await axios.patch(
          url,
          { user: user_id, card: card.card.id, count: card.count },
          header
        )
        commit("set_cards", response.data.cards)
      } catch (err) {
        dispatch("error_action", err)
        throw new Error("Какая-то ошибка при создании карты")
      }
    }
  },

  async craft_leader({ dispatch, getters, commit }, card) {
    let header = getters["getHeader"]
    let user_id = getters["getUser"].user_id

    if (card.count === 0) {
      try {
        const response = await axios.post(
          craft_leader,
          { user: user_id, leader: card.card.id },
          header
        )
        commit("set_leaders", response.data.leaders)
      } catch (err) {
        dispatch("error_action", err)
        throw new Error("Какая-то ошибка при создании лидера")
      }
    } else if (card.count >= 1) {
      try {
        // card.id - id записи, которую надо патчить (usercard), card.card.id - id самой карты
        let url = `${craft_leader}${card.id}/`
        const response = await axios.patch(
          url,
          { user: user_id, leader: card.card.id, count: card.count },
          header
        )
        commit("set_leaders", response.data.leaders)
      } catch (err) {
        dispatch("error_action", err)
        throw new Error("Какая-то ошибка при создании лидера")
      }
    }
  },

  async mill_card_action({ dispatch }, user_card) {
    if (user_card.card.color) await dispatch("mill_card", user_card)
    else await dispatch("mill_leader", user_card)
  },

  async mill_card({ dispatch, getters }, user_card) {
    let header = getters["getHeader"]
    let user_id = getters["getUser"].user_id
    let url = `${mill_card}${user_card.id}/`

    try {
      await axios.patch(
        url,
        { user: user_id, card: user_card.card.id, count: user_card.count },
        header
      )
      await dispatch("get_user_database")
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при размалывании карты")
    }
  },

  async mill_leader({ dispatch, getters }, user_card) {
    let header = getters["getHeader"]
    let user_id = getters["getUser"].user_id
    let url = `${mill_leader}${user_card.id}/`

    try {
      await axios.patch(
        url,
        { user: user_id, leader: user_card.card.id, count: user_card.count },
        header
      )
      await dispatch("get_user_database")
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при размалывании лидера")
    }
  },

  // тестоввый экшен, сбрасывает все уровни юзера кроме первого
  async reset_levels({ dispatch, getters }) {
    let header = getters["getHeader"]
    // нужно присылать id записи UserLevel (то есть первого уровня), у которой поставить finished=False
    // const user_level_id = getters["all_levels"][0].id
    let url = `${patch_levels}1/`

    try {
      const response = await axios.patch(url, null, header)
      return response.data
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при сбрасывании уровней")
    }
  },

  // открывает related_levels для текущего, а текущему ставит finished,
  // возвращает полный список уровней ДАННОГО СЕЗОНА
  async open_new_levels({ dispatch, getters, commit }, data) {
    let header = getters["getHeader"]
    let url = `${patch_levels}${data.finished_user_level_id}/`

    try {
      const response = await axios.patch(
        url,
        {
          finished_level: data.finished_level,
          related_levels: data.related_levels,
          season_id: data.season_id,
        },
        header
      )
      commit("set_updated_season", {
        levels: response.data.levels,
        index: data.seasonIndex,
      })
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при открытии уровней")
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
