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
  top: -2px;
  right: -2px;
  height: 25px;
  padding-right: 2px;
}

.damage-count {
  color: whitesmoke;
  font-size: 10px;
  display: flex;
  align-items: center;
}
.damage-count::before {
  content: "";
  display: block;
  width: 11px;
  height: 22px;
  background-image: url("~@/assets/icons/card/sword.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
