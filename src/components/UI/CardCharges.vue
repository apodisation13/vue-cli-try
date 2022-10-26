<template>
  <div class="charge-wrapper" 
    :style="{'--bgColor': bgColor}"
  >
    <div class="charge">
      <div class="charge-icon"></div>
      <div class="charge-value">
        {{ charge }}
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
      }
    }
  }
</script>

<style scoped>
.charge-wrapper {
  position: absolute;
  width: 16px;
  height: 16px;
  bottom: -5px;
  right: -4px;
}

.charge-wrapper::before {
  content: '';
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  width: 14px;
  height: 14px;
  transform: rotate(-45deg);
  background-color: var(--bgColor);
  border-radius: 2px;
}

.charge {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charge-icon {
  width: 5px;
  height: 10px;
  background-image: url('~@/assets/icons/card/charge.svg');
  background-repeat: no-repeat;
  background-position: center;
}

.charge-value {
  font-size: 7px;
  color: white;
}
</style>
