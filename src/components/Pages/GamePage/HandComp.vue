<template>
  <div class="hand">

    <div class="card_in_hand" :style="border(card, index)"
      v-for="(card, index) in hand" :key='card'
      @dblclick="chose_player_card(card)"
    >

      <card-comp :card="card" />

    </div>
  </div>
</template>

<script>
import { border_for_hand } from '@/logic/border_styles'
import CardComp from "@/components/CardComp"
export default {
  name: 'hand-comp',
  components: {CardComp},
  props: {
    hand: {
      required: true,
      type: Array,
    },
  },
  methods: {
    chose_player_card(card) {
      this.$emit('chose_player_card', card)  // передаём card по эмиту
    },
    border(card, index) {
      return border_for_hand(card, index)
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
  /*white-space: nowrap;*/
  /*ВОТ БЛЯТЬ ИЗЗА ЭТОЙ ЕБАНОЙ ПОЕБНИ БЛЯТЬ ВЫШЕ Я ЕБАЛСЯ ЕБАНЫЕ 3 ЧАСА БЛЯТЬ*/
  position: relative;
}

.card_in_hand {
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
