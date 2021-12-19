<template>
  
  <!-- вызов меню -->
  <menu-bar />
  
  <div class="app">
    
    <!-- вот здесь тупо отобразится тот компонент, который в роутах указан -->
    <router-view></router-view>
    
  </div>
</template>

<script>

import MenuBar from './components/MenuBar'

export default {
components: { 
  MenuBar, 
  },
}

</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 0;
}
</style>
