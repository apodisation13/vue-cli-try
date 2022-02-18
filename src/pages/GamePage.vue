<template>

<div v-if="beginning">
  <start-game @start_game='start_game'/>
</div>

<div v-else>


<field-comp 
:field='field' 
@exec_damage_ai_card='exec_damage_ai_card'
/>

<div class="right-panel">

<enemy-leader />

<div class="div-two-buttons">
 <remaining-enemies :enemies='enemies' />
 <enemies-grave />
</div>

<div class="draw">
  <draw-comp v-show="can_draw"
  @click="draw_one_card"
  />
</div>

<pass-comp @click="exec_ai_move" />

<div class="div-two-buttons">
  <grave-comp :grave='grave' />
  <deck-comp :deck='deck' />
</div>


</div>

<hand-comp
:hand='hand'
@chose_player_card='chose_player_card' 
/>



<!-- <health-comp :player_cards_active="player_cards_active" /> -->

<!-- <div class="active_buttons">
  <button class="btn_pass" @click="exec_ai_move">Пас</button>
  <deck-comp :deck='deck' />
  <grave-comp :grave='grave' />
  <remaining-enemies v-if="!beginning" :enemies='this.enemies'/>
  <button class="btn_draw" v-show="can_draw" 
  @click="draw_one_card">ДРО</button>
</div> -->
 
 <!-- <leader-comp v-if="leader" 
  :leader='leader'
  @exec_leader="chose_leader"
  /> -->


<resurrect-modal v-if="show_deck_modal_by_abilities"
:grave='grave' 
@chosen_card='confirm_card_from_grave'
/>




</div>
</template>

<script>

import { appear_new_enemy } from '@/logic/place_enemies'
import { damage_ai_card, leader_move } from '@/logic/player_move'
import { ai_move } from '@/logic/ai_move'
import { check_win, calc_can_draw } from "@/logic/service"

export default {
  data() {
    return {
      beginning: true,  // статус начала игры - только для кнопки начало
      
      field: [],
      deck: [],  // остаток сколько карт осталось в колоде
      hand: [],
      leader: JSON.parse(JSON.stringify(this.$store.state.leader)),
      grave: [],  // кладбище карт у которых 0 зарядов
      enemies: [],  // враги, копия из стора, приходит из start_game
            
      player_cards_active: true,  // активны ли карты игрока
      leader_active: false, // активен ли лидер
      ai_cards_active: false,  // активны ли карты поля
      
      player_card_number: null,  // номер карты игрока в руке
      can_draw: false,  // возможность вытянуть карту
      show_deck_modal_by_abilities: false,
    }
  },
  methods: {
    // эмит из компонента: расставить врагов, дро руки, редро
    start_game(dict) {
      this.hand = dict.hand
      this.deck = dict.deck
      this.field = dict.field
      this.enemies = dict.enemies
      this.beginning = false  // убираем кнопку с экрана после этого
    },

    // > по нажатию на карту игрока, из hand-comp, i - номер карты
    chose_player_card(i) {
      if (this.player_cards_active) {
        this.player_card_number = i  // запомнить номер карты игрока
        alert('УРОН ' + this.hand[i].damage + '  заряды ' + this.hand[i].charges)
        this.ai_cards_active = true  // только теперь можно тыкать на карты противника
        this.leader_active = false // а лидер теперь неактивен
      }
    },

    // по нажатию на лидера
    chose_leader() {
      if (this.leader.charges > 0) {
        this.leader_active = true
        this.ai_cards_active = false  // чтобы карта руки туда не пульнула
        alert(this.leader.charges + ' заряды лидера')
      }
    },

    // если ткнули ранее на карту игрока, а потом на поле, ходим
    exec_damage_ai_card(i) { 
      // i - номер клетки поля!
      this.can_draw = false  // если хотя бы раз сюда попали, то дро нельзя
      
      // если ранее ткнули на карту игрока, а потом на поле
      if (this.ai_cards_active && this.field[i]) {
        
        // особие абилки, которые требуют открытия окон
        this.special_case_abilities()
        
        damage_ai_card(
          i, this.field, this.hand, 
          this.player_card_number, this.grave, 
        )

        // проверяем там, что врагов не осталось, поле и количество врагов
        check_win(this.field, this.enemies)  

        this.player_card_number = null
        this.ai_cards_active = false
        this.player_cards_active = false
      }

      // если выбран лидер и ткнули на поле, урон наносит лидер
      this.exec_leader_move(i)
    },
    
    // только если ткнули на лидера, а потом на поле
    exec_leader_move(i) {
      if (this.leader_active && this.field[i]) {
        leader_move(this.leader, i, this.field)
        this.leader_active = false  // снова неактивен, тыкай на него опять
      
        // проверяем там, что врагов не осталось, поле и количество врагов
        check_win(this.field, this.level)  
      }
    },

    exec_ai_move() {
      ai_move(this.field)
      appear_new_enemy(this.field, this.enemies)  
      
      this.player_cards_active = true
      this.can_draw = calc_can_draw(  // можем ли сделать draw
        this.player_cards_active, this.hand, this.deck
      )  
    },

    // особые абилки, которые требуют каких-либо окон
    special_case_abilities() {
      if (this.hand[this.player_card_number].ability === 'resurrect') {
          // откр окно с grave, приходит confirm_card_from_grave()
          this.show_deck_modal_by_abilities = true 
        }
    },

    confirm_card_from_grave(dict) {
      this.show_deck_modal_by_abilities = false
      dict.card.charges = 1
      this.hand.push(dict.card)
      this.grave.splice(dict.i, 1)
    },

    // вытягивает в руку рандомную карту из деки, если рука не полна
    draw_one_card() {  
      let random = Math.floor(Math.random() * this.deck.length);
      this.hand.push(this.deck[random])
      this.deck.splice(random, 1)  // удалить этот 0й элемент
      this.player_cards_active = false
      this.can_draw = false
    },

  },
}

</script>

<style scoped>

/* Панель справа - лидер врага, кнопки, пас, лидер игрока */
.right-panel {
  display: inline;
  float: right;
  width: 24.5%;
  height: 74vh;
  border: solid 1px orange;
  position: relative;
  margin-right: 0.4%;
}

.div-two-buttons {
  height: 7.5vh;
  width: 98%;
  border: solid 1px red;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.draw {
  height: 4.3vh;
  width: 98%;
  border: solid 1px red;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}



.hand {
    display: flex;  /*элементы в ряд*/
    float: left;
    margin: 3px;  /*отступ между картами*/
    width: 90%;
}

.active_buttons {
    display: flex;  /*элементы в ряд*/
    /* float: left; */
    margin: 3px;  /*отступ между картами*/
    /* width: 100%; */
}

.btn_pass {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: crimson;
}

.btn_draw {
  margin: 10px;
  width: 150px;
  height: 50px;
  background-color: yellow;
  border-radius: 20px;
}

</style>
