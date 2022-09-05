<template>
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
      await this.$store.dispatch('fetchNews')
      console.log(this.$store.state.news)
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

.app {
  padding: 0;
}

/*заблокировать перезагрузку страницы на мобилке по прокрутке вверх*/
html, body {
  overscroll-behavior-y: contain;
}
</style>
