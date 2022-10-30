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
  background-color: springgreen;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  font-size: 12pt;
}
</style>
