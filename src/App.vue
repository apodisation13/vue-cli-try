<template>

<button class="btn_start" v-if="beginning" @click="start_game">НАЧАТЬ</button>

<table class='field'>
  <tr v-for="i in 4" :key="i">
    <td v-for="j in 3" :key="j" 
    @click="exec_damage_ai_card((i-1) * 3 + (j-1))" @contextmenu.prevent
    >
      <a hidden> {{ index = (i-1) * 3 + (j-1)}}</a>
      {{ field[index].hp }} <br> {{ field[index].dmg }}
      <field-modal :fieldindex='field[index]'/>
    </td>
  </tr>
</table>

<health-comp 
v-bind:health="health" 
v-bind:player_cards_active="player_cards_active" 
@use_health_kit="use_health_kit"
/>


<div>
  <a v-if="player_move_bool && !beginning">
    <button @click="player_move">ХОД ИГРОКА</button>
  </a>
  <a v-if="!player_move_bool && !beginning">
    <button @click="exec_ai_move">ХОД КОМПА</button>
  </a>

<br>


<deck-comp 
v-bind:deck='deck' 
v-bind:deck_length="deck.length"
v-bind:grave='grave' 
v-bind:grave_length="grave.length"  
/>

<hand-comp 
v-bind:hand='hand'
@chose_player_card='chose_player_card' 
/>
<br>
<button class="btn_start" @click="draw_one_card">дро</button>
</div>
</template>

<script>

// import { HEALTH } from './constants'
import { place_enemies, } from './place_enemies'
import { draw_hand, DECK } from './draw_hand'
import { damage_ai_card, GRAVE } from './player_move'
import { ai_move } from './ai_move'

import HealthComp from '@/components/HealthComp'
import DeckComp from '@/components/DeckComp'
import HandComp from '@/components/HandComp'
import FieldModal from './components/FieldModal'

export default {
  components: {  // через запятую
    HealthComp, 
    DeckComp, 
    HandComp,
    FieldModal,

  },
  data() {
    return {
      health: 100,
      field: ['', '', '', '', '', '', '', '', '', '', '', ''],
      hand: ['', '', '', '', ''],
      deck: DECK,  // остаток сколько карт осталось в колоде
      grave: GRAVE,  // кладбище карт у которых 0 зарядов
      beginning: true,  // статус начала игры - только для кнопки начало
      player_move_bool: true,  // true - ходит игрок, false - комп
      player_cards_active: false,
      ai_cards_active: false,
      player_card_number: null,  // номер карты игрока в руке
     
    }
  },
  methods: {
    draw_one_card() {
      let random = Math.floor(Math.random() * DECK.length);
      this.hand.push(this.deck[random])
      this.deck.splice(random, 1)  // удалить этот 0й элемент
    },
    start_game() {
      place_enemies(this.field)  // рандомно расставит игроков
      draw_hand(this.hand)  // вытянет руку, остальное оставит в деке, ИЗМЕНЯЕТ DECK!!!

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
        damage_ai_card(id, this.field, this.hand, this.player_card_number, this.grave)

        this.player_card_number = null
        this.ai_cards_active = false
        this.player_cards_active = false
        this.player_move_bool = false
      }
    },

    exec_ai_move() {
      let params = ai_move(this.field, this.health)
      this.field = params[0]
      this.health = params[1]  // TODO: вот здесь пока непонятно почему оно нужно
      this.player_move_bool = true
    },

    use_health_kit() {
      this.health += 20
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
  height: 130px;
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

</style>
