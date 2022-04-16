<template>
  <div class="hp">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "card-hp",
}
</script>

<style scoped>
span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10pt;
}

.hp {
  width: 30%;
  height: 20%;
  background-color: green;
  position: absolute;
  bottom: 2%;
  left: 2%;
  border-radius: 20%;
}
</style>