<template>
<div class="modal_window" v-touch:swipe="close_self">
  <button
      class="close_button"
      @click="close_self"
  >
    Закрыть
  </button>

  <!-- выбор деки для редакирования и просмотра -->
  <select-deck
      :deckbuilder="true"
      @emit_state_deck_index="show_deck"
  />
</div>
</template>

<script>
export default {
  name: "decks-list-modal",
  methods: {
    close_self() {
      this.$emit('close_decks_list_modal')
    },
  },
  emits: [
      'close_decks_list_modal'
  ],
}
</script>

<style scoped>
.modal_window {
  background-color: limegreen;
  width: 100%;
  height: 90%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -53%);
  z-index: 999;
}

.close_button {
  width: 25%;
  height: 5vh;
  background-color: darkorange;
  margin-bottom: 12%;
  font-size: 14pt;
}
</style>