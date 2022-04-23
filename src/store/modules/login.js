import axios from "axios"
import { useToast } from 'vue-toastification'

const toast = useToast()
const check_auth_url = 'http://localhost:8000/accounts/api-token-auth/'
const register_url = 'http://localhost:8000/accounts/register/'

const state = {
  token: '',
  is_logged_in: false,
  username: '',
}

const getters = {
  isLoggedIn: state => state.is_logged_in,
  getUsername: state => state.username,
}

const mutations = {
  logged_in(state) {
    state.is_logged_in = true
  },
  set_token(state, payload) {
    state.token = payload
  },
  set_username(state, payload) {
    state.username = payload
  },
}

const actions = {
  async login({ commit }, userObj) {
    try {
      const response = await axios.post(check_auth_url, userObj)
      commit('logged_in')
      commit('set_token', response.data.token)
      commit('set_username', userObj.username)
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
      throw new Error('Ошибка регистрации, проверьте что почта правильная')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}