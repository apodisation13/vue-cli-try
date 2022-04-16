<template>
  <div class="circle">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "card-circle-heal",
}
</script>

<style scoped>
.circle {
  position: absolute;
  width: 34%;
  height: 4vh;
  border-radius: 50%;
  top: 30%;
  right: 3%;
  background: green;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8pt;
}
</style>