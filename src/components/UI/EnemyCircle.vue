<template>
  <div class="circle">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "enemy-circle",
}
</script>

<style scoped>
.circle {
  position: absolute;
  width: 24%;
  height: 3vh;
  background: orangered;
  border-radius: 50%;
  top: 3%;
  left: 3%;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10pt;
  color: white;
}
</style>
