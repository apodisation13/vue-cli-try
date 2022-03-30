<template>

  <button class="deck-btn" @click="flag=true"> 
    Колода {{ deck_len }}
  </button>
   
   <div class="modal_window" v-if="flag" v-touch:swipe="close_self">
     <button-close @close_self="close_self" />

     <cards-list
        :cards='deck'
    />
  </div>

</template>

<script>
  export default {
    name: 'deck-comp',
    props: {
      deck: {
        required: true,
        type: Array
      },
    },
    data() {
      return {
        flag: false,
      }
    },
    computed: {
      deck_len() {return this.deck.length}
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
  height: 40%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.modal_window {
  background-color: limegreen;
  width: 100%;
  height: 90%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

}
</style>