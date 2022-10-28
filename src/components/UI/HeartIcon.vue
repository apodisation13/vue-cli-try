<template>
  <div class="heart-wrapper" :style="{ '--bgColor': bgColor }">
    <div class="heart">
      <div class="health-value">
        {{ health }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    health: {
      type: Number,
    },
    bgColor: {
      type: String,
    },
  },
}
</script>

<style scoped>
.heart-wrapper {
  position: absolute;
  bottom: -1px;
  left: 1px;
  width: 18px;
  height: 18px;
  transform: rotate(-45deg);
  background-color: var(--bgColor);
  border-radius: 2px;
}

.heart {
  position: absolute;
  transform: rotate(45deg);
  top: 2px;
  right: 2px;
  bottom: 0;
  left: 0;
  background-image: url("~@/assets/icons/card/heart_green.svg");
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
}

.health-value {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
  font-size: 9px;
  margin-bottom: 2px;
  color: white;
}
</style>
