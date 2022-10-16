<template>
  <div
    v-if="!!user_card"
    class="card-item"
    :style="[
      { backgroundImage: `url(${user_card.image})`} ,
      border(user_card),
    ]"
  >
  </div>
</template>

<script>
import { border_leader, border_for_card } from "@/logic/border_styles"
export default {
  props: {
    user_card: {
      type: Object,
      required: true,
    },
    is_leader: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    border(card) {
      return (this.is_leader) ? border_leader(card): border_for_card(card);
    },
  },
}
</script>

<style scoped>
.card-item {
  position: relative;
  width: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 2px;
}

.card-item::before {
  content: '';
  display: block;
  padding-top: 143%;
}
</style>