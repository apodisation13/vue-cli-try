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
  @exec_enemy_leader="onLeaderClick"
/>

<!-- колода оставшихся врагов и кладбище врагов -->
<div class="div-two-buttons">
 <remaining-enemies :enemies='enemies' />
 <enemies-grave />
</div>

<!-- возможность вытянуть карту, дро -->
<div class="draw">
  <draw-comp
    v-show="can_draw && $store.state.game.player_turn"
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
  :field="field"
  @chose_player_card='chose_player_card'
  @target_enemy="exec_damage_ai_card"
/>

</div>

<special-case-abilities
  :show_pick_a_card_selection="show_pick_a_card_selection"
  :cards_pool="cards_pool"
  :show_picked_card="show_picked_card"
  @confirm_selection="confirm_selection"
/>
  <redraw-modal v-if="draw"
    :deck="deck"
    :hand="hand"
    @redraw_finished="redraw_finished"
  />

</template>

<script>

import {damage_ai_card} from '@/logic/player_move/player_move'

import draw from '@/mixins/GamePage/draw'
import specialcaseabilities from "@/mixins/GamePage/specialcaseabilities"
import execaimove from "@/mixins/GamePage/execaimove"

import StartGame from "@/components/StartGame"
import FieldComp from "@/components/Pages/GamePage/FieldComp"
import EnemyLeader from "@/components/EnemyLeader"
import RemainingEnemies from "@/components/Pages/GamePage/EnemiesRemaining"
import EnemiesGrave from "@/components/Pages/GamePage/EnemiesGrave"
import DrawComp from "@/components/Pages/GamePage/DrawComp"
import PassComp from "@/components/Pages/GamePage/PassComp"
import GraveComp from "@/components/Pages/GamePage/GraveComp"
import DeckComp from "@/components/Pages/GamePage/DeckComp"
import LeaderComp from "@/components/LeaderComp"
import HealthComp from "@/components/Pages/GamePage/HealthComp"
import HandComp from "@/components/Pages/GamePage/HandComp"
import SpecialCaseAbilities from "@/components/AbilitiesComponents/SpecialCaseAbilities"
import RedrawModal from "@/components/RedrawModal";

export default {
  components: {
    RedrawModal,
    StartGame,
    FieldComp,
    EnemyLeader, RemainingEnemies, EnemiesGrave,
    DrawComp, PassComp, DeckComp, GraveComp,
    LeaderComp, HealthComp,
    HandComp,
    SpecialCaseAbilities,
  },
  mixins: [
    draw,
    specialcaseabilities,
    execaimove,
  ],

  async created() {
    this.leader = await JSON.parse(JSON.stringify(this.$store.state.game.leader))
    this.enemy_leader = await JSON.parse(JSON.stringify(this.$store.state.game.enemy_leader))
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

      selected_card: null,  // объект выбранной карты путём дважды ЛКМ на карте в руке
      selected_enemy: null,  // объёкт выбранного врага, по которому ткнули дважды ЛКМ, из field-comp
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
      // this.f()  // из 1 миксина можно дергать параметры и методы другого!
    },

    // > по нажатию на карту игрока, из hand-comp, card - вся карта целиком
    chose_player_card(card) {
      if (!this.player_cards_active) return

      this.selected_card = card  // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ КАРТУ ИЗ РУКИ НА КОТОРУЮ ТКНУЛИ
      // alert('УРОН ' + this.selected_card.damage + '  заряды ' + this.selected_card.charges)
      this.ai_cards_active = true  // только теперь можно тыкать на карты противника!!!!!!!!!!!!!!
      this.enemy_leader_active = true  // и лидер врагов активен тоже
      this.leader_active = false // а лидер теперь неактивен
    },

    // по нажатию на лидера
    chose_leader() {
      if (this.leader.charges <= 0) return

      this.leader_active = true
      // this.player_cards_active = false  // вот так нельзя, карты игрока д.б. всегда активны пока не сходил
      this.ai_cards_active = true
      this.enemy_leader_active = true  // и лидер врагов активен тоже
      // alert(this.leader.charges + ' заряды лидера')
    },

    // если ткнули ранее на карту игрока или лидера, а потом на поле, ходим // enemy - объект врага (field[i])
    exec_damage_ai_card(enemy) {
      this.selected_enemy = enemy

      this.can_draw = false  // если хотя бы раз сюда попали, то дро нельзя
      
      // если ранее ткнули на карту игрока, а потом на поле
      if (this.player_cards_active && !this.leader_active && this.ai_cards_active && this.selected_enemy) {

        damage_ai_card(
          this.selected_card, this.selected_enemy, this.field, this.enemy_leader,
          this.hand, this.deck, this.grave,
          this.enemies,
          true,
          this.leader
        )

        // особие абилки, которые требуют открытия окон
        this.special_case_abilities()

        this.selected_card = null
        this.ai_cards_active = false
        this.player_cards_active = false
        this.show_picked_card = false  // из specialcaseabilities.js!!!
      }

      // если выбран лидер и ткнули на поле, урон наносит лидер
      if (this.leader_active && this.ai_cards_active && this.selected_enemy) this.exec_leader_move()
    },
    
    // только если ткнули на лидера, а потом на поле
    exec_leader_move() {
      damage_ai_card(
          this.leader, this.selected_enemy, this.field, this.enemy_leader,
          undefined, undefined, undefined,
          this.enemies,
          false,
          this.leader,
      )
      this.leader_active = false  // снова неактивен, тыкай на него опять
      this.ai_cards_active = false
    },

    // если ранее ткнули на карту игрока или лидера игрока, а потом на лидера врагов!
    onLeaderClick() {

      // ткнули на карту игрока, а потом на лидера врагов
      if (this.player_cards_active && !this.leader_active && this.enemy_leader_active && this.enemy_leader.hp > 0) {
        // особие абилки, которые требуют открытия окон

        this.can_draw = false

        damage_ai_card(
            this.selected_card, this.enemy_leader, this.field, this.enemy_leader,
            this.hand, this.deck, this.grave,
            this.enemies,
            true,
            this.leader
        )

        this.special_case_abilities()

        this.player_cards_active = false
        this.selected_card = null
        this.show_picked_card = false  // из specialcaseabilities.js!!!
      }

      // ткнули на лидера игрока, а потом на лидера врагов
      if (this.leader_active && this.leader.charges > 0 && this.enemy_leader_active && this.enemy_leader.hp > 0) {
        this.can_draw = false
        damage_ai_card(
            this.leader, this.enemy_leader, this.field, this.enemy_leader,
            undefined, undefined, undefined,
            this.enemies,
            false,
            this.leader
        )
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