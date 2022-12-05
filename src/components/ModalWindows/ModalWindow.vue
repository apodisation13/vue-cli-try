<template>
  <div class="modal_window" :style="styleWrapper">
    <div>Щёлкните дважды для выбора карты</div>
    <slot></slot>
  </div>
</template>

<script>
import { styleWrapper } from "@/logic/border_styles"

export default {
  name: "modal-window",
  computed: {
    styleWrapper() {
      return styleWrapper(this.$store.getters["selectedTheme"])
    },
  },
}
</script>

<style scoped>
.modal_window {
  /*background-color: springgreen;*/
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  font-size: 12pt;
}
</style>
