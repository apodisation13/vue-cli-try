<template>
  <div class="levels" >
    ВЫБЕРИТЕ УРОВЕНЬ (дважды ЛКМ) <br>

    <div class="level" :class="{'level_selected': index === selected}"
      v-for="(level, index) in levels" :key="level"
      @dblclick="set_level(index)"
    >

      <level-preview-comp :level="level" />

    </div>
  </div>

  <selected-deck />
  <deck-selection />

</template>

<script>
import { useToast } from "vue-toastification"
import LevelPreviewComp from "@/components/Pages/LevelPage/LevelPreviewComp"
import DeckSelection from "@/components/DeckSelection"
import SelectedDeck from "@/components/Pages/LevelPage/SelectedDeck"
export default {
  components: {SelectedDeck, DeckSelection, LevelPreviewComp},
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      selected: undefined,  // для подсветки выбранного уровня
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
      this.$store.commit('set_enemy_leader', this.levels[index].enemy_leader)
      this.selected = index
    },
  },
}
</script>

<style scoped>

.levels {
  margin: 1%;
  width: 95%;
  height: 50vh;
  border: solid 1px orchid;
}

.level {
  margin: 1%;
  width: 8vh;
  height: 5vh;
  font-size: 6pt;
  border: solid 1px brown;
  display: inline-block;
}

.level_selected {
  width: 8vh;
  height: 5vh;
  font-size: 6pt;
  background-color: green;
}

</style>