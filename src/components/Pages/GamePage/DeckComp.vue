<template>
  <div>
    <button
      @click="flag = true"
      class="deck-btn"
      :style="{ backgroundColor: trigger_passive ? 'yellow' : '' }"
    >
      Колода {{ deck_len }}
    </button>
    <modal-window v-if="flag" v-touch:swipe="close_self">
      <button-close @close_self="close_self" />
      <card-list-component :cards="deck" />
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import CardListComponent from "@/components/Cards/CardListComponent"
export default {
  name: "deck-comp",
  components: { CardListComponent, ButtonClose, ModalWindow },
  props: {
    deck: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      flag: false,
    }
  },
  computed: {
    deck_len() {
      return this.deck.length
    },
    trigger_passive() {
      for (const card of this.deck) {
        if (card.trigger_deck_passive) return true
      }
      return false
    },
  },
  methods: {
    close_self() {
      this.flag = false
    },
  },
}
</script>

<style scoped>
.deck-btn {
  height: 98%;
  width: 47px;
  border: solid 1px yellow;
  position: relative;
  border-radius: 10px;
}
</style>
