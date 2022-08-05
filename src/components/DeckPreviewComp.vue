<template>
  <div
      @click.right="open_deck_view"
      v-touch:longtap="open_deck_view"
      @contextmenu.prevent
  >

    {{ deck.name }}, жизни {{ deck.health }}
<!--    Лидер {{ deck.leader.name }}-->
<!--    {{ deck.leader.ability.name}}-->

    <deck-modal
      v-if="show_deck"
      :deck="deck.cards"
      :leader="deck.leader"
      @close_deck_modal="show_deck=false"
    />

  </div>
</template>

<script>
import DeckModal from "@/components/ModalWindows/DeckModal"
export default {
  name: "deck-preview-comp",
  components: {DeckModal},
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
  },
}
</script>

<style scoped>

</style>