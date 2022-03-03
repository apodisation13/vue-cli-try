<template>
  
  <!-- вызов меню -->
<!--  <menu-bar />-->
  
  <div class="app">
    
    <!-- вот здесь тупо отобразится тот компонент, который в роутах указан -->
    <router-view></router-view>
    
  </div>
</template>

<script>

import MenuBar from './components/MenuBar'

export default {
  components: { 
    // MenuBar,
  },
  
  mounted() {  // вот так можно вызвать Экшен прям по загрузке сайта
    // this.$store.dispatch('set_try')
    this.$store.dispatch('get_data')
  },

  // created() { 
  //   this.$store.dispatch('get_data')
  // },

  // beforeRouteEnter (to, from, next) {
  //   this.$store.dispatch('get_data')
  // }
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

body, html {
  padding: 0;
  margin: 0;
  /*overflow: auto;*/
  height: 100vh;
}
</style>
