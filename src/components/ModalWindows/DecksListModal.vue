<template>
  <base-modal>
    <div class="content">
      <button-close-img @click="close_self" />
      <deck-selection :deckbuilder="true" @emit_state_deck_index="show_deck" />
    </div>
  </base-modal>
</template>

<script>
import DeckSelection from "@/components/DeckSelection"
import BaseModal from "@/components/ModalWindows/BaseModal.vue"
import ButtonCloseImg from "@/components/UI/Buttons/ButtonCloseImg.vue"
export default {
  name: "decks-list-modal",
  components: { ButtonCloseImg, BaseModal, DeckSelection },
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

<style scoped>
.content {
  position: relative;
  padding: 55px 10px 10px;
}
</style>
