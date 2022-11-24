<template>
  <modal-window v-touch:swipe="close_self">
    <button-close @close_self="close_self" />

    <div class="leader">
      <card-item :card="leader" :is_leader="true" />
    </div>

    <card-list-component :cards="deck" />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import CardListComponent from "@/components/CardListComponent"
import CardItem from "@/components/CardItem"
export default {
  name: "deck-modal",
  components: {
    CardItem,
    CardListComponent,
    ButtonClose,
    ModalWindow,
  },
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
  width: 30%;
  margin: auto;
}
</style>
