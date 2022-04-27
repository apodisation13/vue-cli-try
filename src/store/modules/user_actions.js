import axios from "axios"
import {craft_card, mill_card, user_resource, post_deck} from "@/store/const/api_urls"
import { useToast } from 'vue-toastification'

const toast = useToast()


const state = {
  open_level_easy: 500,
  open_level_normal: 1000,
  open_level_hard: 2000,
  craft_bronze: 200,
  craft_silver: 1000,
  craft_gold: 2000,
  craft_leader: 5000,
  mill_bronze: 20,
  mill_silver: 100,
  mill_gold: 200,
  mill_leader: 200,
  play_level_easy: 50,
  play_level_normal: 100,
  play_level_hard: 200,
  win_level_easy: 100,
  win_level_normal: 250,
  win_level_hard: 500,
}

const getters = {

}

const mutations = {

}

const actions = {
  async post_deck({ getters, dispatch }, body) {
    try {
      let header = getters['getHeader']
      await axios.post(post_deck, body, header)
      toast.success("Успешно добавили колоду")
      await dispatch('get_user_database')
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при добавлении деки")
    }
  },

  async delete_deck({ getters, dispatch }, deck_id) {
    try {
      let header = getters['getHeader']
      let url = `${post_deck}${deck_id}`
      await axios.delete(url, header)
      toast.success("Успешно удалили колоду")
      await dispatch('get_user_database')
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при удалении деки")
    }
  },

  async pay_resource({ getters, dispatch }, value) {
    alert(value)
    let header = getters['getHeader']
    let user_id = getters["getUser"].user_id
    let resource = getters["resource"]
    let patch_resource = resource + value
    alert(patch_resource)
    const url = `${user_resource}${user_id}/`

    try {
      await axios.patch(url, {"resource": patch_resource}, header)
      await dispatch("get_resource")
      return true
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при менеджменте ресурсов")
    }
  },

  calculate_value({ state }, obj) {

    if (obj.process === "craft") {
      if (obj.card.card.color === "Bronze") return -state.craft_bronze
      else if (obj.card.card.color === "Silver") return -state.craft_silver
      else if (obj.card.card.color === "Gold") return -state.craft_gold
      else return state.craft_leader
    }

    else if (obj.process === "mill") {
      // нельзя: если карт 0, или если карт 1 и при этом она в стартовом наборе (unlocked то есть)
      if (obj.card.count === 0 || (obj.card.count === 1 && obj.card.card.unlocked)) {
        toast.error('Нельзя размиллить карту из стартового набора (или карту которой у вас и так нет, ха-ха)')
        return
      }
      if (obj.card.card.color === "Bronze") return state.mill_bronze
      else if (obj.card.card.color === "Silver") return state.mill_silver
      else if (obj.card.card.color === "Gold") return state.mill_gold
      else return state.mill_leader
    }
  },

  async craft_card_action({ dispatch, getters }, card) {
    let header = getters['getHeader']
    let user_id = getters["getUser"].user_id

    if (card.count === 0) {
      try {
        await axios.post(craft_card, {"user": user_id, "card": card.card.id}, header)
        await dispatch("get_user_database")
      } catch (err) {
        dispatch("error_action", err)
        throw new Error("Какая-то ошибка при создании карты")
      }
    }

    else if (card.count >= 1) {
      try {
        // card.id - id записи, которую надо патчить (usercard), card.card.id - id самой карты
        let url = `${craft_card}${card.id}/`
        await axios.patch(url, {"user": user_id, "card": card.card.id, "count": card.count}, header)
        await dispatch("get_user_database")
      } catch (err) {
        dispatch("error_action", err)
        throw new Error("Какая-то ошибка при создании карты")
      }
    }
  },

  async mill_card_action({ dispatch, getters }, card) {
    let header = getters['getHeader']
    let user_id = getters["getUser"].user_id
    let url = `${mill_card}${card.id}/`

    try {
      await axios.patch(url, {"user": user_id, "card": card.card.id, "count": card.count}, header)
      await dispatch("get_user_database")
    } catch (err) {
      dispatch("error_action", err)
      throw new Error("Какая-то ошибка при создании карты")
    }
  },

}


export default {
  state,
  getters,
  mutations,
  actions,
}