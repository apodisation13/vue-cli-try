<template>
  <div class="filter_colors">
    <div class="global_text filter_title" @click="reset_filter_colors">
      Цвет
    </div>
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
  margin-bottom: 12%;
}
.filter_title {
  font-size: 25px;
  margin-bottom: 15px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
