<template>
  <div
    class="ability-circle-enemy"
    v-if="!!enemy.move.name"
    :style="{
      'background-image':
        'url(' +
        require(`@/assets/icons/enemy/enemy_move_${enemy.move.name}.svg`) +
        ')',
    }"
  ></div>
</template>

<script>
export default {
  props: {
    enemy: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.ability-circle-enemy {
  position: absolute;
  width: 25px;
  height: 25px;
  top: -3px;
  left: -3px;
  background-repeat: no-repeat;
}
</style>
