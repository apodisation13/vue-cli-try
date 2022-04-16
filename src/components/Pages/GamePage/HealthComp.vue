<template>
  <button class="health-btn" :style="style()">
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
  methods: {
    style() {
      if (isNaN(this.health) && this.health.includes('-')) return {'backgroundColor': 'red'}
      else if (isNaN(this.health) && this.health.includes('+')) return {'backgroundColor': 'lime'}
      else return {'backgroundColor': 'green'}
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