<template>
  <modal-window v-touch:swipe="close_self">
    <button-close @close_self="close_self" />

    <div class="leader">
      <leader-comp :leader="leader" />
    </div>

    <cards-list :cards='deck' />

  </modal-window>
</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow"
import ButtonClose from "@/components/UI/ButtonClose"
import LeaderComp from "@/components/LeaderComp"
import CardsList from "@/components/CardsList"
export default {
  name: "deck-modal",
  components: {CardsList, LeaderComp, ButtonClose, ModalWindow},
  props: {
    deck: {
      type: Object,
      required: true,
    },
    leader: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close_self() {
      this.$emit('close_deck_modal')
    },
  },
  emits: [
    'close_deck_modal',
  ],
}
</script>

<style scoped>
.leader {
  height: 18vh;
  width: 30%;
  border-radius: 2%;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
  /*border: solid 1px black;*/
}
</style>