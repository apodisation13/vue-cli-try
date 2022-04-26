import axios from "axios"
import {post_deck} from "@/store/const/api_urls"
import { useToast } from 'vue-toastification'

const toast = useToast()


const state = {

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
      this.dispatch("error_action", err)
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
      this.dispatch("error_action", err)
      throw new Error("Какая-то ошибка при удалении деки")
    }
  }
}


export default {
  state,
  getters,
  mutations,
  actions,
}