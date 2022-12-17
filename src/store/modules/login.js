import axios from "axios"
import { useToast } from "vue-toastification"
import { check_auth_url, register_url } from "@/store/const/api_urls"

const toast = useToast()

const state = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  is_logged_in: false,
  header: "",
  authorization: false, // флаг процесса авторизации, нужен для кнопки НАЧАТЬ на экране эмблемы
}

const getters = {
  getUser: state => state.user,
  isLoggedIn: state => state.is_logged_in,
  getHeader: state => state.header,
  getAuthState: state => state.authorization,
}

const mutations = {
  logged_in(state, user) {
    state.user = user
    state.is_logged_in = true
    state.header = { headers: { Authorization: `Token ${state.user.token}` } }
    localStorage.setItem("user", JSON.stringify(user))
  },
  logged_out(state) {
    state.is_logged_in = false
    state.header = ""
    state.user = ""
    localStorage.removeItem("user")
    // FIXME: здесь должен быть запрос на очистку токена?
  },
  // устанавливаем флаг процесса проверки загрузки
  set_auth_state(state, payload) {
    state.authorization = payload
  },
}

const actions = {
  async check_auth({ getters, dispatch, commit }) {
    commit("set_auth_state", true) // пошел процесс загрузки, флаг
    try {
      let user = getters["getUser"]
      await dispatch("login", { username: user.email, password: user.password })
    } catch (err) {
      commit("logged_out")
      toast.warning(
        "По сохранённым ранее данным юзера не получилось авторизоваться, попробуйте вручную!"
      )
      throw new Error(
        "По сохранённым ранее данным юзера не получилось авторизоваться, попробуйте вручную"
      )
    } finally {
      commit("set_auth_state", false) // не важно, каков итог, в любом случае флаг снимем
    }
  },
  async login({ commit }, userObj) {
    try {
      const response = await axios.post(check_auth_url, userObj)
      commit("logged_in", {
        email: response.data.email,
        token: response.data.token,
        username: response.data.username,
        user_id: response.data.user_id,
        password: userObj.password,
      })
      toast.success("Успешно вошли!")
      return response.data.token
    } catch (err) {
      commit("logged_out")
      toast.warning("Произошла ошибка!")
      throw new Error("Ошибка авторизации, проверьте пароль")
    }
  },
  // eslint-disable-next-line no-unused-vars
  async userRegister({ commit }, userObj) {
    try {
      const response = await axios.post(register_url, userObj)
      toast.success(
        "Успешно зарегистрированы, а теперь войдите, используя свои данные"
      )
      return response.data
    } catch (err) {
      toast.error("Произошла ошибка!")
      let error_message = err.response.data
      if (error_message.length > 50) error_message = "Ошибка регистрации"
      throw new Error(error_message)
    }
  },
  logout({ commit }) {
    commit("logged_out")
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
