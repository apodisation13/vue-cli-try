<template>
  <div class="ability">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "enemy-leader-ability",
}
</script>

<style scoped>
span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8pt;
}

.ability {
  position: absolute;
  width: 24%;
  height: 3vh;
  background: orangered;
  border-radius: 50%;
  top: 3%;
  left: 3%;
}
</style>