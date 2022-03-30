<template>
   <div class="modal_window" v-touch:swipe="close_self">

     <button-close @close_self="close_self" />

     <div class="leader">
       <leader-comp :leader="leader" />
     </div>

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