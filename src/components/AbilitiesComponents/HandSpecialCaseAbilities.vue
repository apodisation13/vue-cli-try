<template>
  <modal-window>
    <cards-list
        :cards='hand'
        @chose_player_card='confirm_selection'
    />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow"
import CardsList from "@/components/CardsList"
export default {
  name: "hand-special-case-abilities",
  components: {CardsList, ModalWindow},
  props: {
    hand: {
      required: true,
      type: Array,
    },
  },
  methods: {
    confirm_selection(i) {
      this.$emit('chosen_card_from_hand_special_case_abilities', this.hand[i])
    },
  },
  emits: [
    'chosen_card_from_hand_special_case_abilities'
  ],
}
</script>

<style scoped>

</style>