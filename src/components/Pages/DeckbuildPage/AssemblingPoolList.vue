<template>
  <transition-group name="flip-list" tag="div" class="assembling-pool-list">
    <card-item
      class="pool-item"
      v-for="(full_card, index) in deck_is_progress"
      :key="full_card.card.id"
      :card="full_card.card ? full_card.card : full_card"
      :user_card="full_card.card ? full_card : null"
      :is_previev="index + 1 !== deck_is_progress.length"
      @dblclick="delete_card_from_deck(full_card)"
      @click="change_order(index)"
    />
  </transition-group>
</template>

<script>
import CardItem from "@/components/CardItem"
export default {
  components: {
    CardItem,
  },
  props: {
    deck_is_progress: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    delete_card_from_deck(card) {
      return this.$emit("delete_card_from_deck", card)
    },
    change_order(index) {
      if (this.deck_is_progress.length === index + 1) {
        return
      }
      this.$emit("change_order_deck", index)
    },
  },
  emits: ["delete_card_from_deck", "change_order_deck"],
}
</script>

<style scoped>

.flip-list-move {
  -webkit-transition: test .5s;
  transition: transform 1s;
}

.assembling-pool-list {
  width: 230px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pool-item {
  width: 85px;
  margin-left: -27px;
  margin-right: -27px;
  margin-bottom: -65px;
}
</style>
