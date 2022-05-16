<template>
<!--  отркывается по любой абилке где нужно окно, там отфильтрованные карты cards_pool-->
  <modal-window v-if="show_pick_a_card_selection">
    <cards-list
      :cards="cards_pool"
      @chose_player_card='confirm_selection'
    />
  </modal-window>

<!--  а тут только 1 выбранная карта, при абилках играть play_from-->
  <div class="chosen_card_from_deck" v-if="show_picked_card">
    <card-comp
      :card="picked_card"
    />
  </div>

</template>

<script>
import CardComp from "@/components/CardComp"
import ModalWindow from "@/components/UI/ModalWindow";
import CardsList from "@/components/CardsList";
export default {
  name: "special-case-abilities",
  components: {CardsList, ModalWindow, CardComp, },
  props: {
    cards_pool: {
      required: true,
      type: Array,
    },
    show_pick_a_card_selection: {
      required: true,
      type: Boolean,
    },
    show_picked_card: {  // флаг, показывать ли саму выбранную карту из колоды
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
      this.$emit('confirm_selection', card)
      this.picked_card = card
    },
  },
  emits: [
    'confirm_selection',
  ],
}
</script>

<style scoped>
.chosen_card_from_deck {
  width: 24%;
  height: 22%;
  text-align: center;
  position: fixed;
  top: 28%;
  right: 1%;
  /*transform: translate(-23%, -3%);*/
  z-index: 999999;
  border: solid 4px black;
}
</style>