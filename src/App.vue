<template>

  <div v-if="loading || (!imagesRendered && loggedIn)">
    <loading-comp />
  </div>

  <div
      v-if="(!loading && imagesRendered) || (!loading && !loggedIn)"
      class="app"
      v-touch:swipe.right="show"
  >
    <page-image />
    <menu-header />
    <menu-bar v-if="showMenu" />
    <router-view ></router-view>
    <menu-footer />
  </div>
</template>

<script>

import MenuBar from '@/components/UI/Menu/MenuBar'
import MenuFooter from "@/components/UI/Menu/MenuFooter";
import MenuHeader from "@/components/UI/Menu/MenuHeader";
import LoadingComp from "@/components/LoadingComp";
import PageImage from "@/components/PageImage";

export default {
  components: {
    PageImage,
    LoadingComp,
    MenuHeader,
    MenuFooter,
    MenuBar
  },
  
  async created() {
    // проверяем логин, если успешно, грузим базу данных и рендерим ВСЕ картинки
    this.$store.commit('set_loading', true)
    try {
      await this.$store.dispatch('check_auth')
      await this.$store.dispatch('get_user_database')
      await this.$store.dispatch('render_all_images')
      this.$store.commit('set_loading', false)
    } catch (err) {
      console.log(err)
      this.$store.commit('set_loading', false)
      throw err
    }
  },
  computed: {
    loading() {
      return this.$store.getters['loading']
    },
    imagesRendered() {
      return this.$store.getters['images_rendered']
    },
    loggedIn() {
     return this.$store.getters['isLoggedIn']
    },
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

/* body {
  background-image: url('~@/assets/grass.jpg');
} */

/*заблокировать перезагрузку страницы на мобилке по прокрутке вверх*/
html, body {
  overscroll-behavior-y: contain;
}
</style>
