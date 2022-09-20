<template>
  <button class="health-btn" :style="style">&hearts;{{ health }}</button>
</template>

<script>
export default {
  name: "health-comp",
  computed: {
    health() {
      return this.$store.state.game.health
    },
    style() {
      if (isNaN(this.health) && this.health.includes("-"))
        return { backgroundColor: "red" }
      else if (isNaN(this.health) && this.health.includes("+"))
        return { backgroundColor: "lime" }
      else if (this.health < 30) return { backgroundColor: "#F75D59" }
      else if (this.health < 50) return { backgroundColor: "orange" }
      else return { backgroundColor: "green" }
    },
  },
}
</script>

<style scoped>
.health-btn {
  height: 4vh;
  width: 98%;
  /*background-color: green;*/
  border: 0;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}
</style>
