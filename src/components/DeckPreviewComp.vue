<template>
<div
    @click.right="open_deck_view"
    v-touch:longtap="open_deck_view"
    @contextmenu.prevent
>

  {{ deck.name }}
  Жизни -- {{ deck.health }}
  Лидер {{ deck.leader.name }}
  {{ deck.leader.ability.name}}

  <deck-modal
    v-if="show_deck"
    :deck="deck.cards"
    @close_deck_modal="show_deck=false"
  />

</div>
</template>

<script>
export default {
  name: "deck-preview-comp",
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