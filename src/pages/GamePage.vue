<template>

<start-game v-if="beginning" @start_game='start_game'/>

<!-- показать количество врагов, которое на уровне -->
<p v-if="!beginning">
  {{ levels[this.$store.state.level][1].length }}
</p>

<table class='field'>
  <tr v-for="i in 4" :key="i">
    <td v-for="j in 3" :key="j"
      @click.right="index=get_index(i,j), show_enemy_modal=true" 
      @mouseleave="show_enemy_modal=false"
      @click="exec_damage_ai_card(get_index(i,j))" 
      @contextmenu.prevent
      >

      <div class="enemy" v-if="field[get_index(i,j)]"
      :style="[
        field[get_index(i,j)].color == 'Silver' ? {'backgroundColor': 'silver'} :
        field[get_index(i,j)].color == 'Gold' ? {'backgroundColor': 'gold'} :
      {}]"
      >
        &hearts;{{ field[get_index(i,j)].hp }} <br> 
        &dagger;{{ field[get_index(i,j)].dmg }}
      </div></td></tr>
</table>
<field-modal v-if="field[index]" 
:enemy='field[index]' 
:flag='show_enemy_modal'
/>


<health-comp :player_cards_active="player_cards_active" />


<button v-show="!player_move_bool && !beginning"
@click="exec_ai_move">ХОД КОМПА</button>

<button class="btn_pass" v-show="player_move_bool && !beginning"
@click="exec_ai_move">Пас</button>
<button class="btn_draw" v-show="can_draw"
@click="draw_one_card">ДРО</button>
<br>


<div class="deck_and_grave">
<deck-comp :deck='deck' />
<grave-comp :grave='grave' />
</div>

<resurrect-modal v-show="show_deck_modal_by_abilities"
:grave='grave' 
@chosen_card='confirm_card_from_grave'
/>

<div class="hand">

<leader-comp
v-if="leader" 
:leader='leader'
@exec_leader="exec_leader"
/>

<hand-comp 
v-if="!redraw"
:hand='hand'
@chose_player_card='chose_player_card' 
/>

</div>

</template>

<script>

import { levels, appear_new_enemy } from '@/logic/place_enemies'
import { damage_ai_card, leader_move } from '@/logic/player_move'
import { ai_move } from '@/logic/ai_move'
import StartGame from '@/components/StartGame'

