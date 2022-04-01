<template>
  <modal-window>
    <cards-list
        :cards='grave'
        @chose_player_card='confirm_selection'
    />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow"
import CardsList from "@/components/CardsList"
export default {
  name: 'resurrect-modal',
  components: {CardsList, ModalWindow},
  props: {
    grave: {
      required: true,
      type: Array,
    },
  },
  methods: {
    confirm_selection(i) {
      this.$emit('chosen_card', this.grave[i])
    },
  },
  emits: [
    'chosen_card'
  ],
}
</script>

<style scoped>

</style>