<template>
   <div class="modal_window">

     <button @click="close_self">Закрыть</button><br>

     <cards-list :cards='deck' />

   </div>
</template>

<script>
export default {
  name: "deck-modal",
  props: {
    deck: {
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
.modal_window {
  background-color: limegreen;
  width: 100%;
  height: 90%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -53%);
  z-index: 9999;
}
</style>