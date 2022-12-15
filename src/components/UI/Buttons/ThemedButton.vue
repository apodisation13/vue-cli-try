<template>
  <div class="game__outer-wrapper" :style="styleOuter">
    <div class="game__wrapper" :style="styleWrapper">
      <div class="global_text footer__text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import { styleOuter, styleWrapper } from "@/logic/border_styles"

export default {
  name: "ThemedButton",
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  computed: {
    styleOuter() {
      return styleOuter(this.$store.getters["selectedTheme"])
    },
    styleWrapper() {
      return styleWrapper(this.$store.getters["selectedTheme"])
    },
  },
}
</script>

<style scoped>
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

.footer__text {
  font-size: 27px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
