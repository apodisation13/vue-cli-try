<template>
  <div class="assembling-pool-list">
    <card-item-preview
      class="pool-item"
      v-for="full_card in deck_is_progress"
      :key="full_card.card.id"
      :user_card="full_card.card"
      @dblclick="delete_card_from_deck(full_card)"
    />
  </div>
</template>

<script>
import CardItemPreview from "@/components/CardItemPreview"
export default {
  components: {
    CardItemPreview,
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
  },
}
</script>

<style scoped>
.assembling-pool-list {
  width: 230px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pool-item {
  max-width: 85px;
  max-height: 122px;
  margin-left: -27px;
  margin-right: -27px;
  margin-bottom: -65px;
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.5);
}
</style>
