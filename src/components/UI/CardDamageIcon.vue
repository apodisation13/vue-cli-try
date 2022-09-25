<template>
  <div class="damage-icon-wrapper">
    <div class="damage-count">
      {{ damage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    damage: {
      type: Number,
      require: true,
    },
  },
}
</script>

<style scoped>
.damage-icon-wrapper {
  position: absolute;
  top: -6px;
  right: -6px;
  height: 18px;
  width: 18px;
  transform: rotate(-45deg);
}

.damage-count {
  position: absolute;
  transform: rotate(45deg);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: whitesmoke;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.damage-count::before {
  content: "";
  display: block;
  width: 6px;
  height: 12px;
  background-image: url("~@/assets/icons/card/sword.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.rhomb {
  position: absolute;
  width: 18px;
  height: 18px;
  transform: rotate(45deg);
}

.wrapper-rhomb-body {
  transform: rotate(-45deg);
}

.rhomb-top-right {
  top: -9px;
  right: -9px;
}
</style>
