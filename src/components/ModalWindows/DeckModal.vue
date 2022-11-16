<template>
  <modal-window v-touch:swipe="close_self">
    <button-close @close_self="close_self" />

    <div class="leader">
      <leader-comp :leader="leader" />
    </div>

    <card-list-component :cards="deck" />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import LeaderComp from "@/components/LeaderComp"
import CardListComponent from "@/components/CardListComponent"
export default {
  name: "deck-modal",
  components: { CardListComponent, LeaderComp, ButtonClose, ModalWindow },
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
      this.$emit("close_deck_modal")
    },
  },
  emits: ["close_deck_modal"],
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
