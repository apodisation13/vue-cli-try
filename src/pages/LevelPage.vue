<template>
  <div class="container">
    <div class="gradient"></div>
    <div class="levels">
      <div v-if="!gameMod">
        <div
          class="game_modes"
          v-for="mode in game_types"
          :key="mode.name"
          @click="selectGameMode(mode)"
        >
          <div class="global_text mode">{{ mode.name_ru }}</div>
        </div>
      </div>

      <div v-else>
        <div class="header">
          <div class="backBtn" @click="cancelGameMod">
            <img
              class="backBtn__img"
              src="@/assets/icons/buttons/back_icon.svg"
            />
          </div>
          <div class="header__chosen">
            Выбранный режим:
            <span class="global_text header__chosen-gameMod">
              {{ gameMod.name_ru }}
            </span>
          </div>
        </div>
        <div v-if="gameMod.name === 'seasons'">
          <div v-if="!seasonSelected">
            <div
              class="seasons"
              v-for="season in seasons"
              :key="season.id"
              @click="setSeason(season)"
            >
              <div class="global_text seasons__element">
                <div class="season__name">{{ season.name }}</div>
                <div class="season__description">{{ season.description }}</div>
              </div>
            </div>
            <div class="scroll-closed"></div>
          </div>
          <LevelTree
            :levels="seasonLevels"
            v-if="seasonLevels && seasonSelected"
          />
        </div>
        <div v-if="gameMod.name === 'random'">
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
        <div v-if="gameMod.name === 'arena'">Пока не реализовано!</div>
      </div>
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
      game_types: [
        {
          name: "seasons",
          name_ru: "Сезоны",
        },
        {
          name: "random",
          name_ru: "Рандом",
        },
        {
          name: "arena",
          name_ru: "Арена",
        },
      ],
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
.container {
  position: relative;
}
.gradient {
  position: absolute;
  width: 100%;
  top: -16px;
  height: 120px;
  background: linear-gradient(
    180deg,
    #301f0c 12.16%,
    rgba(40, 45, 51, 0) 103.19%
  );
  z-index: -1;
}
div {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: 1%;
}
.header {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.header__chosen {
  display: flex;
  flex-direction: column;
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.02em;
  font-feature-settings: "calt" off;
  color: #fceabc;
}
.header__chosen-gameMod {
  text-transform: uppercase;
  font-size: 25px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.backBtn {
  display: block;
  left: 5%;
  align-self: center;
  position: absolute;
}
.backBtn__img {
  width: 25px;
}
.levels {
  width: 100%;
  height: 78vh;
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
  width: 100%;
  height: 100px;
  margin-bottom: 15px;
  background: var(--five-gold-gradient);
  box-shadow: inset -4px -4px 10px rgba(0, 0, 0, 0.25),
    inset 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.game_modes:nth-child(1) {
  margin-top: 30px;
}
.seasons,
.scroll-closed {
  background-image: url(~@/assets/icons/game_modes_scroll.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  height: 110px;
  color: hsl(40, 83%, 20%);
}
.scroll-closed {
  position: relative;
  left: -75%;
}
.seasons__element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: start;
  width: 80%;
  padding: 20px;
}
.season__name {
  font-family: "Philosopher", serif;
  margin-bottom: 5px;
}
.season__description {
  font-family: "Inter", serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 110%;
}
.mode {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 25px;
  color: #5f4209;
}
</style>
