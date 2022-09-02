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
import MenuBar from '@/components/UI/Menu/MenuBar'
import MenuFooter from "@/components/UI/Menu/MenuFooter"
import MenuHeader from "@/components/UI/Menu/MenuHeader"
import PageImage from "@/components/PageImage"
export default {
  components: {
    PageImage,
    MenuHeader,
    MenuFooter,
    MenuBar
  },
  async created() {
    // СРАБАТЫВАЕТ ПО ОТКРЫТИЮ САЙТА: вначале прыгаем на загрузку,
    // Далее проверяем логин из локалсторадж, если успешно, грузим базу данных и рендерим ВСЕ картинки
    // в любом случае идем на главную потом
    await this.$router.push('/loading')
    try {
      await this.$store.dispatch('check_auth') // пытаемся послать запрос на логин с данными из локалсторадж
      await this.$store.dispatch('get_user_database')
      await this.$store.dispatch('render_all_images') // принудительный рендер всех картинок
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      await this.$router.push('/')
    }
  },
  computed: {
    showMenu() {
      return this.$store.state.show_menu
    },
  },
  methods: {
    show() {
      this.$store.commit('set_show_menu', true)
    },
    close_menu() {
      this.show_menu = false
    },
  },
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-family: Arial, Helvetica, sans-serif; единый на всё */
}

/*заблокировать перезагрузку страницы на мобилке по прокрутке вверх*/
html, body {
  overscroll-behavior-y: contain;
}

/* body {
  height: 100vh;
} */

.app {
  position: relative;
  width: 100%;
  height: 100vh;
}

@media (min-width: 426px) {
  .app {
    max-width: 425px;
    background: #fff;
    border-radius: 8px;
    margin: 0 auto;
  }

  .wrapper__bg {
    position: absolute;
    top: 0.5px;
    left: 0;
    right: 0;
    bottom: 0.5px;
    background-color: #000;
  }
}
</style>
