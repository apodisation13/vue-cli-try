<template>
  <div class="card-list">
    <card-item
      v-for="item in cards"
      :card="item.card"
      :key="item.card.id"
      :hp_needed="hp_needed"
      :deckbuilder="deckbuilder"
    />
  </div>
</template>

<script>
import CardItem from "@/components/CardItem"
export default {
  components: { CardItem },
  props: {
    cards: {
      required: true,
      type: Array,
    },
    // hp_needed: {
    //   // hp только для декбилдера, для игры не нужно оно
    //   type: Boolean,
    //   default: false,
    // },
    // deckbuilder: {
    //   type: Boolean,
    //   default: false,
    // },
  },
}
</script>

<style scoped>
.card-list {
  padding-left: 8px;
  padding-right: 8px;
  height: 70vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
}
</style>
