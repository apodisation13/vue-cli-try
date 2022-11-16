<template>
  <modal-window>
    <button-close @close_self="close_self" />

    <!-- выбор деки для редакирования и просмотра -->
    <deck-selection :deckbuilder="true" @emit_state_deck_index="show_deck" />
  </modal-window>
</template>

<script>
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import DeckSelection from "@/components/DeckSelection"
import ModalWindow from "@/components/ModalWindows/ModalWindow"
export default {
  name: "decks-list-modal",
  components: { ModalWindow, DeckSelection, ButtonClose },
  methods: {
    close_self() {
      this.$emit("close_decks_list_modal")
    },
    show_deck(index) {
      this.$emit("change_deck", index)
      this.close_self()
    },
  },
  emits: ["close_decks_list_modal", "change_deck"],
}
</script>

<style scoped></style>
