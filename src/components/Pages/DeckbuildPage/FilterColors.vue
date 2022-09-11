<template>
  <div class="filter_colors">
    <div @click="reset_filter_colors">Цвет</div>
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
</template>

<script>
export default {
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
      this.$emit("filter-colors", [color[0]])
    },
    reset_filter_colors() {
      this.$emit("reset-filter-colors")
    },
  },
  emits: ["filter-colors", "reset-filter-colors"],
}
</script>

<style scoped>
.filter_colors {
  margin-bottom: 12%;
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
