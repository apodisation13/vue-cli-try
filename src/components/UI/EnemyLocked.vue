<template>
  <div class="enemy_locked"></div>
</template>

<script>
export default {
  name: "EnemyLocked",
}
</script>

<style scoped>
.enemy_locked {
  position: absolute;
  right: 30%;
  top: 30%;
  width: 40px;
  height: 40px;
  background-image: url("~@/assets/icons/card/locked.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
