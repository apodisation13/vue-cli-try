<template>
  <button class="btn_start" v-if="beginning" @click="start_game">НАЧАТЬ</button>
  
 
  <table class='field'>
    <tr v-for="i in 4" :key="i">
      <td v-for="j in 3" :key="j" @click="exec_damage_ai_card((i-1) * 3 + (j-1))">
        <a hidden> {{ index = (i-1) * 3 + (j-1)}}</a>
        {{ field[index].hp }} <br> {{ field[index].dmg }}
      </td>
    </tr>
  </table>

<br>
 <div>
    ЖИЗНИ ИГРОКА -- {{ health }}
  </div>
<br>


<div>
  <a v-if="player_move_bool && !beginning">
    <button @click="player_move">ХОД ИГРОКА</button>
  </a>
  <a v-if="!player_move_bool && !beginning">
    <button @click="exec_ai_move">ХОД КОМПА</button>
  </a>
</div>
<br>


<div class="hand" v-for="(card, index) in hand" :key='card'>
  <p v-if="card.category==='bronze'" @click="chose_player_card(index)">
        <button class="bronze_hand_card">{{ card.dmg }}<br>{{ card.charges }}</button>
    </p>
    <p v-if="card.category==='silver'" @click="chose_player_card(index)">
        <button class="silver_hand_card">{{ card.dmg }}<br>{{ card.charges }}</button>
    </p>
    <p v-if="card.category==='gold'" @click="chose_player_card(index)">
        <button class="gold_hand_card">{{ card.dmg }}<br>{{ card.charges }}</button>
    </p>

</div>  
</template>


<script>

import { FIELD, HEALTH } from './constants'
import { place_enemies, enemy_id } from './place_enemies'
import { HAND, draw_hand } from './draw_hand'
import { damage_ai_card } from './player_move'
import { ai_move } from './ai_move'


export default {
  data() {
    return {
      health: HEALTH,
      field: FIELD,
      hand: HAND,
      beginning: true,  // статус начала игры - только для кнопки начало
      player_move_bool: true,  // true - ходит игрок, false - комп
      player_cards_active: false,
      ai_cards_active: false,
      player_card_number: null  // номер карты игрока в руке
    }
  },
  methods: {
  
    start_game() {
      this.field = place_enemies(this.field)  // рандомно расставит игроков
      this.hand = draw_hand(this.hand)  // рандомно вытянет карты в руку игрока
      this.beginning = false  // убрать кнопку начало после её нажатия
    },
    
    player_move() {
      alert('ход игрока, выберете карту')
      this.player_cards_active = true
    },

    chose_player_card(id) {
      if (this.player_cards_active) {
        this.player_card_number = id  // запомнить номер карты игрока
        alert('УРОН ' + this.hand[id].dmg + '  заряды ' + this.hand[id].charges)
        this.ai_cards_active = true  // только теперь можно тыкать на карты противника
      }
    },

    exec_damage_ai_card(id) { 
      // id - номер клетки поля!
      if (this.ai_cards_active && this.field[id]) {
        let params = damage_ai_card(
          id, 
          this.field, 
          this.hand, 
          this.player_card_number
          )
        this.field = params[0]
        this.hand = params[1]
        this.player_card_number = params[2]

        this.player_card_number = null
        this.ai_cards_active = false
        this.player_cards_active = false
        this.player_move_bool = false
      }
    },

    exec_ai_move() {
      let params = ai_move(this.field, this.health)
      this.field = params[0]
      this.health = params[1]
      this.player_move_bool = true
    }

  }
}

</script>


<style>

.field {
  border: 1px solid black;
  font-size: 20pt;
}
th, td {
  background-color: #96D4D4;
  width: 170px;
  height: 100px;
  text-align: center;
}

.btn_start {
  width: 160px;
  height: 30px
}

.btn_field {
  width: 70px;
  height: 100px
}

/*класс кннопка карта игрока*/
.hand {
    display: inline-block;  /*элементы в ряд*/
    margin: 3px;  /*отступ между картами*/
}

.bronze_hand_card {
    width: 100px;
    height: 150px;
    background: lightyellow;
}

.silver_hand_card {
    width: 100px;
    height: 150px;
    background: silver;
}

.gold_hand_card {
    width: 100px;
    height: 150px;
    background: gold;
}

</style>
