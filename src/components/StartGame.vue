<template>
  <div class="start_game">
    <button class="btn_start" @click="start_game">НАЧАТЬ</button>

    <redraw-modal v-if="redraw" 
    :deck='deck' 
    :hand='hand' 
    @redraw_finished='redraw_finished'
    />
  </div>
</template>

<script>

import { place_enemies } from '@/logic/place_enemies'
import { draw_hand } from '@/logic/draw_hand'
  
  export default {
    name: 'start-game',
    data() {
      return {
        redraw: false,
        hand: [],
        deck: JSON.parse(JSON.stringify(this.$store.state.current_deck)),
        field: ['','','','','','','','','','','',''],
      }
    },
    methods: {
      // начало игры: расставить врагов, вытянуть карты в руку, открыть redraw-modal
      start_game() {
        place_enemies(this.field, this.$store.state.levels[this.$store.state.level][1])  // рандомно расставит врагов
        draw_hand(this.hand, this.deck)  // вытянет руку, остальное оставит в деке

        this.redraw = true
      },

      // редро - перетянуть карты и закрыть redraw-modal
      redraw_finished(dict) { // пришедший параметр из ЭМИТА этого компонента
        this.hand = dict.hand
        this.deck = dict.deck
        this.redraw = false  // закончили редро

        this.$emit('start_game', {hand: this.hand, deck: this.deck, field: this.field})
      },
    },
    emits: [
      'start_game'
    ],
  }
</script>

<style scoped>
.start_game {
  width: 9%;
  height: 5%;
  border: solid 2px red;
  position: absolute;
  /* top: 1%; */
  right: 1%;
}

.btn_start {
  width: 98%;
  height: 98%;
}
</style>