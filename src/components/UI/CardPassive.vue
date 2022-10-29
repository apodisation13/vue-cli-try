<template>
  <div class="passive">
    <!-- <div class="passive-clock" v-if="!card || card.timer === 0"></div> -->
    <div class="passive-timer" >
      <span class="passive-timer-value" >1</span> 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      required: false,
      default: null,
    },
  },
}
</script>

<style scoped>
.passive {
  position: absolute;
  right: -3px;
  bottom: 25px;
}

.passive-clock, .passive-timer {
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.passive-clock {
  background-image: url("~@/assets/icons/card/passive_clock.svg");
}

.passive-timer {
  background-image: url("~@/assets/icons/card/passive_timer.svg");
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.passive-timer-value {
  color: white;
  font-size: 12px;
}

</style>
