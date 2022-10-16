<template>
  <div class="assembling-pool-list">
    <card-item-preview 
      class="pool-item"
      v-for="full_card in deck_is_progress"
      :key="full_card.card.id"
      :user_card="full_card.card"
    />
  </div>
</template>

<script>
import CardItemPreview from '@/components/CardItemPreview'
  export default {
    components: { 
      CardItemPreview,
    },
    props: {
      deck_is_progress: {
        type: Array,
        default: [],
      }
    }
  }
</script>

<style scoped>
.assembling-pool-list {
  width: 265px;
  /* display: grid;
  grid-template-columns: repeat(7, 30px);
  align-content: center; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pool-item {
  width: 85px;
  margin-left: -50px;

}
</style>