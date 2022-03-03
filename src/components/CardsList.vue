<template>
  <div class="cards">

    <div class="card_in_list" :style="border(card)"
         v-for="(card, index) in cards" :key='card'
         @dblclick="chose_player_card(index)"
    >

      <card-comp
          :card="card"
          :hp_needed="hp_needed"
      />

    </div>
  </div>
</template>

<script>
import { border_for_card } from '@/logic/border_styles'
export default {
  name: "cards-list",
  props: {
    cards: {
      required: true,
      type: Array
    },
    hp_needed: {  // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false
    },
  },
  methods: {
    chose_player_card(index) {
      this.$emit('chose_player_card', index)  // передаём this.index по эмиту
    },
    border(card) {
      return border_for_card(card)
    },
  },
  emits: [
    'chose_player_card',
  ],
}
</script>

<style scoped>
.cards {
  width: 98%;
  /*height: 80%;*/
  overflow: scroll;
  /*position: relative;*/
}

.card_in_list {
  width: 26%;
  height: 18.5vh;
  /* border: solid 3px gold; */
  border-radius: 2%;
  display: inline-block;
  margin-left: 0.5%;
  margin-top: 0.1%;
  position: relative;
}

</style>