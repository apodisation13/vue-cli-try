<template>

<button class="btn_start" v-if="beginning" @click="start_game">НАЧАТЬ</button>

<redraw-modal v-if="redraw" 
:deck='deck' 
:hand='hand' 
@redraw_finished='redraw_finished'
/>

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
      </div>
      
    </td>
  </tr>
</table>
<field-modal v-if="field[index]" :enemy='field[index]' :flag='show_enemy_modal'/>


<health-comp :player_cards_active="player_cards_active" />


<div>
  <a v-if="player_move_bool && !beginning">
    <button @click="player_move">ХОД ИГРОКА</button>
  </a>
  <a v-if="!player_move_bool && !beginning">
    <button @click="exec_ai_move">ХОД КОМПА</button>
  </a>

<br>


<deck-comp 
:deck='deck' 
:grave='grave' 
/>

<hand-comp 
v-if="!redraw"
v-bind:hand='hand'
@chose_player_card='chose_player_card' 
/>

<br>
<button class="btn_start" @click="draw_one_card">дро</button>

</div>
</template>

<script>

import { place_enemies, levels, appear_new_enemy } from '@/logic/place_enemies'
import { draw_hand, } from '@/logic/draw_hand'
import { damage_ai_card,  } from '@/logic/player_move'
import { ai_move } from '@/logic/ai_move'

export default {
  data() {
    return {
      levels: levels,
      field: ['', '', '', '', '', '', '', '', '', '', '', ''],
      hand: ['', '', '', '', '', ''],
      deck: this.$store.state.current_deck.slice(),  // остаток сколько карт осталось в колоде
      grave: [],  // кладбище карт у которых 0 зарядов
      beginning: true,  // статус начала игры - только для кнопки начало
      player_move_bool: true,  // true - ходит игрок, false - комп
      player_cards_active: false,
      ai_cards_active: false,
      player_card_number: null,  // номер карты игрока в руке
      redraw: false,  // фдаг для изначального дро
      index: null,  // для индекса клетки поли
      show_enemy_modal: 0,  // для отображения всплывающего окна клетки поля
    }
  },
  methods: {
    get_index(i, j) {  // фукнция для поля, вернуть номер элемента поля
      return (i-1) * 3 + (j-1)
    },

    draw_one_card() {  // тестовая функция - вытягивает в руку рандомную карту из деки
      let random = Math.floor(Math.random() * this.deck.length);
      this.hand.push(this.deck[random])
      this.deck.splice(random, 1)  // удалить этот 0й элемент
    },

    redraw_finished(dict) { // пришедший параметр из ЭМИТА этого компонента
      // alert(dict)
      this.hand = dict.hand
      this.deck = dict.deck
      this.redraw = false  // закончили редро
    },

    start_game() {
      this.redraw = true

      place_enemies(this.field, this.levels[this.$store.state.level][1])  // рандомно расставит врагов
      draw_hand(this.hand, this.deck)  // вытянет руку, остальное оставит в деке

      this.beginning = false  // убрать кнопку начало после её нажатия
    },
    
    player_move() {
      alert('ход игрока, выберете карту')
      this.player_cards_active = true
    },

    chose_player_card(id) {
      if (this.player_cards_active) {
        this.player_card_number = id  // запомнить номер карты игрока
        alert('УРОН ' + this.hand[id].damage + '  заряды ' + this.hand[id].charges)
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
      ai_move(this.field)
      appear_new_enemy(this.field, this.levels[this.$store.state.level][1] )
      this.player_move_bool = true
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

</style>
