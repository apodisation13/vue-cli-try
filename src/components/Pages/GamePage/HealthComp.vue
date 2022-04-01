<template>
  <button class="health-btn">
    &hearts;{{ health }}
  </button>
</template>

<script>
export default {
  name: 'health-comp',
  computed: {
    health() {
      return this.$store.state.health
    },
  },
}
</script>

<style scoped>

.health-btn {
  height: 4vh;
  width: 98%;
  background-color: green;
  border: 0;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

</style>