export default {
  components: {
    StartGame,
  },
  data() {
    return {
      beginning: true,  // статус начала игры - только для кнопки начало
      
      levels: levels,
      field: [],
      hand: [],
      deck: [],  // остаток сколько карт осталось в колоде
      leader: JSON.parse(JSON.stringify(this.$store.state.leader)),
      leader_active: false, // активен ли лидер
      grave: [],  // кладбище карт у которых 0 зарядов
      
      player_move_bool: true,  // true - ходит игрок, false - комп
      player_cards_active: true,
      ai_cards_active: false,
      player_card_number: null,  // номер карты игрока в руке
      redraw: false,  // фдаг для изначального дро
      index: null,  // для индекса клетки поли
      show_enemy_modal: 0,  // для отображения всплывающего окна клетки поля
      can_draw: false,  // возможность вытянуть карту
      show_deck_modal_by_abilities: false,
    }
  },
  methods: {
    // фукнция для поля, вернуть номер элемента поля
    get_index(i, j) {  
      return (i-1) * 3 + (j-1)
    },
    
    // эмит из компонента: расставить врагов, дро руки, редро
    start_game(dict) {
      this.hand = dict.hand
      this.deck = dict.deck
      this.field = dict.field
      this.beginning = false  // убираем кнопку с экрана после этого
    },

    // возможно ли сделать draw, каждый раз по нажатию ход игрока
    calc_can_draw() {
      if (
        this.player_cards_active 
        && this.player_move_bool 
        && this.hand.length < 6 
        && this.deck.length != 0 ) {
          this.can_draw = true
        }
    },

    // вытягивает в руку рандомную карту из деки, если рука не полна
    draw_one_card() {  
      let random = Math.floor(Math.random() * this.deck.length);
      this.hand.push(this.deck[random])
      this.deck.splice(random, 1)  // удалить этот 0й элемент
      this.player_move_bool = false
      this.player_cards_active = false
      this.can_draw = false
    },

    redraw_finished(dict) { // пришедший параметр из ЭМИТА этого компонента
      // alert(dict)
      this.hand = dict.hand
      this.deck = dict.deck
      this.redraw = false  // закончили редро
    },

    // start_game() {
    //   this.redraw = true

    //   place_enemies(this.field, this.levels[this.$store.state.level][1])  // рандомно расставит врагов
    //   draw_hand(this.hand, this.deck)  // вытянет руку, остальное оставит в деке

    //   this.beginning = false  // убрать кнопку начало после её нажатия
    // },
    
    // нажатие кнопки ход игрока
    player_move() {
      alert('ход игрока, выберете карту')
      // this.calc_can_draw()  // можем ли сделать draw
      this.player_cards_active = true
    },

    exec_leader() {
      // по нажатию на лидера
      if (this.leader.charges > 0 && this.player_move_bool) {
        this.leader_active = true
        alert(this.leader.charges + ' заряды лидера')
      }
    },

    chose_player_card(id) {
      if (this.player_cards_active) {
        this.player_card_number = id  // запомнить номер карты игрока
        alert('УРОН ' + this.hand[id].damage + '  заряды ' + this.hand[id].charges)
        this.ai_cards_active = true  // только теперь можно тыкать на карты противника
        this.leader_active = false // а лидер теперь неактивен
      }
    },

    exec_damage_ai_card(id) { 
      // id - номер клетки поля!
      // если ткнули ранее на карту игрока, а потом на поле, ходим
      if (this.ai_cards_active && this.field[id]) {
        
        // особие абилки, которые требуют открытия окон
        this.special_case_abilities()
        
        damage_ai_card(
          id, this.field, this.hand, 
          this.player_card_number, this.grave, 
          this.levels[this.$store.state.level][1]
        )

        this.player_card_number = null
        this.ai_cards_active = false
        this.player_cards_active = false

        if (this.leader.charges == 0) {
          this.player_move_bool = false
        }
        
      }

      // если выбран лидер и ткнули на поле, урон наносит лидер
      if (this.leader_active && this.field[id]) {
        leader_move(this.leader, id, this.field, this.levels[this.$store.state.level][1])
        this.leader_active = false  // снова неактивен, тыкай на него опять

        if (this.leader.charges == 0) {
          this.player_move_bool = false
        }
      }
    
      this.can_draw = false  // если хотя бы раз сюда попали, то дро нельзя
    },

    exec_ai_move() {
      ai_move(this.field)
      appear_new_enemy(this.field, this.levels[this.$store.state.level][1] )
      
      this.player_move_bool = true
      this.player_cards_active = true
      this.calc_can_draw()  // можем ли сделать draw
    },

    // особые абилки, которые требуют каких-либо окон
    special_case_abilities() {
      if (this.hand[this.player_card_number].ability == 'resurrect') {
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

  },


  // computed: {  ПОПРОБОВАТЬ ЭТО!!!
  //   fn() {
  //     r
  //   }
  // },
}

</script>


<style>

.field {
  border: 1px solid black;
  font-size: 20pt;
  /* width: 100%; */
  width: 500px;
  /* height: 60%; */
}
th, td {
  background-color: #96D4D4;
  width: 170px;
  height: 130px;
  text-align: center;
}

.enemy {
  width: 130px;
  height: 110px;
  align-self: center;
  align-content: center;
}

.btn_start {
  width: 160px;
  height: 30px
}

.btn_field {
  width: 70px;
  height: 100px
}

.hand {
    display: flex;  /*элементы в ряд*/
    float: left;
    margin: 3px;  /*отступ между картами*/
    /* width: 100%; */
}

.deck_and_grave {
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

.action_buttons {
    display: flex;  /*элементы в ряд*/
    /* float: left; */
    margin: 3px;  /*отступ между картами*/
    /* width: 100%; */
}

</style>
