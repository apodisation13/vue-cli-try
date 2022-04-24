import axios from "axios"
import { useToast } from 'vue-toastification'

const toast = useToast()
const check_auth_url = 'http://localhost:8000/accounts/api-token-auth/'
const register_url = 'http://localhost:8000/accounts/register/'

const state = {
  username: '',
  user_id: undefined,
  token: '',
  is_logged_in: false,
}

const getters = {
  isLoggedIn: state => state.is_logged_in,
  getUsername: state => state.username,
}

const mutations = {
  logged_in(state, { username, user_id, token }) {
    state.username = username
    state.user_id = user_id
    state.token = token
    state.is_logged_in = true
  },
  logged_out(state) {
    state.username = ''
    state.user_id = undefined
    state.token = ''
    state.is_logged_in = false
    // здесь должен быть запрос на очистку токена?
  },
}

const actions = {
  async login({ commit }, userObj) {
    try {
      const response = await axios.post(check_auth_url, userObj)
      commit('logged_in', {
        username: response.data.username,
        user_id: response.data.user_id,
        token: response.data.token,
      })
      toast.success('Успешно вошли!')
      return response.data.token
    } catch (err) {
      toast.error('Произошла ошибка!')
      throw new Error('Ошибка авторизации, проверьте пароль')
    }
  },
  async userRegister({ commit }, userObj) {
    try {
      const response = await axios.post(register_url, userObj)
      toast.success('Успешно зарегистрированы, а теперь войдите, используя свои данные')
      return response.data
    } catch (err) {
      toast.error('Произошла ошибка!')
      let error_message = err.response.data
      if (error_message.length > 50) error_message = 'Ошибка регистрации'
      throw new Error(error_message)
    }
  },
  logout({ commit }) {
    commit('logged_out')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}