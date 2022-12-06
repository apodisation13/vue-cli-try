<template>
  <div class="login-page">
    <div class="auth" v-if="formLogin">
      <h2>Добрый день!</h2>
      <p>
        Войдите в систему ниже или
        <span @click="choseFormRegister">создайте учетную запись</span>
      </p>
    </div>
    <div class="auth" v-else>
      <h2>Создать аккаунт</h2>
      <p>
        Введите данные своей учетной записи ниже
        <span @click="choseFormLogin">или войдите в систему</span>
      </p>
    </div>
    <form v-on:submit.prevent class="form">
      <label class="auth__input-name" v-if="!formLogin">
        Введите имя пользователя
      </label>
      <div v-if="!formLogin">
        <input class="auth__data" v-model="username" autocomplete="username" />
      </div>
      <label class="auth__input-name">Логин</label>
      <div>
        <input class="auth__data" v-model="email" autocomplete="email" />
      </div>
      <label class="auth__input-name">Пароль</label>
      <div>
        <input
          class="auth__data"
          v-model="password"
          type="password"
          autocomplete="password"
          v-on:keyup.enter="login"
        />
      </div>
      <div class="auth__password-check" v-if="!formLogin">Подтвердите пароль</div>
      <div v-if="!formLogin">
        <input
          class="data"
          v-model="confirmPassword"
          type="password"
          autocomplete="confirmPassword"
          v-on:keyup.enter="userRegister"
        />
      </div>
      <div class="auth__buttons">
        <button class="login" v-if="formLogin" @click="login">Войти</button>
        <button class="login" v-else @click="userRegister">
          Создать аккаунт
        </button>
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
.login-page {
  background: url("../assets/page_images/login-background.png");
  background-size: cover;
  height: 100%;
  overflow: auto;
}

.auth {
  margin-top: 80px;
}

.auth h2 {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  font-family: "Philosopher";
  font-style: normal;
  font-weight: 700;
  font-size: 29px;
  line-height: 100%;
  /* identical to box height, or 29px */
  font-feature-settings: "calt" off;
  background: linear-gradient(153.5deg, #B07B15 16.64%, #FACF5D 47.22%, #B48328 82.67%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth p {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  /* or 19px */
  text-align: center;
  letter-spacing: -0.02em;
  font-feature-settings: "calt" off;
  color: rgba(252, 234, 188, 0.6);
  margin-top: 17px;
}

.auth span {
  text-decoration: underline;
  cursor: pointer;
}

span {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
}

.auth__input-name {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  /* or 19px */
  letter-spacing: -0.02em;
  font-feature-settings: "calt" off;
  /* Цвет текста на кнопках */
  color: #facf5d;
}

.auth__data {
  box-sizing: border-box;
  width: 328px;
  height: 48px;
  background: linear-gradient(
    180deg,
    #1d252d -43.75%,
    rgba(0, 0, 0, 0.13) 52.08%,
    #282d33 145.92%
  );
  border-radius: 2px;
}

.form {
  width: 80%;
  margin: 0 auto auto;
  margin-top: 62px;
}

.login {
  margin-top: 100%;
  width: 100%;
  height: 48px;
  background: linear-gradient(180deg, #1D252D -21.82%, rgba(0, 0, 0, 0.13) 44.55%, #282D33 109.53%);
  /* Цвет текста на кнопках */
  border: 2px solid #FACF5D;
  box-shadow: 5px 9px 20px rgba(0, 0, 0, 0.25), inset -5px -5px 5px rgba(0, 0, 0, 0.25), inset 5px 5px 5px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 2px;
}

.error {
  margin-bottom: 3%;
  margin-top: 5%;
  font-size: 14pt;
  color: red;
}
</style>
