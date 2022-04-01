<template>
  <modal-window>
    <button-close  @close_self="close_self"/>

    <!-- выбор деки для редакирования и просмотра -->
    <select-deck
        :deckbuilder="true"
        @emit_state_deck_index="show_deck"
    />

  </modal-window>
</template>

<script>
export default {
  name: "decks-list-modal",
  methods: {
    close_self() {
      this.$emit('close_decks_list_modal')
    },
    show_deck() {

    },
  },
  emits: [
      'close_decks_list_modal',
  ],
}
</script>

<style scoped>

</style>