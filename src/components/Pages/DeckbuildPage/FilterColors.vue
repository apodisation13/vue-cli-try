<template>
  <div class="filter_colors">
    <base-title-text @click="reset_filter_colors">Цвет</base-title-text>

    <div class="colors-block">
      <div class="colors" v-for="color in colors" :key="color">
        <button
          class="color"
          :style="{ backgroundColor: color[1] }"
          @click="filtering(color)"
        >
          {{ color[0][0] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTitleText from "@/components/UI/BaseTitleText"
export default {
  components: { BaseTitleText },
  name: "filter-colors",
  data() {
    return {
      colors: [
        ["Gold", "gold"],
        ["Silver", "silver"],
        ["Bronze", "lightsalmon"],
      ],
    }
  },
  methods: {
    filtering(color) {
      this.$emit("set-filter", "color", color[0])
    },
    reset_filter_colors() {
      this.$emit("reset-filter-colors")
    },
  },
  emits: ["set-filter", "reset-filter-colors"],
}
</script>

<style scoped>
.filter_colors {
  margin-top: 20px;
}
.colors-block {
  margin-top: 7px;
}
.colors {
  display: inline;
}
.color {
  height: 4vh;
  width: 31%;
  margin: 1%;
}
</style>
