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

  },
  methods: {
    chosen_card(card) { // приходит из ResurrectModal - emit это вся карта, this.hand[i], выбранная
      this.$emit('chosen_card', card)
    },
    chosen_card_from_hsca(card) {  // приходит из HSCA - emit это вся карта, this.hand[i] - выбранная
      this.$emit('chosen_card_from_hsca', card)
    },
  },
  emits: [
    'chosen_card',
    'chosen_card_from_hsca',
  ],
}
</script>

<style scoped>

</style>