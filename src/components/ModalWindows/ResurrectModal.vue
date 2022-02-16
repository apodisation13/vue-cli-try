<template>
  <div class="modal_window">
    <button @click="close">Закрыть</button><br>
    
    <hand-comp :hand='grave'
    @chose_player_card='confirm_selection'
    /> 
  
  </div>
</template>

<script>
  export default {
    name: 'resurrect-modal',
    props: {
      grave: {
        required: true,
        type: Array
      },
    },
    data() {
      return {
        card: {},
        i: null,
      }
    },
    methods: {
      confirm_selection(i) {
        alert(i)
        this.card = this.grave[i]
        this.i = i
      },
      
      close() {
        this.$emit('chosen_card', {card: this.card, i: this.i})
      }
    },

    emits: [
      'chosen_card'
    ]
  }
</script>

<style scoped>
.modal_window {
  background-color: limegreen;
  width: 1000px;
  height: 400px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

}
</style>