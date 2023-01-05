<template>
  <div class="filter_colors">
    <base-title-text @click="reset_filter_colors">Цвет</base-title-text>

    <div class="colors-block">
      <div
        class="color_button"
        v-for="color in colors"
        :key="color"
        :class="color[0].toLocaleLowerCase()"
        @click="filtering(color)"
      >
        {{ color[0] }}
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
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.color_button {
  width: 100%;
  border-radius: 5px;
  font-family: "Philosopher";
  font-weight: 700;
  font-size: 16px;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}
.color_button:first-child {
  margin-left: 0;
}
.color_button:last-child {
  margin-right: 0;
}

.gold {
  background: linear-gradient(
    99.66deg,
    #b07b15 0%,
    #facf5d 49.65%,
    #b48328 98.61%
  );
  box-shadow: 4.8628px 8.75304px 19.4512px rgba(0, 0, 0, 0.25),
    inset -4.8628px -4.8628px 4.8628px rgba(0, 0, 0, 0.25),
    inset 4.8628px 4.8628px 4.8628px rgba(0, 0, 0, 0.25);
}

.silver {
  background: linear-gradient(
    100.03deg,
    #1b2024 5.24%,
    #585f67 48.35%,
    #202428 97.53%
  );
  box-shadow: 4.8628px 8.75304px 19.4512px rgba(0, 0, 0, 0.25),
    inset -4.8628px -4.8628px 4.8628px rgba(0, 0, 0, 0.25),
    inset 4.8628px 4.8628px 4.8628px rgba(0, 0, 0, 0.25);
}

.bronze {
  background: linear-gradient(
    100.29deg,
    #4a4237 0%,
    #c5a87e 47.36%,
    #4a4237 93.72%
  );
  box-shadow: 4.8628px 8.75304px 19.4512px rgba(0, 0, 0, 0.25),
    inset -4.8628px -4.8628px 4.8628px rgba(0, 0, 0, 0.25),
    inset 4.8628px 4.8628px 4.8628px rgba(0, 0, 0, 0.25);
}
</style>
