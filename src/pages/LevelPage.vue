<template>
ВЫБЕРИТЕ УРОВЕНЬ <br><br>

<div class="levels" v-for="level, index in levels" :key="level">
  <button class="level_btn"
  @click="get_level_id(index)"
  >

  <!-- Отображать название уровня  -->
  {{ level[0] }} <br>
  <!-- Отображать количество врагов  -->
  Врагов - {{ level[1].length }}
  
  </button>
</div>

<select-deck />

</template>

<script>

export default {
  data() {
    return {
      
    }
  },
  computed: {
    levels() {
      return this.$store.state.levels
    }
  },
  methods: {
    get_level_id(index) {
      this.$store.commit("set_level", index)
    },

    set_default_deck() {
      this.$store.dispatch(
        "set_deck_in_play", 
        {decks: this.$store.state.decks, i: 0}  // FIXME: вот здесь косяк
      )  
    },
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