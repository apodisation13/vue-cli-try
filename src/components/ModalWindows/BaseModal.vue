<template>
  <div class="wrapper_modal" @click.stop="hideModal">
    <div @click.stop class="modal" :style="styleWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { styleWrapper } from "@/logic/border_styles"

export default {
  methods: {
    hideModal() {
      this.$emit("close-modal")
    },
  },
  computed: {
    styleWrapper() {
      return styleWrapper(this.$store.getters["selectedTheme"])
    },
  },
  emits: ["close-modal"],
}
</script>

<style scoped>
.wrapper_modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  max-width: 335px;
  width: 100%;
  /*background: linear-gradient(#0f2845, #000000);*/
  border-radius: 18px;
  padding: 45px 22px;
  display: flex;
  flex-direction: column;
}
</style>
