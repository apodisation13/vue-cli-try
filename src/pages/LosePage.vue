<template>
  <div class="lose">
    ВЫ ПРОИГРАЛИ :(((
    <br /><br /><br />
    Удачи в следующий раз!
  </div>
</template>

<script>
export default {
  name: "LosePage",
  created() {
    this.$store.dispatch("re_set_deck")
  },
}
</script>

<style scoped>
.lose {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 30vh;
  color: white;
  font-size: 14pt;
  text-align: center;
}
</style>
