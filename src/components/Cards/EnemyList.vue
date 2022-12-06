<template>
  <div class="enemies">
    <div class="enemy" v-for="enemy in enemies" :key="enemy">
      <enemy-comp :enemy="enemy" />
    </div>
  </div>
</template>

<script>
import EnemyComp from "@/components/Cards/EnemyComp"
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
  overflow-y: scroll;
  /*border: solid 2px red;*/
  margin: auto;
}

.enemy {
  width: 30%;
  display: inline-block;
  text-align: justify;
  margin: 3px;
}
</style>
