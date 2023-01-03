<template>
  <div class="emblem_page">
    <div class="logo"></div>
    <button class="start" @click="toggleApi" :disabled="authInProcess">
      НАЧАТЬ
    </button>
  </div>
</template>

<script>
export default {
  name: "EmblemPage",
  data() {
    return {
      // это поле присутствует по рекоммендации доки, после тестирования можно удалить
      fullscreen: false,
    }
  },
  computed: {
    authInProcess() {
      return this.$store.getters["getAuthState"]
    },
  },
  methods: {
    // эта функциональность присутствует по рекоммендации доки, после тестирования можно удалить
    toggle() {
      this.fullscreen = true
    },

    toggleApi() {
      // окно перехода в полноэкранный режим, запрашивается 1 раз при первичной загрузке приложения,
      // дальнейшая логика взаимодействия с полноэкранным режимом реализована в AppWrapperFullscreen
      this.$fullscreen.toggle()
      // выставляем триггер в строр для разрешения открытия модального окна с запросом перехода в полноэкранный режим
      this.$store.commit("gameStarting")
      this.goFullScreen()
    },

    async goFullScreen() {
      // если в локалсторадже нет данных входа, или вход не прошел, по кнопке начать пойдем на главную страницу
      if (!this.$store.getters["isLoggedIn"]) {
        this.$router.push("/main")
        return
      }
      // если же логин прошел, то по кнопке начать идем на загрузку и грузим всю базу данных
      try {
        await this.$router.push("/loading")
        await this.$store.dispatch("get_user_database")
        await this.$store.dispatch("render_all_images") // принудительный рендер всех картинок
      } catch (err) {
        console.log(err)
        throw err
      } finally {
        await this.$router.push("/main")
      }
    },
  },
}
</script>

<style scoped>
.emblem_page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: black;
  width: 100%;
  height: 100vh;
}
.logo {
  position: absolute;
  width: 204px;
  height: 204px;
  top: 212px;
  background: url("~@/assets/icons/logo.png");
}

.start {
  position: absolute;
  bottom: 100px;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 48px;
  border-radius: 2px;
  border: 2px solid #facf5d;
  color: #facf5d;
  background: var(--secondary-dark-gradient);
}
</style>
