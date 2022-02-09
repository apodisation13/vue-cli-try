<template>
  <!-- показать количество врагов, которое осталось на уровне -->
<!-- <div class='remaining_enemies'>Враги -->
  <button class="btn_enemies"> 
    Враги {{ $store.state.levels[$store.state.level][1].length }}
  </button>
<!-- </div> -->
  
</template>

<script>
  export default {
    name: "remaining-enemies",
  }
</script>

<style scoped>
.remaining_enemies {
    width: 100px;
    height: 75px;
    display: inline-block;
    text-align: center;
}

.btn_enemies {
    width: 100px;
    height: 90%;
    background: grey;
}
</style>