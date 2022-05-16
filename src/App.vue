<template>

<!--  <div v-if="!isLoaded && !$store.state.error">-->
<!--    ПОДОЖДИТЕ, ВЫПОЛНЯЕТСЯ ЗАГРУЗКА-->
<!--  </div>-->

<!--  <div v-if="$store.state.error && !isLoaded">-->
<!--    НЕТ СВЯЗИ С СЕРВЕРОМ-->
<!--    <br>-->
<!--    {{ $store.state.error }}-->
<!--  </div>-->

  <div class="app" v-touch:swipe.right="show" v-touch:swipe.left="l">

    <!-- вызов меню -->
    <menu-bar v-if="showMenu" />

    <router-view></router-view>
  </div>
</template>

<script>

import MenuBar from '@/components/UI/MenuBar'

export default {
  components: { MenuBar },
  
  async created() {  // вот так можно вызвать Экшен прям по загрузке сайта
    try {
      await this.$store.dispatch('check_auth')
      await this.$store.dispatch('get_user_database')
    } catch (err) {
      console.log(err)
      throw err
    }
    // alert(this.$store.state.login.tt)  // доступ к этим параметрам через название модуля стора
  },

  computed: {
    isLoaded() {
      return this.$store.state.isLoaded
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
    l() {

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
