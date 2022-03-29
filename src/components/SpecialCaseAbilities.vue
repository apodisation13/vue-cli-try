<template>
<!--  Выбрать карту из кладбища, дать ей 1 заряд и восстановить в руку-->
  <resurrect-modal
      v-if="resurrect_modal"
      :grave='grave'
      @chosen_card='chosen_card'
  />

<!--  Выбрать карту из руки, дать ей 1 заряд -->
  <hand-special-case-abilities
      v-if="hand_special_case_abilities"
      :hand="hand"
      @chosen_card_from_hand_special_case_abilities="chosen_card_from_hsca"
  />


  <play-from-deck
    v-if="play_from_deck"
    :deck="deck"
    @chose_card_to_play_from_deck="chosen_card_from_deck"
  />
  <div class="chosen_card_from_deck" v-if="chosen_card_from_play_from_deck">
    <card-comp
      :card="card_from_play_from_deck"
    />
  </div>



</template>

<script>
export default {
  name: "special-case-abilities",
  props: {
    grave: {  // кладбище для ResurrectModal
      required: true,
      type: Object,
    },
    resurrect_modal: {  // нужно ли показывать ResurrectModal
      required: true,
      type: Boolean,
    },

    hand: {  // рука для HandSpecialCaseAbilities
      required: true,
      type: Object,
    },
    hand_special_case_abilities: {  // нужно ли показывать HandSpecialCaseAbilities
      required: true,
      type: Boolean,
    },

    deck: {  // колода для PlayFromDeck
      required: true,
      type: Object,
    },
    play_from_deck: {  // флаг, нужно ли показывать PlayFromDeck
      required: true,
      type: Boolean,
    },

  },

  data() {
    return {
      chosen_card_from_play_from_deck: false,
      card_from_play_from_deck: null,
    }
  },

  methods: {
    chosen_card(card) { // приходит из ResurrectModal - emit это вся карта, this.hand[i], выбранная
      this.$emit('chosen_card', card)
    },
    chosen_card_from_hsca(card) {  // приходит из HSCA - emit это вся карта, this.hand[i] - выбранная
      this.$emit('chosen_card_from_hsca', card)
    },
    chosen_card_from_deck(card) {  // приходит из PlayFromDeck
      console.log(card)
      this.card_from_play_from_deck = card
      this.chosen_card_from_play_from_deck = true
      this.$emit('chosen_card_from_deck', card)
    },
  },
  emits: [
    'chosen_card',
    'chosen_card_from_hsca',
    'chosen_card_from_deck',
  ],
}
</script>

<style scoped>
.chosen_card_from_deck {
  width: 24%;
  height: 22%;
  text-align: center;
  position: fixed;
  top: 30%;
  right: 1%;
  /*transform: translate(-23%, -3%);*/
  z-index: 999999;
  border: solid 4px black;
}
</style>