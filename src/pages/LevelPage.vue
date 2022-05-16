<template>
  <div class="levels" >
    <div>
      ВЫБЕРИТЕ УРОВЕНЬ (дважды ЛКМ)
    </div>

    <div>
      Базовые уровни игры
    </div>
    <div class="level" :class="{'level_selected': index === selected}"
      v-for="(level, index) in levels" :key="level"
      @dblclick="set_level(index)"
    >
      <level-preview-comp :level="level" />
    </div> <br><br>


    <div>РАНДОМНЫЕ УРОВНИ!</div>
    <div class="level" :class="{'level_selected': index === selected}"
         v-for="(level, index) in random_levels" :key="level"
         @dblclick="set_random_level(index)"
    >
      <level-preview-comp :level="level" />
    </div>
  </div>

  <resource-comp />
  <selected-deck />
  <deck-selection />

</template>

<script>
import { useToast } from "vue-toastification"
import LevelPreviewComp from "@/components/Pages/LevelPage/LevelPreviewComp"
import DeckSelection from "@/components/DeckSelection"
import SelectedDeck from "@/components/Pages/LevelPage/SelectedDeck"
import ResourceComp from "@/components/ResourceComp"
import {random_level_generator} from "@/logic/random_level"
export default {
  components: {ResourceComp, SelectedDeck, DeckSelection, LevelPreviewComp},
  setup() {
    const toast = useToast()
    return { toast }
  },
  async created() {
    this.random_levels = random_level_generator()
  },
  data() {
    return {
      selected: undefined,  // для подсветки выбранного уровня
      random_levels: [],
    }
  },
  computed: {
    levels() {
      return this.$store.getters["all_levels"]
    }
  },
  methods: {
    set_level(index) {
      if (this.levels[index].id) {
        this.toast.success(`Выбран уровень ${index + 1}! `, {timeout: 1000})
        this.$store.commit("set_level", this.levels[index].level)
        this.$store.commit('set_enemy_leader', this.levels[index].level.enemy_leader)
        this.selected = index
      }
      else this.toast.error('Уровень закрыт!')
    },
    set_random_level(index) {
      this.toast.success(`Выбран рандомный уровень!`, {timeout: 1000})
      this.$store.commit("set_level", this.random_levels[index].level)
      this.$store.commit('set_enemy_leader', this.random_levels[index].level.enemy_leader)
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
  overflow: scroll;
}

.level {
  margin: 1%;
  width: 8vh;
  height: 10vh;
  font-size: 6pt;
  border: solid 1px brown;
  display: inline-block;
}

.level_selected {
  width: 8vh;
  height: 10vh;
  font-size: 6pt;
  background-color: green;
}

</style>