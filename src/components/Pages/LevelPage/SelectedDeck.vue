<template>
  <div class="selected_deck" v-if="$store.state.game.current_deck.length > 0">
    Жизни {{ $store.state.game.health }};
    Лидер {{ $store.state.game.leader.name }}
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
  height: 3vh;
  border: solid 1px black;
  margin: 1%;
}
</style>