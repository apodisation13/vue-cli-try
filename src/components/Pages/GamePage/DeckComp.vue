<template>
  <div style="height: 3.5vh">
    <button class="deck-btn" @click="flag = true">Колода {{ deck_len }}</button>
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
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}
</style>
