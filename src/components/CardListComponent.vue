<template>
  <div class="card-list">
    <card-item
      v-for="user_card in cards"
      :key="user_card.id"
      :user_card="user_card"
      :hp_needed="hp_needed"
      :deckbuilder="deckbuilder"
      :style="border(user_card.card)"
      @dblclick="chose_player_card(user_card)"
    />
  </div>
</template>

<script>
import CardItem from "@/components/CardItem"
import { border_for_card, border_leader } from "@/logic/border_styles"
export default {
  components: { 
    CardItem,
  },
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
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    chose_player_card(card) {
      this.$emit("chose_player_card", card) // передаём this.index по эмиту
    },
    border(card) {
      return (this.is_leader) ? border_leader(card): border_for_card(card);
    },
  }
}
</script>

<style scoped>

.card-list {
  padding: 8px 0;
  display: grid; 
  grid-template-columns: repeat(4, 22%); 
  row-gap: 10px;
  column-gap: 9px;
  justify-content: center;
}
</style>
