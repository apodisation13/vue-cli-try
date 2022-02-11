<template>
  <!-- показать количество врагов, которое осталось на уровне -->
<div class='remaining_enemies'>Враги
  <button class="btn_enemies"> 
    <!-- {{ $store.state.levels[$store.state.level][1].length }} -->
    {{ enemies.length }}
  </button>
</div>
  
</template>

<script>
  export default {
    name: "remaining-enemies",
    props: {
      enemies: {
        required: true,
        type: Array
      }
    },
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
    height: 35px;
    background: grey;
}
</style>