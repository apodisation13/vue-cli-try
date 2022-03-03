<template>
  <resurrect-modal
      v-if="resurrect_modal"
      :grave='grave'
      @chosen_card='chosen_card'
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

  },
  methods: {
    chosen_card(emit) { // приходит из ResurrectModal - emit это {card: this.card, i: i}, карта и индекс
      this.$emit('chosen_card', emit)
    },
  },
  emits: [
    'chosen_card',
  ],
}
</script>

<style scoped>

</style>