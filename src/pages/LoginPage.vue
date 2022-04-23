<template>
  <div class="chose_auth_or_reg">
    <button class="chose_btn" @click="choseFormLogin">Вход</button>
    <button class="chose_btn" @click="choseFormRegister">Регистрация</button>
  </div>

  <div class="header" v-if="formLogin">
    АВТОРИЗАЦИЯ
  </div>
  <div class="header" v-else>
    РЕГИСТРАЦИЯ
  </div>

  <div class="form">
    <div class="auth" v-if="!formLogin">
      Введите имя пользователя
    </div>
    <div v-if="!formLogin">
      <input class="data" v-model="username">
    </div>
    <div class="auth" >
      Введите адрес электронной почты
    </div>
    <div>
      <input class="data" v-model="email">
    </div>
    <div class="auth">
      Введите пароль
    </div>
    <div>
      <input class="data" v-model="password">
    </div>
    <div class="auth" v-if="!formLogin">
      Подтвердите пароль
    </div>
    <div v-if="!formLogin">
      <input class="data" v-model="confirmPassword">
    </div>

    <div class="auth">
      <button
          class="login"
          v-if="formLogin"
          @click="login"
      >ВХОД</button>
      <button
          class="login"
          v-else
          @click="userRegister"
      >Регистрация</button>
    </div>

    <div class="error"
         v-if="error"
    > {{ error }} </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters['isLoggedIn']
    },
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      formLogin: true,
    }
  },
  methods: {
    async login() {
      this.error = ''
      try {
        await this.$store.dispatch('login', { username: this.email, password: this.password })
        this.$store.commit('logged_in')
        await this.$router.push('/')
      } catch (err) {
        this.error = err
        throw err
      }
    },

    async userRegister() {
      this.error = ''
      if (this.password !== this.confirmPassword) {
        this.error = 'Пароли не совпадают!'
        return
      }
      try {
        await this.$store.dispatch('userRegister', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.formLogin = true
      } catch (err) {
        this.error = err
        throw err
      }
    },

    choseFormLogin() {
      this.error = ''
      this.formLogin = true
    },
    choseFormRegister() {
      this.error = ''
      this.formLogin = false
    },
  },
}
</script>

<style scoped>

.chose_auth_or_reg {
  width: 80%;
  height: 5vh;
  /*border: solid 1px black;*/
  margin: 1% auto auto;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
}

.chose_btn {
  width: 25%;
  margin: 2%;
  height: 4vh;
  background-color: chocolate;
}

.header {
  background-color: blue;
  width: 80%;
  height: 10vh;
  margin: 1% auto auto;
  border-radius: 1%;
  border: solid 1px black;
  font-size: 14pt;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
}

.form {
  width: 80%;
  height: 75vh;
  margin: 0 auto auto;
  text-align: center;
  border-radius: 1%;
  border: solid 1px black;
  font-size: 14pt;
}

.data {
  width: 80%;
  height: 5vh;
  margin: 2% auto auto;
  text-align: center;
  border-radius: 1%;
  border: solid 1px black;
  font-size: 14pt;
}

.auth {
  margin-bottom: 1%;
  margin-top: 3%;
  font-size: 14pt;
}

.login {
  width: 50%;
  height: 7vh;
  background-color: green;
  font-size: 14pt;
  border-radius: 5%;
  border: dashed;
}

.error {
  margin-bottom: 3%;
  margin-top: 5%;
  font-size: 14pt;
  color: red;
}


</style>