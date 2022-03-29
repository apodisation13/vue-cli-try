<template>
  <div class="modal_window">
    <cards-list
      :cards="deck"
      @chose_player_card='confirm_selection'
    />
  </div>
</template>

<script>
export default {
  name: "play-from-deck",
  props: {
    deck: {
      required: true,
      type: Array,
    },
  },
  methods: {
    confirm_selection(i) {
      alert(i)
      this.$emit('chose_card_to_play_from_deck', this.deck[i])
    },
  },
  emits: [
    'chose_card_to_play_from_deck',
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
  z-index: 9999;
  font-size: 12pt;
}
</style>