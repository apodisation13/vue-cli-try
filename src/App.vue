<template>
  <div class="wrapper__bg">
    <div class="app" v-touch:swipe.right="show">
      <!--картинка страницы по параметрам из роутера-->
      <page-image />
      <!--верхняя часть меню, хэдер-->
      <menu-header />

      <!--боковое меню слева, TODO: убрать это на страницу GAME-->
      <menu-bar v-if="showMenu" />

      <!--собственно рендер самого приложения через роутер, формат {путь(роут): компонент}-->
      <router-view />

      <!--нижняя часть меню, в футере-->
      <menu-footer />
    </div>
  </div>
</template>

<script>
import MenuBar from "@/components/UI/Menu/MenuBar"
import MenuFooter from "@/components/UI/Menu/MenuFooter"
import MenuHeader from "@/components/UI/Menu/MenuHeader"
import PageImage from "@/components/PageImage"
export default {
  components: {
    PageImage,
    MenuHeader,
    MenuFooter,
    MenuBar,
  },
  async created() {
    //устанавливаем корректное значение вьюпорта переменную css для работы c var(--vh)
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    // СРАБАТЫВАЕТ ПО ОТКРЫТИЮ САЙТА: вначале прыгаем на загрузку,
    // Далее проверяем логин из локалсторадж, если успешно, грузим базу данных и рендерим ВСЕ картинки
    // в любом случае идем на главную потом
    await this.$router.push("/loading")
    try {
      await this.$store.dispatch("fetchNews")
      await this.$store.dispatch("check_auth") // пытаемся послать запрос на логин с данными из локалсторадж
      await this.$store.dispatch("get_user_database")
      await this.$store.dispatch("render_all_images") // принудительный рендер всех картинок
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      await this.$router.push("/")
    }
  },
  computed: {
    showMenu() {
      return (
        this.$store.state.show_menu &&
        this.$router.currentRoute.value.meta.sideMenu
      )
    },
  },
  methods: {
    show() {
      this.$store.commit("set_show_menu", true)
    },
    close_menu() {
      this.show_menu = false
    },
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Philosopher&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  font-family: "Roboto", "Inter", "Philosopher", sans-serif;
  /* font-family: Arial, Helvetica, sans-serif; единый на всё */
}

.app {
  padding: 0;
}

/*заблокировать перезагрузку страницы на мобилке по прокрутке вверх*/
html,
body {
  overscroll-behavior-y: contain;
}

.body {
  height: 100%;
}

.app {
  position: relative;
  z-index: -2;
  background: #fff;
  width: 100%;
  height: 100%;
}

.wrapper__bg {
  position: absolute;
  z-index: -3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}

@media (min-width: 900px) {
  .app {
    position: relative;
    max-width: 425px;
    /* max-height: 930px; */
    border-radius: 8px;
    margin: 0 auto;
  }
}
</style>
