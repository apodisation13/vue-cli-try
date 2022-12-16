<template>
  <div class="container">
    <!-- HEADER -->
    <div class="header" v-if="error">
      <div class="global_text header__welcome">Введены некорректные данные</div>
      <div class="header__login">
        {{ error }}
      </div>
    </div>
    <div class="header" v-else-if="formLogin">
      <div class="global_text header__welcome">Добрый день!</div>
      <div class="header__login">
        Войдите в систему ниже<br />
        или <a @click.prevent="choseFormRegister">создайте учетную запись</a>
      </div>
    </div>
    <div class="header" v-else-if="!formLogin">
      <div class="global_text header__welcome">Создать аккаунт</div>
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
            <input
              :class="email_valid ? '' : 'form__data_error'"
              class="form__data"
              v-model="email"
              id="email"
              autocomplete="off"
              @focus="input_enabled = true"
              @blur="input_enabled = false"
            />
          </div>
          <div class="form__auth" v-if="!formLogin">
            <label class="form__label" for="username"
              >Введите имя пользователя</label
            >
            <input
              class="form__data"
              v-model="username"
              id="username"
              autocomplete="off"
              @focus="input_enabled = true"
              @blur="input_enabled = false"
            />
          </div>
          <div class="form__auth form__auth_pass">
            <label class="form__label" for="password">Пароль</label>
            <input
              :class="password_valid ? '' : 'form__data_error'"
              class="form__data"
              v-model="password"
              id="password"
              type="password"
              autocomplete="off"
              v-on:keyup.enter="login"
              @focus="input_enabled = true"
              @blur="input_enabled = false"
            />
            <div class="eye" @click="toggle_pass_visibility">
              <div class="eye__apple"></div>
            </div>
          </div>
          <div class="form__auth form__auth_pass" v-if="!formLogin">
            <label class="form__label" for="confirm-password">
              Подтверждение пароля
            </label>
            <input
              :class="confirm_password_valid ? '' : 'form__data_error'"
              class="form__data"
              v-model="confirm_password"
              id="confirm-password"
              type="password"
              autocomplete="off"
              v-on:keyup.enter="userRegister"
              @focus="input_enabled = true"
              @blur="input_enabled = false"
            />
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
        <div class="form__additional" v-else-if="!formLogin && !input_enabled">
          <div class="form__agree">
            <div class="agree__user">
              <div
                class="checkbox"
                @click="is_user_agree = !is_user_agree"
                :style="bgImage(is_user_agree)"
              ></div>
              <p>
                Я ознакомился с
                <a class="agree__policy_link" @click="toggle_agreement_modal"
                  >Пользовательским соглашением</a
                >
              </p>
            </div>
            <div class="agree__policy">
              <div
                class="checkbox"
                :style="bgImage(is_policy_agree)"
                @click="is_policy_agree = !is_policy_agree"
              ></div>
              <p>
                Я согласен с
                <a class="agree__policy_link" @click="toggle_policy_modal"
                  >Политикой конфиденциальности</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопки входа и регистрации -->
      <div class="form__btn" v-if="!input_enabled">
        <button
          class="btn__login"
          v-if="formLogin"
          @click="login"
          :disabled="!(email && password)"
        >
          <span>Войти</span>
        </button>
        <button
          class="btn__login"
          v-else
          @click="userRegister"
          :disabled="userRegisterDisabled"
        >
          <span>Регистрация</span>
        </button>
      </div>
    </form>
    <policy-modal
      v-if="show_policy_modal"
      class="policy-modal"
      @close-modal="toggle_policy_modal"
    />
    <agreement-modal
      v-if="show_agreement_modal"
      class="policy-modal"
      @close-modal="toggle_agreement_modal"
    />
  </div>
</template>

<script>
import AgreementModal from "@/components/ModalWindows/AgreementModal"
import PolicyModal from "@/components/ModalWindows/PolicyModal"
export default {
  components: { AgreementModal, PolicyModal },
  data() {
    return {
      username: "",
      username_valid: true,
      email: "",
      email_valid: true,
      password: "",
      password_valid: true,
      confirm_password: "",
      confirm_password_valid: true,
      error: "",
      formLogin: true,
      show_agreement_modal: false,
      show_policy_modal: false,
      is_user_agree: false,
      is_policy_agree: false,
      input_enabled: false,
    }
  },
  computed: {
    userRegisterDisabled() {
      return (
        !this.is_user_agree ||
        !this.is_policy_agree ||
        !this.username ||
        !this.email ||
        !this.password ||
        !this.confirm_password
      )
    },
  },
  methods: {
    async login() {
      this.reset_highlight()
      this.error = this.validate_form(false)
      if (this.error) return

      try {
        await this.$store.dispatch("login", {
          username: this.email,
          password: this.password,
        })
        await this.$router.push("/loading")
        await this.$store.dispatch("get_user_database")
        await this.$store.dispatch("render_all_images")
        await this.$router.push("/")
      } catch (err) {
        this.error = err.message
        document.getElementById("email").classList.toggle("form__data_error")
        document.getElementById("password").classList.toggle("form__data_error")
      }
    },

    async userRegister() {
      this.reset_highlight()
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

    toggle_policy_modal() {
      this.show_policy_modal = !this.show_policy_modal
    },

    toggle_agreement_modal() {
      this.show_agreement_modal = !this.show_agreement_modal
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

    bgImage(state) {
      if (!state) {
        return {
          backgroundImage: `url(${require("@/assets/icons/buttons/checkbox.svg")})`,
        }
      } else
        return {
          backgroundImage: `url(${require("@/assets/icons/buttons/checkbox_checked.svg")})`,
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
    // :disabled="!(email && password)"
    reset_highlight() {
      this.username_valid = true
      this.email_valid = true
      this.password_valid = true
      this.confirm_password_valid = true
    },

    validate_form(register) {
      if (register && !this.username) {
        this.username_valid = false
        return "Поле имя не может быть пустым"
      }

      if (!this.email) {
        this.email_valid = false
        return "Поле почта не может быть пустым"
      }
      if (!this.email.includes("@")) {
        this.email_valid = false
        return "Почта некорректна"
      }
      if (this.password.length < 8) {
        this.password_valid = false
        return "Пароль должен быть не менее 8 символов!"
      }
      if (register && this.password !== this.confirm_password) {
        this.password_valid = false
        this.confirm_password_valid = false
        return "Пароли не совпадают!"
      }
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
  height: 15vh;
  margin: 1% auto 0 auto;
  border-radius: 1%;
  font-size: 14pt;
  text-align: center;
  gap: 25px;
}

.header__welcome {
  font-size: 29px;
  background: var(--six-gold-gradient);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.header__login {
  color: hsla(43, 91%, 86%, 0.6);
  font-family: "Inter", serif;
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
  justify-content: flex-start;
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
  border-image: var(--dark-gold-gradient-border);
  font-size: 14pt;
  color: hsl(43, 91%, 86%);
  background: var(--dark-gradient);
}

.form__data_error {
  background: var(--red-gradient);
  border-image: var(--orange-gradient-border);
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
  font-family: "Inter", serif;
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
  background-repeat: no-repeat;
  background-position: center center;
}

.form__btn {
  margin-bottom: 60px;
}

.btn__login {
  cursor: pointer;
  width: 100%;
  padding: 12px;
  background: var(--secondary-dark-gradient);
  font-size: 14pt;
  border-radius: 1%;
  border: 2px solid #facf5d;
}

.btn__login:disabled {
  cursor: initial;
  opacity: 0.2;
}

.btn__login span {
  background: var(--primary-gold-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
