<template>
  <div>
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
  }
</script>

<style scoped>
.btn_start {
  width: 160px;
  height: 30px;
}
</style>