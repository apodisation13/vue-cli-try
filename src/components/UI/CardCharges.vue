<template>
  <div class="charges">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "card-charges",
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

.charges {
  width: 20%;
  height: 20%;
  background-color: hotpink;
  position: absolute;
  bottom: 2%;
  right: 2%;
  border-radius: 20%;
}
</style>
