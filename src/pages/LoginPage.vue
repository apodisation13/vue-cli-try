<template>
  <div class="container">

    <!-- HEADER -->
    <div class="header" v-if="formLogin">
      <div class="header__welcome">Добрый день!</div>
      <div class="header__login">
        Войдите в систему ниже<br />
        или <a @click.prevent="choseFormRegister">создайте учетную запись</a>
      </div>
    </div>
    <div class="header" v-if="!formLogin">
      <div class="header__welcome">Создать аккаунт</div>
      <div class="header__login">
        Введите данные своей учетной записи ниже или
        <a @click.prevent="choseFormLogin">войдите в систему</a>
      </div>
    </div>

    <!-- Форма, включая поле с дополнительными функциями -->
    <form v-on:submit.prevent class="form">
      <div class="form__content">
        <div class="inputs">
          <div class="form__auth">
            <label for="email" class="form__label">Почта</label>
            <input class="form__data" v-model="email" id="email" autocomplete="email" />
          </div>
          <div class="form__auth" v-if="!formLogin">
            <label class="form__label" for="username">Введите имя пользователя</label>
            <input class="form__data" v-model="username" id="username" autocomplete="username" />
          </div>
          <div class="form__auth form__auth_pass">
            <label class="form__label" for="password">Пароль</label>
            <input class="form__data" v-model="password" id="password" type="password" autocomplete="password"
              v-on:keyup.enter="login" />
            <div class="eye" @click="toggle_pass_visibility">
              <div class="eye__apple"></div>
            </div>
          </div>
          <div class="form__auth form__auth_pass" v-if="!formLogin">
            <label class="form__label" for="confirm-password">
              Подтверждение пароля
            </label>
            <input class="form__data" v-model="confirmPassword" id="confirm-password" type="password"
              autocomplete="confirmPassword" v-on:keyup.enter="userRegister" />
            <div class="eye" @click="toggle_pass_visibility">
              <div class="eye__apple"></div>
            </div>
          </div>
        </div>

        <!-- Поле с дополнительными функциями -->
        <div class="form__additional" v-if="formLogin">
          <div class="form__login-with">
            <a class="login-with__btn login-with__google">
              <img src="@/assets/icons/buttons/login_google.svg" alt="" />
            </a>
            <a class="login-with__btn login-with__vk">
              <img src="@/assets/icons/buttons/login_vk.svg" alt="" />
            </a>
          </div>
          <div class="form__forgot">
            <a class="forgot__text">Забыли пароль?</a>
          </div>
        </div>
        <div class="form__additional" v-else>
          <div class="form__agree">
            <div class="agree__user">
              <div class="checkbox" @click="toggleCheckbox">
                <input id="user-checkbox" type="checkbox" class="custom-checkbox" v-model="is_user_agree" />
              </div>
              <label for="user-checkbox"> Я ознакомился с Пользовательским соглашением </label>
            </div>
            <div class="agree__policy">
              <div class="checkbox" @click="toggleCheckbox">
                <input id="policy-checkbox" type="checkbox" class="custom-checkbox" v-model="is_policy_agree" />
              </div>
              <label for="policy-checkbox">
                Я согласен с
                <a class="agree__policy_link">Политикой конфиденциальности</a>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопки входа и регистрации -->
      <div class="form__btn">
        <button class="btn__login" v-if="formLogin" :disabled="!(email && password)" @click="login">
          <span>Войти</span>
        </button>
        <button class="btn__login" v-else @click="userRegister" :disabled="!(is_policy_agree & is_user_agree)">
          <span>Регистрация</span>
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
      is_user_agree: false,
      is_policy_agree: false
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

    toggle_pass_visibility(e) {
      const pass_field = e.target
        .closest(".form__auth_pass")
        .querySelector("input")
      if (pass_field.value === "") return
      if (pass_field.attributes.type.value === "password") {
        pass_field.setAttribute("type", "text")
        return
      }
      pass_field.setAttribute("type", "password")
    },

    // Обрати внимание!!
    // пытался сделать проверку галочек на согласие пользователя сделать без if
    // но с кастомными чекбоксами это оказалось не так-то просто, может есть идея
    // как сделать привязку к чекбоксам проще?
    toggleCheckbox(e) {
      if (!e.target.querySelector("input")) return
      const checkbox = e.target.querySelector("input")
      checkbox.checked = !checkbox.checked
      if (checkbox.id === "policy-checkbox") this.is_policy_agree = checkbox.checked
      if (checkbox.id === "user-checkbox") this.is_user_agree = checkbox.checked
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background: url("~@/assets/page_images/login-background.png");
  background-size: cover;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25vh;
  margin: 1% auto 0 auto;
  border-radius: 1%;
  font-size: 14pt;
  text-align: center;
  gap: 25px;
}

