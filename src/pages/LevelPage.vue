<template>
  <div class="levels">
    <div v-if="!gameMod">
      <div class="backBtn">Выберите режим игры</div>
      <div
        class="game_modes"
        v-for="mode in gameTypes"
        :key="mode"
        @click="selectGameMode(mode)"
      >
        <div class="mode">{{ mode }}</div>
      </div>
    </div>

    <div v-else>
      <div class="backBtn" @click="cancelGameMod">Назад</div>
      <div>Выбранный режим: {{ gameMod }}</div>
      <div v-if="gameMod === 'seasons'">
        <div v-if="!seasonSelected">
          <div
            class="game_modes"
            v-for="season in seasons"
            :key="season.id"
            @click="setSeason(season)"
          >
            <div class="seasons__element">
              <div>{{ season.name }}</div>
              <div>{{ season.description }}</div>
            </div>
          </div>
          <br />
        </div>
        <LevelTree
          :levels="seasonLevels"
          v-if="seasonLevels && seasonSelected"
        />
      </div>
      <div v-if="gameMod === 'random'">
        <div
          class="level"
          :class="{ level_selected: index === selectedRandomLevel }"
          v-for="(level, index) in random_levels"
          :key="level"
          @dblclick="set_random_level(index)"
        >
          <level-preview-comp :level="level" />
        </div>
      </div>
      <div v-if="gameMod === 'arena'">Пока не реализовано!</div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification"
import LevelPreviewComp from "@/components/Pages/LevelPage/LevelPreviewComp"
import { random_level_generator } from "@/logic/random_level"
import LevelTree from "@/components/Pages/LevelPage/LevelTree"
export default {
  components: {
    LevelTree,
    LevelPreviewComp,
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  async created() {
    this.random_levels = random_level_generator()
  },
  data() {
    return {
      selectedLevel: undefined, // для подсветки выбранного уровня
      selectedRandomLevel: undefined,
      random_levels: [],
      gameTypes: ["seasons", "random", "arena"],
      gameMod: null,
      seasonLevels: null,
      seasonSelected: false,
    }
  },
  computed: {
    seasons() {
      return this.$store.getters["all_seasons"]
    },
  },
  methods: {
    selectGameMode(mode) {
      this.gameMod = mode
    },
    cancelGameMod() {
      if (this.seasonSelected) {
        this.seasonSelected = null
        return
      }
      this.gameMod = null
    },
    setSeason(season) {
      this.seasonLevels = season.levels
      this.$store.commit("set_season", season)
      this.seasonSelected = true
    },
    set_random_level(index) {
      this.toast.success(`Выбран рандомный уровень!`, { timeout: 1000 })
      this.random_levels[index].level.random = true // ставим флаг, что уровень рандомный, чтобы потом не открывать его детей
      this.$store.commit("set_level", this.random_levels[index].level)
      this.$store.commit(
        "set_enemy_leader",
        this.random_levels[index].level.enemy_leader
      )
      this.selectedRandomLevel = index
      this.selectedLevel = undefined
    },
  },
}
</script>

<style scoped>
div {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: 1%;
}

.levels {
  margin: 1%;
  width: 99%;
  height: 78vh;
  /*border: solid 1px orchid;*/
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

.game_modes {
  position: relative;
  width: 99%;
  height: 100px;
  background: var(--five-gold-gradient);
  box-shadow: inset -4px -4px 10px rgba(0, 0, 0, 0.25),
    inset 4px 4px 10px rgba(0, 0, 0, 0.25);
}

.mode {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 100%;
  letter-spacing: -0.02em;
  font-feature-settings: "calt" off;
  color: #5f4209;
}

.backBtn {
  width: 99%;
  height: 3vh;
  background-color: greenyellow;
}

.seasons__element {
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 100%;
  letter-spacing: -0.02em;
  font-feature-settings: "calt" off;
  color: #5f4209;
}
</style>
