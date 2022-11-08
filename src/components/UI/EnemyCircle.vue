<template>
  <div
    class="circle"
    :style="{
      'background-image':
        'url(' + require(`@/assets/icons/card/${move}.svg`) + ')',
    }"
  ></div>
</template>

<script>
export default {
  name: "enemy-circle",
  props: {
    move: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.circle {
  position: absolute;
  width: 24%;
  height: 3vh;
  /*background-image: url("~@/assets/icons/card/$move}");*/
  top: 3%;
  left: 3%;
  background-repeat: no-repeat;
}
</style>
