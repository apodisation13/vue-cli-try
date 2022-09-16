<template>
  <enemy-leader-ability v-if="enemy_leader.ability.name === 'damage-once'"
    >1</enemy-leader-ability
  >
  <enemy-leader-ability
    v-else-if="enemy_leader.ability.name === 'damage-per-turn'"
    >&#128337;</enemy-leader-ability
  >
  <enemy-leader-ability
    v-else-if="enemy_leader.ability.name === 'heal-self-per-turn'"
    >+&hearts;</enemy-leader-ability
  >
  <enemy-leader-ability
    v-else-if="enemy_leader.ability.name === 'decrease-all-player-damage-1'"
    >-1&dagger;</enemy-leader-ability
  >
</template>

<script>
import EnemyLeaderAbility from "@/components/UI/EnemyLeaderAbility"
export default {
  name: "ability-circle-enemy-leader",
  components: { EnemyLeaderAbility },
  props: {
    enemy_leader: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