.header__welcome {
  font-family: "Philosopher";
  font-size: 29px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;

  background: linear-gradient(153.5deg,
      hsl(39, 79%, 39%) 16.64%,
      hsl(44, 94%, 67%) 47.22%,
      hsl(39, 64%, 43%) 82.67%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  text-fill-color: transparent;
}

.header__login {
  color: hsla(43, 91%, 86%, 0.6);
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
}

.header__login a {
  cursor: pointer;
  text-decoration: underline;
}

span {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto auto;
  border-radius: 1%;
  font-size: 14pt;
}

.form__content {
  flex: 1 0 auto;
}
.form__auth {
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 5px;
}

.form__auth_pass {
  position: relative;
}

.eye {
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid hsla(43, 91%, 86%, 1);
  border-radius: 50% 0 50% 0;
  rotate: 45deg;
  display: flex;
  justify-content: center;
  align-items: center;

  right: 20px;
  bottom: 15px;
}

.eye__apple {
  width: 8px;
  height: 8px;
  border: 2px solid hsla(43, 91%, 86%, 1);
  border-radius: 50%;
}

.form__data {
  width: 100%;
  padding: 12px;
  margin: 2% auto auto;
  text-align: center;
  border-radius: 1%;
  border-image: linear-gradient(180deg,
      hsl(36, 15%, 25%) -43.75%,
      hsl(36, 38%, 63%) 52.08%,
      hsl(35, 15%, 25%) 145.92%) 1;
  font-size: 14pt;
  color: hsl(43, 91%, 86%);

  background: linear-gradient(180deg,
      #1d252d -43.75%,
      rgba(0, 0, 0, 0.13) 52.08%,
      #282d33 145.92%);
}

.form__data:focus {
  outline: none;
}

.form__label {
  font-size: 14pt;
  color: hsl(44, 94%, 67%);
}

.form__additional {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 45px auto;
  gap: 25px;
}

.form__login-with {
  display: flex;
  gap: 17px;
}

.login-with__btn {
  cursor: pointer;
}

.form__forgot,
.form__agree {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.02em;
  color: hsl(43, 91%, 86%);
}

.forgot__text,
.form__agree input,
.agree__policy_link {
  cursor: pointer;
}

.agree__user,
.agree__policy {
  display: flex;
  gap: 10px;
}

.forgot__text,
.agree__policy_link {
  text-decoration: underline;
}

.form__agree {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.checkbox {
  width: 30px;
  height: 30px;
  background-image: url("~@/assets/icons/buttons/checkbox.svg");
  background-repeat: no-repeat;
  background-position: center center;
}

.checkbox:has(.custom-checkbox:checked) {
  background-image: url("~@/assets/icons/buttons/checkbox_checked.svg")
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.form__btn {
  margin-bottom: 60px;
}
.btn__login {
  cursor: pointer;
  width: 100%;
  padding: 12px;
  background: linear-gradient(180deg,
      #1d252d -21.82%,
      rgba(0, 0, 0, 0.13) 44.55%,
      #282d33 109.53%);
  font-size: 14pt;
  border-radius: 1%;
  border: 2px solid #facf5d;
}

.btn__login:disabled {
  cursor: initial;
  opacity: 0.2;
}

.btn__login span {
  background: linear-gradient(183.6deg,
      #edb13e 2.96%,
      #f4d977 65.79%,
      #eeb850 129.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.error {
  margin-bottom: 3%;
  margin-top: 5%;
  font-size: 14pt;
  color: red;
}
</style>
