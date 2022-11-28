<template>
  <div 
    class="resource-count__container" 
    :class="{ zero:isZero }"
  >
    <div class="resource-count__value">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "resource-count-rombus",
  props: {
    isZero: {
      type: Boolean,
      required: false,
      default: false
    }
  },
}
</script>
<style>
.resource-count__container {
  position: absolute;
  width: 35px;
  height: 35px;
  top: -18px;
  right: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  rotate: 45deg;
  border-width: 3px;
  border-style: solid;
  border-image-source: linear-gradient(to bottom, #B07B15, #FACF5D, #B48328);
  border-image-slice: 1;

  background-color: whitesmoke;
  box-shadow: inset 0 0 2px 2px gray;
}

.zero {
  background-color: hsl(359, 92%, 33%);
}

.resource-count__value {
  font-family: "Philosopher";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  background: linear-gradient(183.6deg,
      hsl(39, 83%, 30%) 2.96%,
      hsl(47, 85%, 40%) 65.79%,
      hsl(39, 82%, 30%) 129.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  rotate: -45deg;
}
</style>