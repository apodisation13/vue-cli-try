<template>
  <div class="type">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "card-type",
}
</script>

<style scoped>
.type {
  width: 10%;
  height: 10%;
  left: 1%;
  top: 1%;
  position: absolute;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16pt;
}
</style>