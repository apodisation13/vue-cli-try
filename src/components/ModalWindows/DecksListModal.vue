<template>
  <modal-window>
    <button-close  @close_self="close_self"/>

    <!-- выбор деки для редакирования и просмотра -->
    <deck-selection
        :deckbuilder="true"
        @emit_state_deck_index="show_deck"
    />

  </modal-window>
</template>

<script>
import ButtonClose from "@/components/UI/ButtonClose"
import DeckSelection from "@/components/DeckSelection"
import ModalWindow from "@/components/UI/ModalWindow"
export default {
  name: "decks-list-modal",
  components: {ModalWindow, DeckSelection, ButtonClose},
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