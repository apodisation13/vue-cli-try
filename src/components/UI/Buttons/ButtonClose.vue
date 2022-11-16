<template>
  <div>
    <button class="close_button" @click="close">Закрыть</button>
  </div>
</template>

<script>
export default {
  name: "button-close",
  methods: {
    close() {
      this.$emit("close_self")
    },
  },
  emits: ["close_self"],
}
</script>

<style scoped>
.close_button {
  width: 17%;
  height: 5vh;
  margin-top: 1%;
  margin-bottom: 1%;
}
</style>
