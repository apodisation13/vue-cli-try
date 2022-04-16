<template>
  
  <!-- вызов меню -->
  <menu-bar />

  <div v-if="!isLoaded && !$store.state.error">
    ПОДОЖДИТЕ, ВЫПОЛНЯЕТСЯ ЗАГРУЗКА
  </div>

  <div v-if="$store.state.error && !isLoaded">
    НЕТ СВЯЗИ С СЕРВЕРОМ
    <br>
    {{ $store.state.error }}
  </div>

  <div class="app" v-if="isLoaded">
    <router-view></router-view>
  </div>
</template>

<script>

import MenuBar from '@/components/UI/MenuBar'

export default {
  components: { 
    MenuBar, 
  },
  
  mounted() {  // вот так можно вызвать Экшен прям по загрузке сайта
    this.$store.dispatch('get_data')
  },

  computed: {
    isLoaded() {
      return this.$store.state.isLoaded
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
