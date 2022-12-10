<template>
  <div class="lock-ability"></div>
</template>

<script>
export default {
  name: "LockAbility",
}
</script>

<style scoped>
.lock-ability {
  position: absolute;
  right: 5px;
  top: 30%;
  width: 12px;
  height: 20px;
  background-image: url("~@/assets/icons/card/locked.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
