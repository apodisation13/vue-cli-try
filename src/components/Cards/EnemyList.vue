<template>
  <div class="enemies">
    <div class="enemy" v-for="enemy in enemies" :key="enemy">
      <enemy-comp :enemy="enemy" @dblclick="choseEnemy(enemy)" />
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
  methods: {
    choseEnemy(enemy) {
      this.$emit("chose-enemy", enemy)
    },
  },
  emits: ["chose-enemy"],
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
