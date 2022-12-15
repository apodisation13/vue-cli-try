<template>
  <div
    @click.right="open_deck_view"
    v-touch:longtap="open_deck_view"
    @contextmenu.prevent
    :style="background_color(deck)"
  >
    <div class="global_text deck_info deck_name">
      {{ deck.name }}
    </div>
    <div class="deck_info deck_hp">
      <div class="heart"></div>
      <div>{{ deck.health }}</div>
    </div>
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

<style scoped>
.deck_info {
  display: inline;
}
.deck_name {
  padding-left: 20px;
  font-size: 20px;
  background: var(--primary-gold-gradient);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.deck_hp {
  float: right;
  padding-right: 20px;
}
.heart {
  width: 20px;
  height: 20px;
  background-image: url("~@/assets/icons/card/heart_green.svg");
  background-repeat: no-repeat;
  background-position: center;
  /*margin-right: 3px;*/
}
</style>
