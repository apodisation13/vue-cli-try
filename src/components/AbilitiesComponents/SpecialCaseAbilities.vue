<template>
  <div>
    <!--отркывается по любой абилке где нужно окно, там отфильтрованные карты cards_pool-->
    <modal-window v-if="show_pick_a_card_selection">
      <card-list-component
        :cards="cards_pool"
        @chose_player_card="confirm_selection"
      />
    </modal-window>

    <!--а тут только 1 выбранная карта, при абилках играть play_from-->
    <div class="chosen_card_from_deck" v-if="show_picked_card">
      <card-item :card="picked_card" />
    </div>
  </div>
</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow"
import CardListComponent from "@/components/CardListComponent"
import CardItem from "@/components/CardItem"
export default {
  name: "special-case-abilities",
  components: { CardItem, CardListComponent, ModalWindow },
  props: {
    cards_pool: {
      required: true,
      type: Array,
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
      this.$emit("confirm_selection", card)
      this.picked_card = card
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
