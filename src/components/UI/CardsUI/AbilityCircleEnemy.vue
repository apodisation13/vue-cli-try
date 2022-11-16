<template>
  <enemy-circle v-if="enemy.move.name === 'down'" move="enemy_move_down" />
  <enemy-circle
    v-else-if="enemy.move.name === 'stand'"
    move="enemy_move_stand"
  />
  <enemy-circle
    v-else-if="enemy.move.name === 'random'"
    move="enemy_move_random"
  />
</template>

<script>
import EnemyCircle from "@/components/UI/CardsUI/EnemyCircle"
export default {
  name: "ability-circle-enemy",
  components: { EnemyCircle },
  props: {
    enemy: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
