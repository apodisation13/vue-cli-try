<template>
  <div class="heart-wrapper">
    <div class="heart">
    </div>
    <div class="health-value">
      {{ health }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      health: {
        type: Number,
      },
    }
  }
</script>

<style scoped>
.heart-wrapper {
  position: absolute;
  bottom: 2px;
  left: 5px;
  display: flex;
  align-items: center;
}

.heart {
  width: 8px; 
  height: 8px; 
  background-color: red; 
  transform: rotate(45deg);
  position: relative; 
}  

.heart::before, .heart::after {
  content : '';
  display: block;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
}

.heart::before {
  top: -4px;
  left: 0;
}

.heart::after {
  top: 0;
  left: -4px;
}

.health-value {
  font-size: 12px;
  color: red;
  margin-left: 4px;
}
</style>