<template>
ВЫБЕРИТЕ УРОВЕНЬ <br><br>

<div class="levels" v-for="level, index in $store.state.levels" :key="level">
  <button class="level_btn"
  @click="get_level_id(index)"
  >

  <!-- Отображать только название уровня  -->
  {{ level[0] }}
  
  </button>
</div>

<select-deck />

</template>

<script>

// import { levels } from '@/logic/place_enemies'

export default {
  data() {
    return {
      // level_list: this.$store.state.levels,
      
    }
  },
  methods: {
    get_level_id(index) {
      alert(index)
      this.$store.commit("set_level", index)
    },

    set_default_deck() {
      this.$store.dispatch(
        "set_deck_in_play", 
        {decks: this.$store.state.decks, i: 0}
      )  
    }
  },

  mounted() {
    this.set_default_deck()
  }

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