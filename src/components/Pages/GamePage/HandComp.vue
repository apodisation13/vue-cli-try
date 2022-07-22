<template>
  <div class="hand">

    <div class="card_in_hand" :style="border(card)"
      v-for="(card, index ) in hand" :key='card'
      @dblclick="chose_player_card(card)"
      draggable="true"
      v-on:touchmove="onDragStart($event, card, index)"
      @dragstart="onDragStart($event, card, index)"
    >

      <card-comp
          :card="card"
          :id="`card_${index}`"
      />

    </div>
  </div>
</template>

<script>
import { border_for_hand, border_for_card, border_for_hand_2 } from '@/logic/border_styles'
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
      // return border_for_hand(card, index)
      // return border_for_card(card)
      return border_for_hand_2(this.hand, card)
    },
    onDragStart(e, card, index) {

      // var self = this
      // return function (a, b) {
      //   console.log('ТАЩИМ КАРТУ', card, index)
      //   self.$emit('chose_player_card', card)
      // }
      alert(index)
      // e.dataTransfer.dropEffect = 'move'
      // e.dataTransfer.effectAllowed = 'move'
      // e.dataTransfer.setData('card', JSON.stringify(card))
      console.log('МЫ ТУТ, ТЯНЕМ ЗА КАРТУ', card)
      this.$emit('chose_player_card', card)
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
  padding-top: 2%;
  /* border: solid 1px blue; */
  clear: both;
  overflow: auto;
  /*white-space: nowrap;*/
  /*position: absolute;*/
  /*top: 75%;*/
  /*left: 0;*/
}

.card_in_hand {
  width: 26%;
  height: 18.5vh;
   /*border: solid 3px gold; */
  border-radius: 2%;
  display: table-row;
  overflow: hidden;
  /*вот так было через жопу*/
  /*margin-right: -12%;*/
  /*margin-left: 0.5%;*/
  /*ну а вот так вроде всё заебись*/
  /*margin-right: 0.3%;*/
  /*margin-left: -12%;*/
  /*float: right;*/
  margin-top: 0.1%;
  position: relative;
  border-width: 3px 4px 3px 5px;
  border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
  /*transform: rotate(2deg);*/
}
.card_in_hand:hover {
  margin-top: -2%;
  z-index: 999999;
  border-width: 3px 4px 3px 5px;
  border-color: red;
  border-style: solid;
}
* {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
}
</style>
