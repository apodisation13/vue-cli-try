<template>
  <div class="emblem_page">
    <div class="logo"></div>
    <button class="start" @click="toggleApi" :disabled="authInProcess">
      НАЧАТЬ
      {{ value }}
    </button>
  </div>
</template>

<script>
import {
  ref,
  // defineComponent,
  toRefs,
  reactive,
} from "vue"

export default {
  name: "EmblemPage",
  computed: {
    authInProcess() {
      return this.$store.getters["getAuthState"]
    },
  },
  setup() {
    const root = ref()
    const state = reactive({
      fullscreen: false,
    })
    function toggle() {
      state.fullscreen = !state.fullscreen
    }
    return {
      root,
      ...toRefs(state),
      toggle,
    }
  },
  methods: {
    toggleApi() {
      // Пока только включение
      this.$fullscreen.toggle()
      this.goFullScreen()
      //устанавливаем корректное значение вьюпорта переменную css для работы c var(--vh)
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
  bottom: 48px;
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
