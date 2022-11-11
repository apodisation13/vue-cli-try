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
  height: 60%;
  position: relative;
  overflow: scroll;
  border: solid 2px red;
}

.enemy {
  top: 20%;
  width: 30%;
  display: inline-block;
  position: relative;
  text-align: justify;
}
</style>
