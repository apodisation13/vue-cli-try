<template>
  <div class="selected_deck" v-if="$store.state.current_deck.length > 0">
    ВЫБРАННАЯ ДЕКА - Жизни {{ $store.state.health }} <br>
    Лидер {{ $store.state.leader.name }}
  </div>
</template>

<script>
export default {
  name: "selected-deck",
}
</script>

<style scoped>
.selected_deck {
  width: 95%;
  height: 6vh;
  border: solid 1px black;
  margin: 1%;
}
</style>