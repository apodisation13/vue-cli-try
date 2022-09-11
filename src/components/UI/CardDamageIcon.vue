<template>
  <div class="damage-icon">
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
.damage-icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 4vh;
  width: 4vh;
  transform: rotateX(45deg) rotateZ(45deg);
}

.damage-count {
  transform: rotateZ(-45deg);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
}
.damage-count::before {
  content: "";
  display: block;
  width: 5px;
  height: 4px;
  background-image: url("~@/assets/icons/card/sword.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
