<template>
  <div class="modal_window">
    <div>Щёлкните дважды для выбора карты</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "modal-window",
}
</script>

<style scoped>
.modal_window {
  background: linear-gradient(180deg, #1e2834 0%, #0a0b0c 100%);
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  font-size: 12pt;
  overflow: scroll;
}
</style>
