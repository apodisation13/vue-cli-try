<template>
  <!-- показать количество врагов, которое осталось на уровне -->
  {{ $store.state.levels[$store.state.level][1].length }}
</template>

<script>
  export default {
    name: "remaining-enemies",
  }
</script>
