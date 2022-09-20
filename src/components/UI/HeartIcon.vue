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
  background-color: #006837; 
  transform: rotate(45deg);
  position: relative; 
}  

.heart::before, .heart::after {
  content : '';
  display: block;
  width: 8px;
  height: 8px;
  background-color: #006837;
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  margin-bottom: 2px;
  color: white;
}
</style>