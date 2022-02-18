<template>
ВЫБЕРИТЕ УРОВЕНЬ <br><br>

<div class="levels" v-for="(level, index) in levels" :key="index">
  <button class="level_btn" :class="{'level_btn_selected': index === selected}"
  @click="set_level(index)"
  >

  {{ level.name }} <br>
  {{ level.difficulty }} <br>
  Врагов - {{ level.enemies.length }}
  
  </button>
</div>

<select-deck />

</template>

<script>
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      selected: undefined,
    }
  },
  computed: {
    levels() {
      return this.$store.state.levels
    }
  },
  methods: {
    set_level(index) {
      this.toast.success(`Выбран уровень ${index + 1}! `, {timeout: 1000})
      this.$store.commit("set_level", this.levels[index])
      this.selected = index
    },

    set_default_deck() {
      this.$store.dispatch(
        "set_deck_in_play", 
        {decks: this.$store.state.decks, i: 0}  // FIXME: вот здесь косяк
      )  
    },
  },
  mounted() {
    // this.set_default_deck()
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

.level_btn_selected {
  width: 150px;
  height: 150px;
  background-color: green;
}

</style>