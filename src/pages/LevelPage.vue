<template>
<div>
ВЫБЕРИТЕ УРОВЕНЬ <br><br>

<div class="levels" v-for="level, index in level_list" :key="level">
  <button 
  class="level_btn"
  @click="get_level_id(index)"
  >

  <!-- Отображать только название уровня  -->
  {{ level[0] }}
  
  </button>
</div>


</div>
</template>

<script>

import { levels } from '@/logic/place_enemies'

export default {
  data() {
    return {
      level_list: levels,
      
    }
  },
  methods: {
    get_level_id(index) {
      alert(index)
      this.$store.commit("set_level", index)
    }
  },

}
</script>

<style scoped>

.levels {
    display: inline;
    margin: 3px;
}

.level_btn {
  width: 150px;
  height: 150px;
}

</style>