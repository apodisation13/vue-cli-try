<template>
  <div
    @click.right="open_deck_view"
    v-touch:longtap="open_deck_view"
    @contextmenu.prevent
    :style="background_color(deck)"
  >
    {{ deck.name }}, жизни {{ deck.health }}
    <deck-modal
      v-if="show_deck"
      :deck="deck.cards"
      :leader="deck.leader"
      @close_deck_modal="show_deck = false"
    />
  </div>
</template>

<script>
import DeckModal from "@/components/ModalWindows/DeckModal"
import { background_color_deck } from "@/logic/border_styles"

export default {
  name: "deck-preview-comp",
  components: { DeckModal },
  props: {
    deck: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show_deck: false,
    }
  },
  methods: {
    open_deck_view() {
      this.show_deck = true
    },
    background_color(deck) {
      return background_color_deck(deck)
    },
  },
}
</script>

<style scoped></style>
