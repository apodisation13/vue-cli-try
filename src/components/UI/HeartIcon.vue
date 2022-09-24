<template>
  <div class="heart-wrapper" 
    :style="{'--bgColor': bgColor}"
  >
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
      }
    }
  }
</script>

<style scoped>
.heart-wrapper {
  position: absolute;
  width: 16px;
  height: 16px;
  bottom: -8px;
  left: -8px;
}

.heart-wrapper::before {
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

.heart {
  position: absolute;
  top: 2px;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('~@/assets/icons/card/heart_green.svg');
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
  font-size: 6px;
  margin-bottom: 2px;
  color: white;
}
</style>