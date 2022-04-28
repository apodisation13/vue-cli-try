<template>
  <div class="start">

    <div class="resource">
      <b><resource-comp /></b>
    </div>

    <div class="play_price">
      Для этой игры надо заплатить <b>{{ play_price }}</b> wood!
    </div>

    <button class="btn_start" v-if="deck.length" @click="start_game">
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
import {enemy_leader_ai_move_once} from "@/logic/ai_move/ai_move"
import RedrawModal from "@/components/RedrawModal"
import ResourceComp from "@/components/ResourceComp";
export default {
  name: 'start-game',
  components: {ResourceComp, RedrawModal},
  async created() {
    let deck = this.$store.state.game.current_deck
    let d = deck.map(c => c.card)
    this.deck = JSON.parse(JSON.stringify(d))
    // this.deck = await JSON.parse(JSON.stringify(this.$store.state.game.current_deck))
    this.enemies = await JSON.parse(JSON.stringify(this.$store.state.game.level.enemies))
  },
  computed: {
    // deck() {
    //   return JSON.parse(JSON.stringify(this.$store.state.current_deck))
    // },
    // enemies() {
    //   return JSON.parse(JSON.stringify(this.$store.state.level.enemies))
    // },
    play_price() {
      if (this.$store.state.game.level.difficulty === "easy") return this.$store.state.user_actions.play_level_easy
      else if (this.$store.state.game.level.difficulty === "normal") return this.$store.state.user_actions.play_level_normal
      else if (this.$store.state.game.level.difficulty === "hard") return this.$store.state.user_actions.play_level_hard
      else return 'Уровень не выбран!'
    },
  },
  data() {
    return {
      redraw: false,
      hand: [],
      field: ['','','','','','','','','','','',''],
      deck: '',
      enemies: '',
    }
  },
  methods: {
    // начало игры: расставить врагов, вытянуть карты в руку, открыть redraw-modal
    async start_game() {

      let result = await this.$store.dispatch("pay_resource",
          {"wood": this.$store.getters['resource'].wood - this.play_price})
      if (!result) {
        alert('Что-то пошло не так, сыграть невозможно')
        return
      }
      setTimeout(() => {
        place_enemies(this.field, this.enemies)  // рандомно расставит врагов
        enemy_leader_ai_move_once(this.$store.state.game.enemy_leader, this.deck)  // АБИЛКИ ЛИДЕРА врага в самом начале
        draw_hand(this.hand, this.deck)  // вытянет руку, остальное оставит в деке

        this.redraw = true
      }, 1000)

    },

    // редро - перетянуть карты и закрыть redraw-modal
    redraw_finished(dict) { // пришедший параметр из ЭМИТА этого компонента
      this.hand = dict.hand
      this.hand.reverse()  // КОСТЫЛЬ ДЛЯ FLOAT:RIGHT
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

.start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 40vh;
  border: solid 2px black;
}

.btn_start {
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 20%;
  position: absolute;
}

.resource {
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.play_price {
  width: 100%;
  text-align: center;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}
</style>