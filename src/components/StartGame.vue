<template>
  <div class="start">
    <button class="btn_start" v-if="deck.length"
      @click="start_game">
      НАЧАТЬ
    </button>
  </div>
  <redraw-modal v-if="redraw" 
    :deck='deck' 
    :hand='hand' 
    @redraw_finished='redraw_finished'
  />
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
        field: ['','','','','','','','','','','',''],
        deck: JSON.parse(JSON.stringify(this.$store.state.current_deck)),
        enemies: JSON.parse(JSON.stringify(this.$store.state.level.enemies)),
      }
    },
    methods: {
      // начало игры: расставить врагов, вытянуть карты в руку, открыть redraw-modal
      start_game() {
        place_enemies(this.field, this.enemies)  // рандомно расставит врагов
        draw_hand(this.hand, this.deck)  // вытянет руку, остальное оставит в деке

        this.redraw = true
      },

      // редро - перетянуть карты и закрыть redraw-modal
      redraw_finished(dict) { // пришедший параметр из ЭМИТА этого компонента
        this.hand = dict.hand
        this.deck = dict.deck
        this.redraw = false  // закончили редро

        this.$emit('start_game', {
          hand: this.hand, 
          deck: this.deck, 
          field: this.field,
          enemies: this.enemies,
        })
      },
    },
    emits: [
      'start_game'
    ],
    computed: {
      // deck() {
      //   return JSON.parse(JSON.stringify(this.$store.state.current_deck))
      // },
      // enemies() {
      //   return JSON.parse(JSON.stringify(this.$store.state.level.enemies))
      // },
    }
  }
</script>

<style scoped>

.start {
  width: 50%;
  height: 300px;
  top: 50%; 
  left: 50%;
  border: solid 2px black;
  transform: translate(-50%, -50%);
  position: absolute;
}


.btn_start {
  width: 50%;
  height: 20%;
  position: relative;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>