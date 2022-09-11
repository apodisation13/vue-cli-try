<template>
  <div class="triangle">
    <span v-if="!card || card.timer === 0"> &#8987; </span>
    <span v-else class="timer"> {{ card.timer }}&#8987; </span>
  </div>
</template>

<script>
export default {
  name: "card-passive",
  props: {
    card: {
      required: false,
      default: null,
    },
  },
}
</script>

<style scoped>
.triangle {
  width: 15%;
  height: 15%;
  position: absolute;
  bottom: 25%;
  right: 2%;
  border-radius: 20%;
  font-size: 10pt;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10pt;
}

.timer {
  width: 100%;
  height: 100%;
  font-size: 8pt;
}
</style>
