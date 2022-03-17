<template>
  <div class="modal_window">
    Щёлкните дважды для выбора карты

    <cards-list
        :cards='grave'
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
    methods: {
      confirm_selection(i) {
        this.$emit('chosen_card', this.grave[i])
      },
    },
    emits: [
      'chosen_card'
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
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>