<template>
<div class="hand"

>

  <div class="card" :style="border(card, index)"
    v-for="(card, index) in hand" :key='card'
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
import { border } from '@/logic/border_styles'

export default {
  name: 'hand-comp',
  props: {
    hand: {
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
    border(card, index) {
      return border(card, index)
    },
  },
  emits: [
    'chose_player_card', 
  ],
}
</script>

<style scoped>

.hand {
  width: 98%;
  height: 21vh;
  /* border: solid 1px blue; */
  clear: both;
  overflow: auto;
  white-space: nowrap;
  position: relative;
}

.card {
  width: 26%;
  height: 18.5vh;
  /* border: solid 3px gold; */
  border-radius: 2%;
  display: inline-block;
  margin-right: -12%;
  margin-left: 0.5%;
  margin-top: 0.1%;
  position: relative;
}

</style>
