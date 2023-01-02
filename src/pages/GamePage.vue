<template>
  <div class="game-page">
    <div class="game-block">
      <!-- поле с врагами -->
      <field-comp
        :field="gameObj.field"
        @exec_damage_ai_card="exec_damage_enemy_card"
      />

      <!-- правая часть экрана -->
      <div class="right-panel">
        <!-- лидер врага -->
        <enemy-leader
          :enemy_leader="gameObj.enemy_leader"
          @exec_enemy_leader="exec_damage_enemy_leader"
        />

        <!-- колода оставшихся врагов и кладбище врагов -->
        <div class="div-two-buttons">
          <remaining-enemies :enemies="gameObj.enemies" />
          <enemies-grave :enemies_grave="gameObj.enemies_grave" />
        </div>

        <!-- возможность вытянуть карту, дро -->
        <div class="draw">
          <draw-comp
            v-show="can_draw && $store.state.game.player_turn"
            @click="draw_one_card"
          />
        </div>

        <!-- чисто кнопка пас -->
        <pass-comp @dblclick="exec_ai_move" />

        <!-- кнопки кладбища и колоды -->
        <div class="div-two-buttons">
          <deck-comp :deck="gameObj.deck" />
          <grave-comp :grave="gameObj.grave" />
        </div>

        <!-- лидер игрока -->
        <leader-comp
          :leader="gameObj.leader"
          :field="gameObj.field"
          :enemy_leader="gameObj.enemy_leader"
          @exec_leader="chose_leader"
          @target_enemy="exec_damage_enemy_card"
          @target_enemy_leader="exec_damage_enemy_leader"
        />

        <!-- Просто полоска с жизнями (пока что) -->
        <health-comp />
      </div>
    </div>

    <hand-comp
      :hand="gameObj.hand"
      :field="gameObj.field"
      :enemy_leader="gameObj.enemy_leader"
      @chose_player_card="chose_player_card"
      @target_enemy="exec_damage_enemy_card"
      @target_enemy_leader="exec_damage_enemy_leader"
    />

    <special-case-abilities
      :show_pick_a_card_selection="show_pick_a_card_selection"
      :cards_pool="cards_pool"
      :show_picked_card="show_picked_card"
      :enemyView="enemyView"
      @confirm_selection="confirm_selection"
    />

    <redraw-comp
      v-if="draw"
      :game-obj="gameObj"
      :redraw-number="redraws"
      @redraw_finished="redraw_finished"
    />
  </div>
</template>

<script>
import { damage_ai_card } from "@/logic/player_move/player_move"
import draw from "@/mixins/GamePage/draw"
import specialcaseabilities from "@/mixins/GamePage/specialcaseabilities"
import execaimove from "@/mixins/GamePage/execaimove"
import startgame from "@/mixins/GamePage/startgame"

