<template>
  <div>
    <div
      v-for="el in themes"
      :key="el"
      class="themes"
      @dblclick="setSettingTheme(el)"
    >
      <button class="theme" :class="{ selected_theme: el === selectedTheme }">
        <div class="game__outer-wrapper" :style="styleOuter(el)">
          <div class="game__wrapper" :style="styleWrapper(el)"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { styleOuter, styleWrapper } from "@/logic/border_styles"

export default {
  name: "SettingChooseTheme",
  data() {
    return {
      themes: [1, 2, 3, 4],
      selectedTheme: this.$store.getters["selectedTheme"],
    }
  },
  methods: {
    styleOuter(el) {
      return styleOuter(el)
    },
    styleWrapper(el) {
      return styleWrapper(el)
    },
    setSettingTheme(el) {
      this.selectedTheme = el
      this.$store.commit("set_theme", el)
    },
  },
}
</script>

<style scoped>
.themes {
  display: inline;
  margin: 5px;
}
.theme {
  border: 3px solid;
  border-image-slice: 1;
  height: 71px;
  width: 71px;
  background: #000000;
  padding: 2px;
  background: linear-gradient(
    180deg,
    #465361 0%,
    rgba(37, 44, 50, 0.35) 50.52%,
    #1d252d 99.48%
  );
}
.selected_theme {
  border-image-source: linear-gradient(
    93.48deg,
    #b07b15 -6.47%,
    #facf5d 41.82%,
    #b48328 97.8%
  );
}

.game__outer-wrapper {
  height: 100%;
  width: 100%;
  padding: 3px;
  border-radius: 5px;
}
.game__wrapper {
  box-shadow: inset -4px -4px 4px rgba(0, 0, 0, 0.25),
    inset 4px 4px 10px rgba(186, 218, 255, 0.4);
  padding: 4px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
