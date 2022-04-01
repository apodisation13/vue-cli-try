<template>
  <modal-window>
    <cards-list
        :cards="deck"
        @chose_player_card='confirm_selection'
    />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow"
import CardsList from "@/components/CardsList"
export default {
  name: "play-from-deck",
  components: {CardsList, ModalWindow},
  props: {
    deck: {
      required: true,
      type: Array,
    },
  },
  methods: {
    confirm_selection(i) {
      this.$emit('chose_card_to_play_from_deck', this.deck[i])
    },
  },
  emits: [
    'chose_card_to_play_from_deck',
  ],
}
</script>

<style scoped>

</style>