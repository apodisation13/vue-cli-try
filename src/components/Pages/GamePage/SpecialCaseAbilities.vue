<template>
  <div>
    <!--отркывается по любой абилке где нужно окно, там отфильтрованные карты cards_pool-->
    <modal-window v-if="show_pick_a_card_selection">
      <card-list-component
        v-if="!enemyView"
        :cards="cards_pool"
        @chose_player_card="confirm_selection"
      />
      <enemy-list
        v-else
        :enemies="cards_pool"
        @chose-enemy="confirm_selection"
      />
    </modal-window>

    <!--а тут только 1 выбранная карта, при абилках играть play_from-->
    <div class="chosen_card_from_deck" v-if="show_picked_card">
      <card-item :card="picked_card" />
    </div>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import CardListComponent from "@/components/Cards/CardListComponent"
import CardItem from "@/components/Cards/CardItem"
import EnemyList from "@/components/Cards/EnemyList.vue"
export default {
  name: "special-case-abilities",
  components: { EnemyList, CardItem, CardListComponent, ModalWindow },
  props: {
    cards_pool: {
      required: true,
      type: Array,
    },
    // если мы играем как-то врагов, то пришлем этот флаг
    enemyView: {
      required: false,
      default: false,
      type: Boolean,
    },
    show_pick_a_card_selection: {
      required: true,
      type: Boolean,
    },
    show_picked_card: {
      // флаг, показывать ли саму выбранную карту из колоды
      required: true,
      type: Boolean,
    },
  },

  data() {
    return {
      picked_card: null,
    }
  },

  methods: {
    confirm_selection(card) {
      // добавим врагу костыль, если мы его играем!
      if (this.enemyView) this.forEnemy(card)
      this.$emit("confirm_selection", card)
      this.picked_card = card
    },
    // если мы играем ВРАГА, у него нет абилки никакой, эта функция добавит ему базовую абилку на урон одному
    forEnemy(card) {
      card["ability"] = {
        name: "damage-one",
        description: "Нанести {damage} урона одному врагу",
      }
      card["charges"] = 1
    },
  },
  emits: ["confirm_selection"],
}
</script>

<style scoped>
.chosen_card_from_deck {
  width: 24%;
  /*height: 22%;*/
  position: fixed;
  top: 34%;
  right: 1%;
  z-index: 999999;
  /*border: solid 4px black;*/
}
</style>
