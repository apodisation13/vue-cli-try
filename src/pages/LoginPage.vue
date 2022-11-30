<template>
  <div class="container">
    <div class="header" @click="choseFormRegister" v-if="formLogin">
      <div class="auth">
        <span>ВХОД</span>
        <span :style="{ fontSize: '10pt' }"
          >нажмите на это поле чтобы переключиться на регистрацию</span
        >
      </div>
    </div>
    <div class="header" @click="choseFormLogin" v-else>
      <div class="auth">
        <span>РЕГИСТРАЦИЯ</span>
        <span :style="{ fontSize: '10pt' }"
          >нажмите на это поле чтобы переключиться на вход</span
        >
      </div>
    </div>
    <form v-on:submit.prevent class="form">
      <div class="auth" v-if="!formLogin">Введите имя пользователя</div>
      <div v-if="!formLogin">
        <input class="data" v-model="username" autocomplete="username" />
      </div>
      <div class="auth">Введите адрес электронной почты</div>
      <div>
        <input class="data" v-model="email" autocomplete="email" />
      </div>
      <div class="auth">Введите пароль</div>
      <div>
        <input
          class="data"
          v-model="password"
          type="password"
          autocomplete="password"
          v-on:keyup.enter="login"
        />
      </div>
      <div class="auth" v-if="!formLogin">Подтвердите пароль</div>
      <div v-if="!formLogin">
        <input
          class="data"
          v-model="confirmPassword"
          type="password"
          autocomplete="confirmPassword"
          v-on:keyup.enter="userRegister"
        />
      </div>
      <div class="auth">
        <button class="login" v-if="formLogin" @click="login">ВХОД</button>
        <button class="login" v-else @click="userRegister">Регистрация</button>
      </div>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      formLogin: true,
    }
  },
  methods: {
    async login() {
      this.error = this.validate_form(false)
      if (this.error) return

      await this.$router.push("/loading")
      try {
        await this.$store.dispatch("login", {
          username: this.email,
          password: this.password,
        })
        await this.$store.dispatch("get_user_database")
        await this.$store.dispatch("render_all_images")
      } catch (err) {
        this.error = err
        throw err
      } finally {
        await this.$router.push("/")
      }
    },

    async userRegister() {
      this.error = this.validate_form(true)
      if (this.error) return

      try {
        await this.$store.dispatch("userRegister", {
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
      this.error = ""
      this.formLogin = true
    },
    choseFormRegister() {
      this.error = ""
      this.formLogin = false
      this.email = ""
      this.password = ""
    },

    validate_form(register) {
      if (register && !this.username) return "Поле имя не может быть пустым"

      if (!this.email) return "Поле почта не может быть пустым"
      if (!this.email.includes("@")) return "Почта некорректна"

      if (this.password.length < 8)
        return "Пароль должен быть не менее 8 символов!"
      if (register && this.password !== this.confirmPassword)
        return "Пароли не совпадают!"

      return ""
    },
  },
}
</script>

<style scoped>
.container {
  /* background: url("../assets/page_images/deckbuild_default1.jpg"); */
}
.header {
  background-color: cornflowerblue;
  width: 80%;
  height: 10vh;
  margin: 1% auto auto;
  border-radius: 1%;
  border: solid 1px black;
  font-size: 14pt;
}

span {
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
  background-color: limegreen;
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
