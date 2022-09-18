<template>
  <div class="card-list">
    <card-item
      v-for="item in cards"
      :key="item.card.id"
      :card="item.card"
      :count="item.count"
      :hp_needed="hp_needed"
      :deckbuilder="deckbuilder"
      :style="border(item.card)"
      @dblclick="chose_player_card(item)"
    />
  </div>
</template>

<script>
import CardItem from "@/components/CardItem"
import { border_for_card, border_leader } from "@/logic/border_styles"
export default {
  components: { CardItem },
  props: {
    cards: {
      required: true,
      type: Array,
    },
    hp_needed: {
      // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false,
    },
    deckbuilder: {
      type: Boolean,
      default: false,
    },
    is_leader: {
      // брать границу карты как для лидеров
      type: Boolean,
      default: false,
    },
  },
  methods: {
    chose_player_card(card) {
      this.$emit("chose_player_card", card) // передаём this.index по эмиту
    },
    border(card) {
      return (this.is_leader) ?
            border_leader(card):
            border_for_card(card);
    },
  }
}
</script>

<style scoped>
.card-list {
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
