<template>
  <button class="btn_start" v-if="beginning" @click="start_game">НАЧАТЬ</button>
  
 
  <table class='field'>
    <tr v-for="i in 4" :key="i">
      <td v-for="j in 3" :key="j" @click="enemy_id((i-1) * 3 + (j-1))">
        {{ field[(i-1) * 3 + (j-1)].hp }} <br> {{ field[(i-1) * 3 + (j-1)].dmg }}
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
    <button>ХОД КОМПА</button>
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

export default {
  data() {
    return {
      health: HEALTH,
      field: FIELD,
      hand: HAND,
      beginning: true,  // статус начала игры - только для кнопки начало
      player_move_bool: true,  // true - ходит игрок, false - комп
      player_cards_active: false,
      ai_card_active: false,
    }
  },
  methods: {
    enemy_id,

    start_game() {
      this.field = place_enemies(this.field)  // рандомно расставит игроков
      this.hand = draw_hand(this.hand)  // рандомно вытянет карты в руку игрока
      this.beginning = false  // убрать кнопку начало после её нажатия
    },
    
    player_move() {
      this.player_cards_active = true
    },

    chose_player_card(id) {
      if (this.player_cards_active) {
      alert('УРОН ' + this.hand[id].dmg + '  заряды ' + this.hand[id].charges)
      this.ai_cards_active = true  // только теперь можно тыкать на карты противника
      }
    },

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
