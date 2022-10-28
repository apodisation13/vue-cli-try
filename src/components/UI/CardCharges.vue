<template>
  <div class="charge-wrapper" :style="{ '--bgColor': bgColor }">
    <div class="charge">
      <div class="charge-icon">
        <div class="charge-value">
          {{ charge }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    charge: {
      type: Number,
    },
    bgColor: {
      type: String,
    },
  },
}
</script>

<style scoped>
.charge-wrapper {
  position: absolute;
  width: 18px;
  height: 18px;
  bottom: -1px;
  right: 0;
  transform: rotate(-45deg);
  background-color: var(--bgColor);
  border-radius: 2px;
}

.charge {
  position: absolute;
  transform: rotate(45deg);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charge-icon {
  width: 10px;
  height: 20px;
  background-image: url("~@/assets/icons/card/charge.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charge-value {
  font-size: 7px;
  color: white;
}
</style>