import FieldComp from "@/components/Pages/GamePage/FieldComp"
import EnemyLeader from "@/components/Cards/EnemyLeader"
import RemainingEnemies from "@/components/Pages/GamePage/EnemiesRemaining"
import EnemiesGrave from "@/components/Pages/GamePage/EnemiesGrave"
import DrawComp from "@/components/Pages/GamePage/DrawComp"
import PassComp from "@/components/Pages/GamePage/PassComp"
import GraveComp from "@/components/Pages/GamePage/GraveComp"
import DeckComp from "@/components/Pages/GamePage/DeckComp"
import LeaderComp from "@/components/Pages/GamePage/LeaderComp"
import HealthComp from "@/components/Pages/GamePage/HealthComp"
import HandComp from "@/components/Pages/GamePage/HandComp"
import SpecialCaseAbilities from "@/components/Pages/GamePage/SpecialCaseAbilities"
import RedrawComp from "@/components/Pages/GamePage/RedrawComp"
export default {
  components: {
    RedrawComp,
    FieldComp,
    EnemyLeader,
    RemainingEnemies,
    EnemiesGrave,
    DrawComp,
    PassComp,
    DeckComp,
    GraveComp,
    LeaderComp,
    HealthComp,
    HandComp,
    SpecialCaseAbilities,
  },
  mixins: [draw, specialcaseabilities, execaimove, startgame],

  async created() {
    // если мы перешли на эту страницу НЕ со страницы начала игры, где стоит этот флаг, нас отсюда перекинет
    if (!this.$store.state.game.start_game_redirect) {
      this.$router.push("/start_game")
    }
    this.$store.commit("set_start_game_redirect", false)
    this.start_game() // в МИКСИНЕ теперь
  },

  data() {
    return {
      // объект со всеми параметрами игры
      gameObj: {
        deck: [], // остаток сколько карт осталось в колоде
        hand: [],
        leader: null,
        grave: [], // кладбище карт у которых 0 зарядов
        field: ["", "", "", "", "", "", "", "", "", "", "", ""],
        enemy_leader: null,
        enemies: [], // колода врагов, приходит из start_game
        enemies_grave: [], // кладбище врагов
      },
      // объект активны ли разные карты, то есть можно ли на них тыкать
      isActive: {
        player_cards: true, // карты в руке всегда активны в начале хода, но после хода не активны до след хода
        player_leader: false,
        enemy_cards: false,
        enemy_leader: false,
      },
      selected_card: null, // объект выбранной карты путём дважды ЛКМ на карте в руке
      selected_enemy: null, // объект выбранного врага, по которому ткнули дважды ЛКМ, из field-comp
    }
  },
  methods: {
    // по нажатию на карту игрока, из hand-comp, card - вся карта целиком
    chose_player_card(card) {
      this.sca = false // как только потянули за карту из руки сразу скинули этот признак игры доп карты
      if (!this.isActive.player_cards) return
      this.selected_card = card // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ КАРТУ ИЗ РУКИ НА КОТОРУЮ ТКНУЛИ
      this.isActive.player_leader = false // лидер игрока теперь неактивен
      this.setActive()
    },

    // по нажатию на лидера игрока
    chose_leader() {
      this.sca = false // или если потянули за лидера сразу скинули этот признак игры доп карты
      if (this.gameObj.leader.charges <= 0) return
      this.selected_card = this.gameObj.leader // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ ЛИДЕРА ДЛЯ special_case
      this.isActive.player_leader = true
      this.setActive()
    },

    // поле и лидер врагов - теперь активны, КАЖДЫЙ РАЗ при выборе карты или лидера
    setActive() {
      this.isActive.enemy_cards = true // только теперь можно тыкать на карты противника!!!
      this.isActive.enemy_leader = true // и лидер врагов активен тоже
    },
    setNotActive() {
      this.isActive.enemy_cards = false
      this.isActive.enemy_leader = false
    },

    // после хода картой или лидером, открываем sp-case-abilities, обнуляем карту которой изначально играли
    afterDamage() {
      // особие абилки, которые требуют открытия окон
      this.special_case_abilities()
      this.selected_card = null // обнуляем карту, за которую изначально тянули
      this.show_picked_card = false // из specialcaseabilities.js!!!
      this.setNotActive()
    },

    // если ткнули ранее на карту игрока или лидера, а потом на поле, ходим // enemy - объект врага (field[i])
    exec_damage_enemy_card(enemy) {
      this.selected_enemy = enemy
      this.can_draw = false // если хотя бы раз сюда попали, то дро нельзя
      // далее выполним ИЛИ одну функцию, ИЛИ другую! то есть или картой выстрелим, или лидером
      this.damageEnemyByCard()
      this.damageEnemyByLeader()
    },

    // если ранее ткнули на карту игрока, а потом на поле
    damageEnemyByCard() {
      if (!this.targetEnemyByCard) return

      damage_ai_card(
        this.selected_card,
        this.selected_enemy,
        true,
        this.gameObj
      )
      // снимаем флаг активности карт игрока, ОДНА КАРТА ЗА ХОД! станет ТРУ только после окончания хода компа!
      // если мы играли первый раз картой из руки, то всё равно заблокируем руку, так как sca ЕЩЁ не было на тот момент
      // если мы играем доп картой из лидера, то sca будет ТРУ на момент игры доп карты, и рука не будет заблокирована
      if (!this.sca) this.isActive.player_cards = false
      this.afterDamage()
    },
    // если ранее ткнули на лидера, а потом на поле
    damageEnemyByLeader() {
      if (!this.targetEnemyByLeader) return

      damage_ai_card(
        this.gameObj.leader,
        this.selected_enemy,
        false,
        this.gameObj
      )
      this.afterDamage()
      this.isActive.player_leader = false // лидер снова неактивен, чтобы ходить им снова - надо опять на него тыкать
    },

    // если ранее ткнули на карту игрока или лидера игрока, а потом на лидера врагов!
    exec_damage_enemy_leader() {
      this.can_draw = false
      // аналогично, выполняем только одну из этих функций, бьем лидера врагов или картой, или своим лидером
      this.damageEnemyLeaderByCard()
      this.damageEnemyLeaderByLeader()
    },

    damageEnemyLeaderByCard() {
      if (!this.targetEnemyLeaderByCard) return

      damage_ai_card(
        this.selected_card,
        this.gameObj.enemy_leader,
        true,
        this.gameObj
      )
      if (!this.sca) this.isActive.player_cards = false
      this.afterDamage()
    },
    // ткнули на лидера игрока, а потом на лидера врагов
    damageEnemyLeaderByLeader() {
      if (!this.targetEnemyLeaderByLeader) return

      damage_ai_card(
        this.gameObj.leader,
        this.gameObj.enemy_leader,
        false,
        this.gameObj
      )
      this.afterDamage()
      this.isActive.player_leader = false // лидер снова неактивен, чтобы ходить им снова - надо опять на него тыкать
    },
  },
  computed: {
    // можем ли мы сыграть КАРТОЙ в ПОЛЕ: карты активны, лидер неактивен ИЛИ мы играем карту из sca
    targetEnemyByCard() {
      return (
        (this.isActive.player_cards &&
          !this.isActive.player_leader &&
          this.isActive.enemy_cards &&
          this.selected_enemy) ||
        this.sca
      )
    },
    // можем ли мы сыграть ЛИДЕРОМ в ПОЛЕ: лидер активны, у него больше нуля зарядов
    targetEnemyByLeader() {
      return (
        this.isActive.player_leader &&
        this.gameObj.leader.charges > 0 &&
        this.isActive.enemy_cards &&
        this.selected_enemy
      )
    },
    // можем ли мы сыграть КАРТОЙ в ЛИДЕРА ВРАГОВ: карты активны, лидер неактивен ИЛИ мы играем карту из sca
    targetEnemyLeaderByCard() {
      return (
        (this.isActive.player_cards &&
          !this.isActive.player_leader &&
          this.isActive.enemy_leader &&
          this.gameObj.enemy_leader.hp > 0) ||
        this.sca
      )
    },
    // можем ли мы сыграть ЛИДЕРОМ в ЛИДЕРА ВРАГОВ: лидеры активны, у них больше нуля зарядов и нуля жизней
    targetEnemyLeaderByLeader() {
      return (
        this.isActive.player_leader &&
        this.gameObj.leader.charges > 0 &&
        this.isActive.enemy_leader &&
        this.gameObj.enemy_leader.hp > 0
      )
    },
  },
}
</script>

<style scoped>
/* стилизация всей страницы */
.game-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.game-block {
  display: flex;
  justify-content: center;
}

/* Панель справа - лидер врага, кнопки, пас, лидер игрока */
.right-panel {
  width: 24.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.div-two-buttons {
  height: 7.5vh;
  width: 98%;
  /* border: solid 1px red; */
  margin-bottom: 1%;
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  gap: 1px;
}

.draw {
  height: 4.3vh;
  width: 98%;
  /* border: solid 1px red; */
  margin-bottom: 1%;
  margin-top: 1%;
}
</style>
