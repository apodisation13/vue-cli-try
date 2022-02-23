<template>

<div v-if="beginning">
  <start-game @start_game='start_game'/>
</div>

<!-- дальше идём только после нажатия кнопки начало -->
<div v-else>

<!-- поле с врагами -->
<field-comp 
:field='field' 
@exec_damage_ai_card='exec_damage_ai_card'
/>

<!-- правая часть экрана -->
<div class="right-panel">

<!-- лидер врага -->
<enemy-leader 
:enemy_leader="enemy_leader"
@click="onLeaderClick"
/>

<!-- колода оставшихся врагов и кладбище врагов -->
<div class="div-two-buttons">
 <remaining-enemies :enemies='enemies' />
 <enemies-grave />
</div>

<!-- возможность вытянуть карту, дро -->
<div class="draw">
  <draw-comp v-show="can_draw"
  @click="draw_one_card"
  />
</div>

<!-- чисто кнопка пас -->
<pass-comp @click="exec_ai_move" />

<!-- кнопки кладбища и колоды -->
<div class="div-two-buttons">
  <grave-comp :grave='grave' />
  <deck-comp :deck='deck' />
</div>

<!-- лидер игрока -->
<leader-comp 
:leader='leader'
@exec_leader="chose_leader"
/>

<!-- Просто полоска с жизнями (пока что) -->
<health-comp /> 

</div>

<hand-comp
:hand='hand'
@chose_player_card='chose_player_card' 
/>

</div>
<resurrect-modal v-if="show_deck_modal_by_abilities"
:grave='grave' 
@chosen_card='confirm_card_from_grave'
/>
</template>

<script>

import {appear_new_enemy} from '@/logic/place_enemies'
import {
  damage_ai_card,
  damage_enemy_leader_by_card,
  damage_enemy_leader_by_leader,
  leader_move
} from '@/logic/player_move'
import {ai_move, leader_ai_move, leader_ai_move_once} from '@/logic/ai_move'
import { calc_can_draw } from "@/logic/service"
// import smth from '@/components/smth'

export default {
  // mixins:[smth],
  async created() {
    this.leader = await JSON.parse(JSON.stringify(this.$store.state.leader))
    this.enemy_leader = await JSON.parse(JSON.stringify(this.$store.state.enemy_leader))
  },
  data() {
    return {
      beginning: true,  // статус начала игры - только для кнопки начало
      
      field: [],
      deck: [],  // остаток сколько карт осталось в колоде
      hand: [],
      leader: '',
      grave: [],  // кладбище карт у которых 0 зарядов
      enemies: [],  // враги, копия из стора, приходит из start_game
      enemy_leader: '',
            
      player_cards_active: true,  // активны ли карты игрока
      leader_active: false, // активен ли лидер
      ai_cards_active: false,  // активны ли карты поля
      enemy_leader_active: false, // активен ли лидер противника
      
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

      // alert(this.s + 1)  // доступ к тем переменным
      // this.show()  // доступ к тем методам
      leader_ai_move_once(this.enemy_leader)  // функция урона лидера в начале
    },

    // > по нажатию на карту игрока, из hand-comp, i - номер карты
    chose_player_card(i) {
      if (!this.player_cards_active) return

      this.player_card_number = i  // запомнить номер карты игрока
      alert('УРОН ' + this.hand[i].damage + '  заряды ' + this.hand[i].charges)
      this.ai_cards_active = true  // только теперь можно тыкать на карты противника!!!!!!!!!!!!!!
      this.enemy_leader_active = true  // и лидер врагов активен тоже
      this.leader_active = false // а лидер теперь неактивен

    },

    // по нажатию на лидера
    chose_leader() {
      if (this.leader.charges <= 0) return

      this.leader_active = true
      // this.player_cards_active = false  // вот так нельзя к сожалению, ибо они всегда активны пока не сходил
      this.ai_cards_active = true
      this.enemy_leader_active = true  // и лидер врагов активен тоже
      alert(this.leader.charges + ' заряды лидера')

    },

    // если ткнули ранее на карту игрока или лидера, а потом на поле, ходим
    exec_damage_ai_card(i) { 
      // i - номер клетки поля!
      this.can_draw = false  // если хотя бы раз сюда попали, то дро нельзя
      
      // если ранее ткнули на карту игрока, а потом на поле
      if (this.player_cards_active && !this.leader_active && this.ai_cards_active && this.field[i]) {
        
        // особие абилки, которые требуют открытия окон
        this.special_case_abilities()
        
        damage_ai_card(
          i, this.field, this.hand, 
          this.player_card_number, this.grave, this.enemy_leader, this.enemies
        )

        this.player_card_number = null
        this.ai_cards_active = false
        this.player_cards_active = false
      }

      // если выбран лидер и ткнули на поле, урон наносит лидер
      if (this.leader_active && this.ai_cards_active && this.field[i]) {
        this.exec_leader_move(i)
      }
    },
    
    // только если ткнули на лидера, а потом на поле
    exec_leader_move(i) {
      
      leader_move(this.leader, i, this.field, this.enemy_leader, this.enemies)
      this.leader_active = false  // снова неактивен, тыкай на него опять
      this.ai_cards_active = false

    },

    exec_ai_move() {
      ai_move(this.field)
      leader_ai_move(this.enemy_leader)
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

    // если ранее ткнули на карту игрока или лидера игрока,
    // а потом на лидера врагов!
    onLeaderClick() {
      
      if (this.player_cards_active && !this.leader_active && this.enemy_leader_active && this.enemy_leader.hp > 0) {

        // особие абилки, которые требуют открытия окон
        this.special_case_abilities()

        this.can_draw = false

        damage_enemy_leader_by_card(this.enemy_leader, this.hand, this.player_card_number, this.grave, this.field, this.enemies)

        this.player_cards_active = false
        this.player_card_number = null
      }

      if (this.leader_active && this.leader.charges > 0 && this.enemy_leader_active && this.enemy_leader.hp > 0) {
        this.can_draw = false
        
        damage_enemy_leader_by_leader(this.enemy_leader, this.leader, this.field, this.enemies)

        this.leader_active = false
      }
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
  /* border: solid 1px orange; */
  position: relative;
  margin-right: 0.4%;
}

.div-two-buttons {
  height: 7.5vh;
  width: 98%;
  /* border: solid 1px red; */
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.draw {
  height: 4.3vh;
  width: 98%;
  /* border: solid 1px red; */
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

</style>