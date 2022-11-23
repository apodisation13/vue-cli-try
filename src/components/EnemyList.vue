<template>
  <div class="enemies">
    <div class="enemy" v-for="enemy in enemies" :key="enemy">
      <enemy-comp :enemy="enemy" />
    </div>
  </div>
</template>

<script>
import EnemyComp from "@/components/EnemyComp"
export default {
  name: "EnemyList",
  components: { EnemyComp },
  props: {
    enemies: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.enemies {
  width: 90%;
  height: 60vh;
  position: relative;
  overflow-y: scroll;
  border: solid 2px red;
}

.enemy {
  width: 30%;
  display: inline-block;
  position: relative;
  text-align: justify;
  margin: 3px;
}
</style>
