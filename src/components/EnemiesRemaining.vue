<template>
  <!-- показать количество врагов, которое осталось на уровне -->
  <button class="remaining-enemies-btn"> 
    Враги {{ enemies.length }}
  </button>
</template>

<script>
export default {
  name: "remaining-enemies",
  props: {
    enemies: {
      required: true,
      type: Array
    }
  },
}
</script>

<style scoped>
.remaining-enemies-btn {
  height: 40%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}
</style>