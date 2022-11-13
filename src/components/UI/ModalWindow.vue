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
  text-align: center;
  position: absolute;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  font-size: 12pt;

  /*background-color: limegreen;*/
  /*width: 100%;*/
  /*height: 90%;*/
  /*border-radius: 12px;*/
  /*text-align: center;*/
  /*position: absolute;*/
  /*z-index: 9999;*/
}
</style>
