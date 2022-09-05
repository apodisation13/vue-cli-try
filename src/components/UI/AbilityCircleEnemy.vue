<template>
  <enemy-circle v-if="enemy.move.name === 'down'">&#8595;</enemy-circle>
  <enemy-circle v-else-if="enemy.move.name === 'stand'">&#9737;</enemy-circle>
  <enemy-circle v-else-if="enemy.move.name === 'random'">&#9736;</enemy-circle>
</template>

<script>
import EnemyCircle from "@/components/UI/EnemyCircle"
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
